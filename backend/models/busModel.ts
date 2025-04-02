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
    model: {
      type: String,
      required: true,
      trim: true
    },
    assignmentStatus: {
      type: String,
      enum: ['assigned', 'unassigned'],
      default: 'unassigned'
    },

    servingRoutes: [
      {
        departure: {
          type: String,
          required: true
        },
        destination: {
          type: String,
          required: true
        }
      }
    ],

    lastMaintenanceDate: {
      type: Date,
      required: false
    },

    nextMaintenanceDate: {
      type: Date,
      required: false
    },
    lastAssignmentDate: {
      type: Date,
      required: false
    },
    availableForAssignmentDate: {
      type: Date,
      required: false
    },
    routes: [
      {
        type: Schema.Types.ObjectId as any,
        ref: 'Route'
      }
    ],
    operatorId: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      required: false
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
