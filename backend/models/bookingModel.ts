import mongoose, { Schema } from 'mongoose';
import { Booking } from '../interfaces/booking.interface';

const bookingSchema = new Schema<Booking>(
  {
    userId: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      required: false
    },
    userName: {
      type: String,
      required: true,
      trim: true
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
    scheduleId: {
      type: Schema.Types.ObjectId as any,
      ref: 'Schedule',
      required: true
    },
    seatNumber: {
      type: [Number],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    bookingDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'completed'],
      default: 'confirmed'
    },
    ticketId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model<Booking>('Booking', bookingSchema);

export default Booking;
