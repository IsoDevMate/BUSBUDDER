
import { Request, Response } from 'express';
import { paymentService } from '../services/paymentService';
import { apiResponse } from '../utils/apiv2response';

export class PaymentController {
  // Initiate payment for a reservation
   async initiatePaymentForReservation(req: Request, res: Response) {
    try {
      const { reservationId, amount, paymentMethod, phoneNumber } = req.body;

      if (!reservationId || !amount || !paymentMethod || !phoneNumber) {
        return apiResponse(res, 400, 'Missing required payment details', null);
      }

      if (paymentMethod !== 'mpesa') {
        return apiResponse(res, 400, 'Unsupported payment method', null);
      }

      const result = await paymentService.processMpesaPaymentForReservation(
        reservationId,
        phoneNumber,
        amount
      );

      if (!result.success) {
        return apiResponse(res, 400, result.message, null);
      }

      return apiResponse(res, 200, 'Payment processed successfully', {
        transactionId: result.transactionId,
        bookingId: result.bookingId,
        message: result.message
      });
    } catch (error) {
      console.error('Error initiating payment:', error);
      return apiResponse(res, 500, 'Failed to initiate payment', null, error);
    }
  }


// Update this in paymentController.ts
async initiateSTKPush(req: Request, res: Response) {
  try {
    const { reservationId, phoneNumber, amount } = req.body;

    // Validate request parameters
    if (!reservationId) {
      return apiResponse(res, 400, 'Missing required field: reservationId', null);
    }

    if (!phoneNumber) {
      return apiResponse(res, 400, 'Missing required field: phoneNumber', null);
    }

    if (!amount) {
      return apiResponse(res, 400, 'Missing required field: amount', null);
    }

    console.log('[STK-Push] Request received:', {
      reservationId,
      phoneNumber: phoneNumber.substring(0, 4) + '****' + phoneNumber.slice(-4), // Mask for privacy
      amount
    });

    const result = await paymentService.processMpesaSTKPush(
      reservationId,
      phoneNumber,
      amount
    );

    if (!result.success) {
      console.log('[STK-Push] Failed:', result.message);

      // Include detailed error information for debugging if available
      const errorDetail = result.error ? result.error : null;

      return apiResponse(res, 400, result.message, null, errorDetail);
    }

    console.log('[STK-Push] Success:', {
      checkoutRequestID: result.checkoutRequestID,
      message: result.message
    });

    return apiResponse(res, 200, 'STK push initiated successfully', {
      checkoutRequestID: result.checkoutRequestID,
      message: result.message
    });
  } catch (error: any) {
    console.error('[STK-Push] Error:', error);

    // Determine appropriate status code based on error
    const statusCode = error.response?.status || 500;

    return apiResponse(
      res,
      statusCode,
      'Failed to initiate STK push',
      null,
      {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        response: error.response?.data
      }
    );
  }
}

async mpesaCallback(req: Request, res: Response) {
  try {
    console.log('[Mpesa Callback] Received callback:', req.body);

    const result = await paymentService.handleMpesaCallback(req.body);

    console.log('[Mpesa Callback] Processed successfully:', result);

    // Always respond with success to M-Pesa (even if we have internal errors)
    // to prevent M-Pesa from retrying the request
    return res.status(200).json({
      ResultCode: 0,
      ResultDesc: "Accepted"
    });
  } catch (error) {
    console.error('[Mpesa Callback] Error processing callback:', error);

    // Still respond with success to M-Pesa
    return res.status(200).json({
      ResultCode: 0,
      ResultDesc: "Accepted"
    });
  }
}


  // // Verify payment callback from payment gateway
  //  async verifyPaymentCallback(req: Request, res: Response) {
  //   try {
  //     const result = await paymentService.verifyPaymentCallback(req.body);

  //     if (result) {
  //       return apiResponse(res, 200, 'Payment verification processed successfully', null);
  //     } else {
  //       return apiResponse(res, 400, 'Failed to process payment verification', null);
  //     }
  //   } catch (error) {
  //     console.error('Error verifying payment:', error);
  //     return apiResponse(res, 500, 'Failed to verify payment', null, error);
  //   }
  // }




  // Get payment by ID


  async getPaymentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payment = await paymentService.getPaymentById(id);

      if (!payment) {
        return apiResponse(res, 404, 'Payment not found', null);
      }

      return apiResponse(res, 200, 'Payment retrieved successfully', payment);
    } catch (error) {
      console.error('Error retrieving payment:', error);
      return apiResponse(res, 500, 'Failed to retrieve payment', null, error);
    }
  }

  // Get payments by booking ID
   async getPaymentsByBookingId(req: Request, res: Response) {
    try {
      const { bookingId } = req.params;
      const payments = await paymentService.getPaymentsByBookingId(bookingId);
      return apiResponse(res, 200, 'Payments retrieved successfully', payments);
    } catch (error) {
      console.error('Error retrieving payments:', error);
      return apiResponse(res, 500, 'Failed to retrieve payments', null, error);
    }
  }

  async getAllPayments(req: Request, res: Response) {
    try {
      const payments = await paymentService.getAllPayments();
      return apiResponse(res, 200, 'Payments retrieved successfully', payments);
    } catch (error) {
      console.error('Error retrieving all payments:', error);
      return apiResponse(res, 500, 'Failed to retrieve payments', null, error);
    }
  }

  // Update payment status (admin only)
   async updatePaymentStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['pending', 'completed', 'failed', 'refunded'].includes(status)) {
        return apiResponse(res, 400, 'Invalid status value', null);
      }

      const updatedPayment = await paymentService.updatePaymentStatus(id, status);

      if (!updatedPayment) {
        return apiResponse(res, 404, 'Payment not found', null);
      }

      return apiResponse(res, 200, 'Payment status updated successfully', updatedPayment);
    } catch (error) {
      console.error('Error updating payment status:', error);
      return apiResponse(res, 500, 'Failed to update payment status', null, error);
    }
  }
}
