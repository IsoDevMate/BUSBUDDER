import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { User, UserRole, UserDocument } from '../interfaces/user.interface';

const userSchema = new Schema<UserDocument>(
  {
    name: {
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
    phone: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.PASSENGER
    }
  },
  {
    timestamps: true
  }
);



const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
