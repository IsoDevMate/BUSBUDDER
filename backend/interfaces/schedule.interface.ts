import { Route } from './route.interface';
import { Bus } from './bus.interface';
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




// Then define a populated version of Schedule
export interface PopulatedSchedule extends Omit<Schedule, 'routeId' | 'busId'> {
  routeId: Route;
  busId: Bus;
}
