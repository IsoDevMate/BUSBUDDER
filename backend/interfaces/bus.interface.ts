import { Document } from 'mongoose';

export interface Bus {
  busNumber: string;
  capacity: number;
  operatorId?: string; // References User with role OPERATOR
  status: 'active' | 'maintenance' | 'inactive';
  amenities: string[];
}

export interface BusDocument extends Omit<Bus, 'id'>, Document {
  createdAt: Date;
  updatedAt: Date;
}
