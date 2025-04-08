import Payment
  from '../models/paymentModel';
import Booking from '../models/bookingModel';
import { Payment as IPayment } from '../interfaces/payment.interface';
import mongoose from 'mongoose';
import { emailService } from './emailservice';
import { bookingService } from './bookingService';
import { reservationService } from './Reservationservice';
import { generateTicketId } from '../utils/generateTickets';
import axios from 'axios';
import STKRequest from '../models/stkRequestModel';
import config from '../config/config'
import { mpesaMiddleware } from '../middleware/accesToken';

class PaymentService {
  // Create a new payment
  async createPayment(paymentData: IPayment): Promise<IPayment> {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        // Create the payment
        const newPayment = new Payment(paymentData);
        await newPayment.save({ session });

        // If there's a booking ID, update its payment status
        if (paymentData.bookingId) {
          const booking = await Booking.findByIdAndUpdate(
            paymentData.bookingId,
            { paymentStatus: paymentData.status },
            { new: true, session }
          ).populate('scheduleId');

          // Send payment confirmation email if payment is completed
          if (paymentData.status === 'completed' && booking) {
            try {
              await emailService.sendPaymentConfirmation(
                booking.userEmail,
                booking.userName,
                booking.ticketId || '',
                paymentData.amount,
                paymentData.transactionId
              );
            } catch (emailError) {
              console.error('Failed to send payment confirmation email:', emailError);
            }
          }
        }

        await session.commitTransaction();
        session.endSession();
        return newPayment;
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }




// M-Pesa STK Push
async processMpesaSTKPush(
  reservationId: string,
  phoneNumber: string,
  amount: number
): Promise<{
  success: boolean;
  checkoutRequestID?: string;
  message: string;
  error?: any;
}> {
  try {
    console.log(`[M-Pesa] Processing STK push for reservation: ${reservationId}`);

    // Get the reservation
    const reservation = await reservationService.getReservationById(reservationId);
    if (!reservation) {
      console.log(`[M-Pesa] Reservation not found: ${reservationId}`);
      return {
        success: false,
        message: 'Reservation not found'
      };
    }

    if (reservation.status !== 'active') {
      console.log(`[M-Pesa] Reservation status is not active: ${reservation.status}`);
      return {
        success: false,
        message: `Reservation is ${reservation.status}`
      };
    }

    if (new Date() > reservation.expiryDate) {
      console.log(`[M-Pesa] Reservation expired: ${reservationId}`);
      await reservationService.cancelReservation(reservationId);
      return {
        success: false,
        message: 'Reservation has expired'
      };
    }

    // M-Pesa API constants
    const MPESA_PASSKEY = config.mpesa.mpesa_passkey || '';
    const MPESA_SHORTCODE = config.mpesa.shortcode || '';
    const CALLBACK_URL = "https://busbudder.onrender.com/api/v1/payments/callback";

    // Validate required configuration
    if (!MPESA_SHORTCODE || !MPESA_PASSKEY || !CALLBACK_URL) {
      console.error('[M-Pesa] Missing required configuration:', {
        shortcodePresent: !!MPESA_SHORTCODE,
        passkeyPresent: !!MPESA_PASSKEY,
        callbackUrlPresent: !!CALLBACK_URL
      });
      throw new Error('M-Pesa configuration is incomplete. Check environment variables.');
    }

    // Format phone number
    const formattedPhone = mpesaMiddleware.formatPhoneNumber(phoneNumber);
    console.log(`[M-Pesa] Formatted phone: ${formattedPhone}, Original: ${phoneNumber}`);

    // Generate timestamp
    const date = new Date();
    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);

    // Generate password
    const password = Buffer.from(MPESA_SHORTCODE + MPESA_PASSKEY + timestamp).toString("base64");

    // Get access token using middleware
    console.log('[M-Pesa] Requesting access token');
    const accessToken = await mpesaMiddleware.getToken();
    console.log('[M-Pesa] Token received successfully');

    // Prepare STK push request data
    const stkRequestData = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: "https://busbudder.onrender.com/api/v1/payments/callback",
      AccountReference: `BUS-${reservationId.slice(-6)}`,
      TransactionDesc: 'Bus Ticket Payment'
    };

    console.log('[M-Pesa] Sending STK push with data:', JSON.stringify(stkRequestData));

