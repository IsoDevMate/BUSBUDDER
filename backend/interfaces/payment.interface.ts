export interface Payment {
  _id?: string;
  bookingId: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: 'mpesa'
  transactionId: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt?: Date;
  updatedAt?: Date;
}
