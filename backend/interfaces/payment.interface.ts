import { Document } from 'mongoose';

export interface Payment {
  id?: string;
  bookingId: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: 'mpesa'; // Can be expanded to include other payment methods
  transactionId: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
}

export interface PaymentDocument extends Omit<Payment,'id'>, Document {
  createdAt: Date;
  updatedAt: Date;
}
