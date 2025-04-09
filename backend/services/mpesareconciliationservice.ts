import mongoose from 'mongoose';
import axios from 'axios';
import STKRequest from '../models/stkRequestModel';
import Payment from '../models/paymentModel';
import Booking from '../models/bookingModel';
import SeatReservation from '../models/seatReservatonModel';
import Schedule from '../models/scheduleModel';
import { emailService } from './emailservice';
import { bookingService } from './bookingService';
import { mpesaMiddleware } from '../middleware/accesToken';
import config from '../config/config';
import { Payment as IPayment } from '../interfaces/payment.interface';

export class MpesaReconciliationService {
  // Check transaction status with Safaricom
  async checkTransactionStatus(checkoutRequestID: string): Promise<any> {
    try {
      console.log(`[Reconciliation] Checking status for transaction: ${checkoutRequestID}`);
      const accessToken = await mpesaMiddleware.getToken();

      // Generate timestamp in the format required by Safaricom
      const date = new Date();
      const timestamp =
        date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2);

      // Generate password same as STK push
      const password = Buffer.from(
        (config.mpesa.shortcode ?? '') + config.mpesa.mpesa_passkey + timestamp
      ).toString("base64");

      const data = {
        BusinessShortCode: config.mpesa.shortcode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestID
      };

      console.log(`[Reconciliation] Sending query request for: ${checkoutRequestID}`);

      const response = await axios.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log(`[Reconciliation] Query response for ${checkoutRequestID}:`, response.data);
      return response.data;
    } catch (error: any) {
      console.error(`[Reconciliation] Error checking transaction status for ${checkoutRequestID}:`, error.message);
      if (error.response) {
        console.error(`Response data:`, error.response.data);
      }
      throw error;
    }
  }

  // Process a pending transaction that might have been successful but not properly recorded
  async processPotentiallySuccessfulTransaction(stkRequest: any): Promise<boolean> {
    try {
      console.log(`[Reconciliation] Processing potentially successful transaction: ${stkRequest.checkoutRequestID}`);

      // Check current status with M-Pesa
      const transactionStatus = await this.checkTransactionStatus(stkRequest.checkoutRequestID);

      // If the transaction was successful according to M-Pesa
      if (transactionStatus.ResultCode === 0) {
        console.log(`[Reconciliation] Transaction ${stkRequest.checkoutRequestID} confirmed successful by M-Pesa`);

        // Extract transaction details
        const callbackMetadata = transactionStatus.CallbackMetadata?.Item;
        if (!callbackMetadata) {
          console.warn(`[Reconciliation] No metadata for successful transaction: ${stkRequest.checkoutRequestID}`);
          return false;
        }

        // Extract M-Pesa receipt number and other details
        const mpesaReceiptNumber = callbackMetadata.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value;
        const transactionDate = callbackMetadata.find((item: any) => item.Name === 'TransactionDate')?.Value;

        // Check if we already have this receipt number in our payments
        const existingPayment = await Payment.findOne({ transactionId: mpesaReceiptNumber });
        if (existingPayment) {
          console.log(`[Reconciliation] Payment already recorded for receipt: ${mpesaReceiptNumber}`);
          return true; // Already processed
        }

        // Update STK request status
        stkRequest.status = 'completed';
        stkRequest.transactionId = mpesaReceiptNumber;
        stkRequest.transactionDate = transactionDate;
        await stkRequest.save();

        // Process the reservation
        const reservation = await SeatReservation.findById(stkRequest.reservationId);
        if (!reservation) {
          console.warn(`[Reconciliation] Reservation not found: ${stkRequest.reservationId}`);
          return false;
        }

        if (reservation.status === 'active') {
          // Complete the reservation
          reservation.status = 'completed';
          await reservation.save();

          // Create booking from reservation
          const booking = await bookingService.createBookingFromReservation(stkRequest.reservationId);

          // Create payment record
          const paymentData: IPayment = {
            bookingId: booking._id!,
            amount: stkRequest.amount,
            paymentDate: new Date(),
            paymentMethod: 'mpesa',
            transactionId: mpesaReceiptNumber,
            status: 'completed'
          };

          await Payment.create(paymentData);

          console.log(`[Reconciliation] Successfully processed previously unrecorded payment: ${mpesaReceiptNumber}`);

          // Notify user of successful payment
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

          return true;
        } else {
          console.warn(`[Reconciliation] Cannot process reservation in status: ${reservation.status}`);
          return false;
        }
      } else {
        console.log(`[Reconciliation] Transaction ${stkRequest.checkoutRequestID} confirmed as unsuccessful by M-Pesa. Code: ${transactionStatus.ResultCode}`);
        return false;
      }
    } catch (error: any) {
      console.error(`[Reconciliation] Error processing transaction ${stkRequest.checkoutRequestID}:`, error.message);
      return false;
    }
  }

  // Run the reconciliation process
  async runReconciliation(): Promise<void> {
    console.log('[Reconciliation] Starting reconciliation process...');
    try {
      // Find STK requests that are still pending but might have been completed
      const pendingRequests = await STKRequest.find({
        status: 'pending',
        // Look at requests from the last 24 hours
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      });

      console.log(`[Reconciliation] Found ${pendingRequests.length} pending requests to verify`);

      for (const request of pendingRequests) {
        try {
          await this.processPotentiallySuccessfulTransaction(request);
        } catch (error) {
          console.error(`[Reconciliation] Error processing request ${request.checkoutRequestID}:`, error);
          // Continue with next request
        }
      }

      console.log('[Reconciliation] Reconciliation process completed');
    } catch (error) {
      console.error('[Reconciliation] Error during reconciliation process:', error);
    }
  }
}

export const mpesaReconciliationService = new MpesaReconciliationService();
