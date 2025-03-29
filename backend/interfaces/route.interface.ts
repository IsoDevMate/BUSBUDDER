export interface Route {
  _id?: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  estimatedDuration: number; // in minutes
  createdAt?: Date;
  updatedAt?: Date;
}
