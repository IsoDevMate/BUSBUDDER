export interface Booking {
  _id?: string;
  userId?: string; 
  userName: string;
  userEmail: string;
  userPhone: string;
  scheduleId: string;
  seatNumber: number[];
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  bookingDate: Date;
  status: 'confirmed' | 'cancelled' | 'completed';
  ticketId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
