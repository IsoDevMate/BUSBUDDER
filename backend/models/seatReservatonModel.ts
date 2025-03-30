import mongoose, { Schema } from 'mongoose';

export interface SeatReservation {
  _id?: string;
  scheduleId: string;
  seatNumber: number[];
  userEmail: string;
  userPhone: string;
  userName: string;
  reservationDate: Date;
  expiryDate: Date; // Reservation expires after e.g. 15 minutes
  status: 'active' | 'completed' | 'expired';
}

const seatReservationSchema = new Schema<SeatReservation>(
  {
    scheduleId: {
      type: Schema.Types.ObjectId as any,
      ref: 'Schedule',
      required: true
    },
    seatNumber: {
      type: [Number],
      required: true
    },
    userEmail: {
      type: String,
      required: true,
      trim: true
    },
    userPhone: {
      type: String,
      required: true,
      trim: true
    },
    userName: {
      type: String,
      required: true,
      trim: true
    },
    reservationDate: {
      type: Date,
      default: Date.now
    },
    expiryDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'expired'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

const SeatReservation = mongoose.model<SeatReservation>('SeatReservation', seatReservationSchema);

export default SeatReservation;
