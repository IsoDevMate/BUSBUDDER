// import { Document } from 'mongoose';

// export interface Bus {
//   busNumber: string;
//   capacity: number;
//   operatorId?: string; // References User with role OPERATOR
//   status: 'active' | 'maintenance' | 'inactive';
//   amenities: string[];
// }

// export interface BusDocument extends Omit<Bus, 'id'>, Document {
//   createdAt: Date;
//   updatedAt: Date;
// }


export interface Bus {
  _id?: string;
  busNumber: string;
  capacity: number;
  model: string;
  amenities: string[];
  status: 'active' | 'maintenance' | 'inactive';
  assignmentStatus: 'assigned' | 'unassigned';
  operatorId?: string;
  routes?: string[];
  servingRoutes?: {
    departure: string;
    destination: string;
  }[];
  lastMaintenanceDate?: Date;
  nextMaintenanceDate?: Date;
  lastAssignmentDate?: Date;
  availableForAssignmentDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