    // Make STK push request
    try {
      const stkResponse = await axios.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        stkRequestData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('[M-Pesa] STK push response:', JSON.stringify(stkResponse.data));

      // Save STK request in database for tracking
      await this.createSTKRequest({
        reservationId,
        checkoutRequestID: stkResponse.data.CheckoutRequestID,
        merchantRequestID: stkResponse.data.MerchantRequestID,
        amount,
        phoneNumber: formattedPhone,
        status: 'pending'
      });

      return {
        success: true,
        checkoutRequestID: stkResponse.data.CheckoutRequestID,
        message: 'STK push initiated successfully'
      };
    } catch (stkError: any) {
      console.error('[M-Pesa] STK push failed:', stkError.message);

      // Enhanced error logging for debugging
      if (stkError.response) {
        console.error('[M-Pesa] Error Response:', {
          status: stkError.response.status,
          statusText: stkError.response.statusText,
          data: stkError.response.data
        });

        // Handle specific Safaricom error codes
        if (stkError.response.status === 400) {
          // Check for specific error messages from Safaricom
          const errorMessage = stkError.response.data.errorMessage ||
                              stkError.response.data.ResponseDescription ||
                              'Invalid request parameters';

          return {
            success: false,
            message: `Safaricom declined request: ${errorMessage}`,
            error: stkError.response.data
          };
        }
      }

      throw stkError;
    }
  } catch (error: any) {
    console.error('[M-Pesa] Error processing M-Pesa STK push:', error);
    return {
      success: false,
      message: error.message || 'Failed to initiate STK push',
      error: error.response?.data || error
    };
}
}



