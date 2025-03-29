
export interface Schedule {
  _id?: string;
  routeId: string;
  busId: string;
  departureTime: Date;
  arrivalTime: Date;
  fare: number;
  availableSeats: number;
  status: 'scheduled' | 'in-transit' | 'completed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}
