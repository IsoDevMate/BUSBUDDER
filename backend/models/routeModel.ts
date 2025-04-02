import mongoose, { Schema } from 'mongoose';
import { Route } from '../interfaces/route.interface';

const routeSchema = new Schema<Route>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    startLocation: {
      type: String,
      required: true,
      trim: true
    },
    endLocation: {
      type: String,
      required: true,
      trim: true
    },
    distance: {
      type: Number,
      required: true,
      min: 0
    },
    estimatedDuration: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

const Route = mongoose.model<Route>('Route', routeSchema);

export default Route;
