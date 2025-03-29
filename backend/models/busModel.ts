import mongoose, { Schema } from 'mongoose';
import { Bus } from '../interfaces/bus.interface';

const busSchema = new Schema<Bus>(
  {
    busNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    capacity: {
      type: Number,
      required: true,
      min: 1
    },
    operatorId: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'maintenance', 'inactive'],
      default: 'active'
    },
    amenities: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Bus = mongoose.model<Bus>('Bus', busSchema);

export default Bus;
