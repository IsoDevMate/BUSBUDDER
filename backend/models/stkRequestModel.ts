// import mongoose, { Document, Schema } from 'mongoose';

// export interface STKRequest extends Document {
//   reservationId: string;
//   checkoutRequestID: string;
//   merchantRequestID: string;
//   amount: number;
//   phoneNumber: string;
//   status: 'pending' | 'completed' | 'failed';
//   transactionId?: string;
//   transactionDate?: string;
//   failureReason?: string;
//    resultCode?: { type: Number } // Added resultCode property
//   createdAt: Date;
//   updatedAt: Date;
// }




// const STKRequestSchema = new Schema(
//   {
//     reservationId: {
//       type: Schema.Types.ObjectId,
//       ref: 'SeatReservation',
//       required: true
//     },
//     checkoutRequestID: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     merchantRequestID: {
//       type: String,
//       required: true
//     },
//     amount: {
//       type: Number,
//       required: true
//     },
//     phoneNumber: {
//       type: String,
//       required: true
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'completed', 'failed'],
//       default: 'pending'
//     },
//     transactionId: String,
//     transactionDate: String,
//     failureReason: String,
//     resultCode: {
//       type: Number,
//       required: false
//     },

//   },
//   { timestamps: true }
// );

// export default mongoose.model<STKRequest>('STKRequest', STKRequestSchema);


// Update your STKRequest model (or create it if it doesn't exist)

import mongoose, { Schema, Document } from 'mongoose';

export interface ISTKRequest extends Document {
  reservationId: mongoose.Types.ObjectId;
  checkoutRequestID: string;
  merchantRequestID: string;
  amount: number;
  phoneNumber: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  transactionDate?: string;
  failureReason?: string;
  resultCode?: number;
  createdAt: Date;
  updatedAt: Date;
}

const STKRequestSchema: Schema = new Schema({
  reservationId: {
    type: mongoose.Schema.Types.ObjectId,
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
  failureReason: String,
  resultCode: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model<ISTKRequest>('STKRequest', STKRequestSchema);
