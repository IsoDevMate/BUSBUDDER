import { Request, Response } from 'express';
import { paymentService } from '../services/paymentService';
import { apiResponse } from '../utils/apiv2response';

export class PaymentController {
  // Initialize payment
  static async initiatePayment(req: Request, res: Response) {
    try {
      const { bookingId, amount, paymentMethod, phoneNumber } = req.body;

      if (!bookingId || !amount || !paymentMethod || !phoneNumber) {
        return apiResponse(res, 400, 'Missing required payment details', null);
      }

      if (paymentMethod !== 'mpesa') {
        return apiResponse(res, 400, 'Unsupported payment method', null);
      }

      const result = await paymentService.processMpesaPayment(phoneNumber, amount, bookingId);

      if (!result.success) {
        return apiResponse(res, 400, result.message, null);
      }

      return apiResponse(res, 200, 'Payment initiated successfully', {
        transactionId: result.transactionId,
        message: result.message
      });
    } catch (error) {
      console.error('Error initiating payment:', error);
      return apiResponse(res, 500, 'Failed to initiate payment', null, error);
    }
  }

  // Get payment by ID
  static async getPaymentById(req: Request, res: Response) {
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
  static async getPaymentsByBookingId(req: Request, res: Response) {
    try {
      const { bookingId } = req.params;
      const payments = await paymentService.getPaymentsByBookingId(bookingId);
      return apiResponse(res, 200, 'Payments retrieved successfully', payments);
    } catch (error) {
      console.error('Error retrieving payments:', error);
      return apiResponse(res, 500, 'Failed to retrieve payments', null, error);
    }
  }

  // Update payment status (admin only)
  static async updatePaymentStatus(req: Request, res: Response) {
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

  // Verify payment (callback from payment gateway)
  static async verifyPayment(req: Request, res: Response) {
    try {
      // In a real implementation, this would handle callbacks from the payment gateway
      // For our mock implementation, we'll just return a success message
      return apiResponse(res, 200, 'Payment verification received', null);
    } catch (error) {
      console.error('Error verifying payment:', error);
      return apiResponse(res, 500, 'Failed to verify payment', null, error);
    }
  }
}

