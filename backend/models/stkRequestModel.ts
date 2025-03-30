import mongoose, { Document, Schema } from 'mongoose';

export interface STKRequest extends Document {
  reservationId: string;
  checkoutRequestID: string;
  merchantRequestID: string;
  amount: number;
  phoneNumber: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  transactionDate?: string;
  failureReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const STKRequestSchema = new Schema(
  {
    reservationId: {
      type: Schema.Types.ObjectId,
      ref: 'SeatReservation',
      required: true
    },
    checkoutRequestID: {
      type: String,
      required: true,
      unique: true
    },
    merchantRequestID: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    transactionId: String,
    transactionDate: String,
    failureReason: String
  },
  { timestamps: true }
);

export default mongoose.model<STKRequest>('STKRequest', STKRequestSchema);
