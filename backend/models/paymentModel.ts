import mongoose, { Schema } from 'mongoose';
import { Payment } from '../interfaces/payment.interface';

const paymentSchema = new Schema<Payment>(
  {
    bookingId: {
      type: Schema.Types.ObjectId as any,
      ref: 'Booking',
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    paymentDate: {
      type: Date,
      default: Date.now
    },
    paymentMethod: {
      type: String,
      enum: ['mpesa'],
      required: true
    },
    transactionId: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

const Payment = mongoose.model<Payment>('Payment', paymentSchema);

export default Payment;
