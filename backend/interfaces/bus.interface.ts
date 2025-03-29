
export interface Bus {
  _id?: string;
  busNumber: string;
  capacity: number;
  operatorId: string; // Reference to user with role BUS_OPERATOR
  status: 'active' | 'maintenance' | 'inactive';
  amenities?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
