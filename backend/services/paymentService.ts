import Payment from '../models/paymentModel';
import Booking from '../models/bookingModel';
import { Payment as IPayment } from '../interfaces/payment.interface';
import mongoose from 'mongoose';
import { emailService } from './emailService';

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

        // Update booking payment status
        const booking = await Booking.findByIdAndUpdate(
          paymentData.bookingId,
          { paymentStatus: paymentData.status },
          { new: true, session }
        ).populate('scheduleId');

        await session.commitTransaction();
        session.endSession();

        // Send payment confirmation email if payment is completed
        if (paymentData.status === 'completed' && booking) {
          try {
            await emailService.sendPaymentConfirmation(
              booking.userEmail,
              booking.userName,
              booking.ticketId,
              paymentData.amount,
              paymentData.transactionId
            );
          } catch (emailError) {
            console.error('Failed to send payment confirmation email:', emailError);
          }
        }

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

  // Other payment service methods remain the same...
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

        // Update booking payment status
        const booking = await Booking.findByIdAndUpdate(
          payment.bookingId,
          { paymentStatus: status },
          { new: true, session }
        );

        await session.commitTransaction();
        session.endSession();

        // Send payment confirmation email if payment is completed
        if (status === 'completed' && booking) {
          try {
            await emailService.sendPaymentConfirmation(
              booking.userEmail,
              booking.userName,
              booking.ticketId,
              payment.amount,
              payment.transactionId
            );
          } catch (emailError) {
            console.error('Failed to send payment confirmation email:', emailError);
          }
        }

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

  // Process MPesa payment (mock implementation)
  async processMpesaPayment(
    phoneNumber: string,
    amount: number,
    bookingId: string
  ): Promise<{ success: boolean; transactionId?: string; message: string }> {
    try {
      // In a real implementation, this would integrate with the MPesa API
      // For now, we'll mock a successful payment

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate a mock transaction ID
      const transactionId = `MPESA-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Get booking info for the email
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        return {
          success: false,
          message: 'Booking not found'
        };
      }

      // Create payment record
      const paymentData: IPayment = {
        bookingId,
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
        message: 'Payment processed successfully'
      };
    } catch (error) {
      console.error('Error processing MPesa payment:', error);
      return {
        success: false,
        message: 'Failed to process payment'
      };
    }
  }
}

export const paymentService = new PaymentService();
