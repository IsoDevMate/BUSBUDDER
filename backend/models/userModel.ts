import mongoose, { Document, Schema } from 'mongoose';

export enum UserRole {
  PASSENGER = 'passenger',
  BUS_OPERATOR = 'bus_operator',
  ADMIN = 'admin'
}

export interface User extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: UserRole;
  profileImage?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<User>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: false,
      trim: true
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.PASSENGER
    },
    profileImage: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model<User>('User', userSchema);


