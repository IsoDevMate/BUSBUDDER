import mongoose, { Schema } from 'mongoose';
import { Schedule } from '../interfaces/schedule.interface';

const scheduleSchema = new Schema<Schedule>(
  {
    routeId: {
      type: Schema.Types.ObjectId as any,
      ref: 'Route',
      required: true
    },
    routeName: {
      type: String,
      required: true,
      trim: true
    },
    busNumber: {
      type: String,
      required: true,
      trim: true
    },
    busId: {
      type: Schema.Types.ObjectId as any,
      ref: 'Bus',
      required: true
    },
    departureTime: {
      type: Date,
      required: true
    },
    arrivalTime: {
      type: Date,
      required: true
    },
    fare: {
      type: Number,
      required: true,
      min: 0
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ['scheduled', 'in-transit', 'completed', 'cancelled'],
      default: 'scheduled'
    }
  },
  {
    timestamps: true
  }
);

const Schedule = mongoose.model<Schedule>('Schedule', scheduleSchema);

export default Schedule;