// Create STK request record
async createSTKRequest(requestData: {
  reservationId: string;
  checkoutRequestID: string;
  merchantRequestID: string;
  amount: number;
  phoneNumber: string;
  status: 'pending' | 'completed' | 'failed';
}) {
  // Create a record to track the STK request
  // You'll need to create an STKRequest model
  const stkRequest = new STKRequest(requestData);
  await stkRequest.save();
  return stkRequest;
}


  // Get payment by ID
  async getPaymentById(id: string): Promise<IPayment | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid payment ID');
      }
      return await Payment.findById(id);
    } catch (error) {
      throw error;
    }
  }

  // Get payments by booking ID
  async getPaymentsByBookingId(bookingId: string): Promise<IPayment[]> {
    try {
      if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        throw new Error('Invalid booking ID');
      }
      return await Payment.find({ bookingId });
    } catch (error) {
      throw error;
    }
  }

  // Update payment status
  async updatePaymentStatus(
    id: string,
    status: 'pending' | 'completed' | 'failed' | 'refunded'
  ): Promise<IPayment | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid payment ID');
      }

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        // Update payment status
        const payment = await Payment.findByIdAndUpdate(
          id,
          { status },
          { new: true, session }
        );

        if (!payment) {
          await session.abortTransaction();
          session.endSession();
          return null;
        }

        // Update booking payment status if there's a booking
        if (payment.bookingId) {
          const booking = await Booking.findByIdAndUpdate(
            payment.bookingId,
            { paymentStatus: status },
            { new: true, session }
          );

          // Send payment confirmation email if payment is completed
          if (status === 'completed' && booking) {
            try {
              await emailService.sendPaymentConfirmation(
                booking.userEmail,
                booking.userName,
                booking.ticketId || '',
                payment.amount,
                payment.transactionId
              );
            } catch (emailError) {
              console.error('Failed to send payment confirmation email:', emailError);
            }
          }
        }

        await session.commitTransaction();
        session.endSession();
        return payment;
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  // Process MPesa payment for a reservation (new flow)
  async processMpesaPaymentForReservation(
    reservationId: string,
    phoneNumber: string,
    amount: number
  ): Promise<{
    success: boolean;
    transactionId?: string;
    bookingId?: string;
    message: string
  }> {
    try {
      // Get the reservation
      const reservation = await reservationService.getReservationById(reservationId);
      if (!reservation) {
        return {
          success: false,
          message: 'Reservation not found'
        };
      }

      if (reservation.status !== 'active') {
        return {
          success: false,
          message: `Reservation is ${reservation.status}`
        };
      }

      if (new Date() > reservation.expiryDate) {
        await reservationService.cancelReservation(reservationId);
        return {
          success: false,
          message: 'Reservation has expired'
        };
      }

      // In a real implementation, this would integrate with the MPesa API
      // For now, we'll mock a successful payment

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate a mock transaction ID
      const transactionId = `MPESA-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Complete the reservation
      await reservationService.completeReservation(reservationId);

      // Create the actual booking
      const booking = await bookingService.createBookingFromReservation(reservationId);

      // Create payment record
      const paymentData: IPayment = {
        bookingId: booking._id!,
        amount,
        paymentDate: new Date(),
        paymentMethod: 'mpesa',
        transactionId,
        status: 'completed'
      };

      await this.createPayment(paymentData);

      return {
        success: true,
        transactionId,
        bookingId: booking._id,
        message: 'Payment processed successfully and booking created'
      };
    } catch (error: any) {
      console.error('Error processing MPesa payment:', error);
      return {
        success: false,
        message: error.message || 'Failed to process payment'
      };
    }
  }


async handleMpesaCallback(callbackData: any): Promise<boolean> {
  try {
    console.log('[M-Pesa Callback] Received callback data:', JSON.stringify(callbackData));

    // Extract the required data from the callback
    const { Body } = callbackData;

    if (!Body || !Body.stkCallback) {
      console.error('[M-Pesa Callback] Invalid callback data:', callbackData);
      return false;
    }

    const { ResultCode, ResultDesc, CheckoutRequestID, CallbackMetadata } = Body.stkCallback;
    console.log('[M-Pesa Callback] Extracted callback details:', {
      ResultCode,
      ResultDesc,
      CheckoutRequestID,
      CallbackMetadata
    });

    // Find the STK request
    const stkRequest = await STKRequest.findOne({ checkoutRequestID: CheckoutRequestID });
    if (!stkRequest) {
      console.error('[M-Pesa Callback] STK request not found for CheckoutRequestID:', CheckoutRequestID);
      return false;
    }

    console.log('[M-Pesa Callback] Found STK request:', stkRequest);

    // Update STK request status
    stkRequest.status = ResultCode === 0 ? 'completed' : 'failed';

    // Extract transaction details if available
    if (ResultCode === 0 && CallbackMetadata && CallbackMetadata.Item) {
      console.log('[M-Pesa Callback] Payment successful. Extracting transaction details.');

      // Extract transaction details
      const mpesaReceiptNumber = CallbackMetadata.Item.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value;
      const transactionDate = CallbackMetadata.Item.find((item: any) => item.Name === 'TransactionDate')?.Value;
      const phoneNumber = CallbackMetadata.Item.find((item: any) => item.Name === 'PhoneNumber')?.Value;

      console.log('[M-Pesa Callback] Extracted transaction details:', {
        mpesaReceiptNumber,
        transactionDate,
        phoneNumber
      });

      stkRequest.transactionId = mpesaReceiptNumber;
      stkRequest.transactionDate = transactionDate;

      await stkRequest.save();
      console.log('[M-Pesa Callback] Updated STK request with transaction details.');

      // Process the successful payment
      if (ResultCode === 0) {
        console.log('[M-Pesa Callback] Processing successful payment for reservation:', stkRequest.reservationId);

        // Complete the reservation
        await reservationService.completeReservation(stkRequest.reservationId);
        console.log('[M-Pesa Callback] Reservation completed.');

        // Create booking from reservation
        const booking = await bookingService.createBookingFromReservation(stkRequest.reservationId);
        console.log('[M-Pesa Callback] Booking created from reservation:', booking);

        // Create payment record
        const paymentData: IPayment = {
          bookingId: booking._id!,
          amount: stkRequest.amount,
          paymentDate: new Date(),
          paymentMethod: 'mpesa',
          transactionId: mpesaReceiptNumber,
          status: 'completed'
        };

        await this.createPayment(paymentData);
        console.log('[M-Pesa Callback] Payment record created:', paymentData);
      }

      return true;
    } else {
      console.warn('[M-Pesa Callback] Payment failed. Reason:', ResultDesc);

      // Failed payment
      stkRequest.failureReason = ResultDesc;
      await stkRequest.save();
      console.log('[M-Pesa Callback] Updated STK request with failure reason.');

      return false;
    }
  } catch (error) {
    console.error('[M-Pesa Callback] Error handling M-Pesa callback:', error);
    return false;
  }
}

  async getAllPayments(filter = {}):Promise<IPayment[]> {
    try {
      return await Payment.find(filter).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  }
}

export const paymentService = new PaymentService();
