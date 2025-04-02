
export interface Route {
  _id?: string;
  name: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  estimatedDuration: number;
  createdAt?: Date;
  updatedAt?: Date;
}
