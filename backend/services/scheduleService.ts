import Schedule from '../models/scheduleModel';
import Bus from '../models/busModel';
import Route from '../models/routeModel';
import { Schedule as ScheduleInterface } from '../interfaces/schedule.interface';
import mongoose from 'mongoose';

class ScheduleService {
  // Create a new schedule
  async createSchedule(scheduleData: {
    routeId: string;
    busId: string;
    departureTime: Date;
    arrivalTime: Date;
    fare: number;
  }): Promise<ScheduleInterface> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const route = await Route.findById(scheduleData.routeId).session(session);
      if (!route) {
        throw new Error('Route not found');
      }

      const bus = await Bus.findById(scheduleData.busId).session(session);
      if (!bus) {
        throw new Error('Bus not found');
      }
      if (bus.status !== 'active') {
        throw new Error('Bus is not active');
      }

      const departureTime = new Date(scheduleData.departureTime);
      if (departureTime <= new Date()) {
        throw new Error('Departure time must be in the future');
      }

      const arrivalTime = new Date(scheduleData.arrivalTime);
      if (arrivalTime <= departureTime) {
        throw new Error('Arrival time must be after departure time');
      }

      const existingSchedule = await Schedule.findOne({
        busId: scheduleData.busId,
        $or: [
          {
            departureTime: {
              $lte: departureTime,
              $gte: departureTime
            }
          },
          {
            arrivalTime: {
              $lte: arrivalTime,
              $gte: arrivalTime
            }
          },
          {
            departureTime: { $gte: departureTime },
            arrivalTime: { $lte: arrivalTime }
          }
        ],
        status: { $in: ['scheduled', 'in-transit'] }
      }).session(session);

      if (existingSchedule) {
        throw new Error('Bus is already scheduled for this time period');
      }

      const newSchedule = await Schedule.create([{
        ...scheduleData,
        availableSeats: bus.capacity,
        status: 'scheduled'
      }], { session });

      await session.commitTransaction();
      return newSchedule[0];
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async getAllSchedules(
    skip: number = 0,
    limit: number = 10,
    filters: {
      status?: string;
      startDate?: Date;
      endDate?: Date;
    } = {}
  ): Promise<ScheduleInterface[]> {
    const query: any = {};

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.startDate || filters.endDate) {
      query.departureTime = {};
      if (filters.startDate) {
        query.departureTime.$gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        query.departureTime.$lte = new Date(filters.endDate);
      }
    }

    return await Schedule.find(query)
      .populate('routeId')
      .populate('busId')
      .sort({ departureTime: 1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async getScheduleById(scheduleId: string): Promise<ScheduleInterface | null> {
    return await Schedule.findById(scheduleId)
      .populate('routeId')
      .populate('busId')
      .exec();
  }

  async updateSchedule(
    scheduleId: string,
    scheduleData: Partial<ScheduleInterface>
  ): Promise<ScheduleInterface | null> {
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      throw new Error('Schedule not found');
    }

    if (schedule.status === 'completed' || schedule.status === 'cancelled') {
      throw new Error(`Cannot update ${schedule.status} schedule`);
    }

    if (
      scheduleData.availableSeats !== undefined &&
      scheduleData.availableSeats < (schedule.availableSeats - (await this.getBookedSeatsCount(scheduleId)))
    ) {
      throw new Error('Cannot decrease available seats below already booked seats');
    }

    return await Schedule.findByIdAndUpdate(scheduleId, scheduleData, { new: true })
      .populate('routeId')
      .populate('busId')
      .exec();
  }

  async cancelSchedule(scheduleId: string): Promise<ScheduleInterface | null> {
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      throw new Error('Schedule not found');
    }

    if (schedule.status === 'completed') {
      throw new Error('Cannot cancel completed schedule');
    }

    if (schedule.status === 'cancelled') {
      throw new Error('Schedule is already cancelled');
    }

    return await Schedule.findByIdAndUpdate(
      scheduleId,
      { status: 'cancelled' },
      { new: true }
    )
      .populate('routeId')
      .populate('busId')
      .exec();
  }

  async searchSchedules(
    searchParams: {
      startLocation?: string;
      endLocation?: string;
      date?: Date;
    }
  ): Promise<any[]> {
    let routeQuery = {};

    if (searchParams.startLocation && searchParams.endLocation) {
      routeQuery = {
        startLocation: { $regex: searchParams.startLocation, $options: 'i' },
        endLocation: { $regex: searchParams.endLocation, $options: 'i' }
      };
    } else if (searchParams.startLocation) {
      routeQuery = {
        startLocation: { $regex: searchParams.startLocation, $options: 'i' }
      };
    } else if (searchParams.endLocation) {
      routeQuery = {
        endLocation: { $regex: searchParams.endLocation, $options: 'i' }
      };
    }

    const routes = await Route.find(routeQuery).exec();
    const routeIds = routes.map(route => route._id);

    const scheduleQuery: any = {
      routeId: { $in: routeIds },
      status: 'scheduled'
    };

    if (searchParams.date) {
      const dateStart = new Date(searchParams.date);
      dateStart.setHours(0, 0, 0, 0);

      const dateEnd = new Date(searchParams.date);
      dateEnd.setHours(23, 59, 59, 999);

      scheduleQuery.departureTime = {
        $gte: dateStart,
        $lte: dateEnd
      };
    } else {
      scheduleQuery.departureTime = { $gte: new Date() };
    }

    const schedules = await Schedule.find(scheduleQuery)
      .populate('routeId')
      .populate('busId')
      .sort({ departureTime: 1 })
      .exec();

    return schedules;
  }

  async getBookedSeatsCount(scheduleId: string): Promise<number> {
    const Booking = mongoose.model('Booking');
    const bookings = await Booking.find({
      scheduleId,
      status: { $ne: 'cancelled' }
    }).exec();

    let bookedSeatsCount = 0;
    bookings.forEach(booking => {
      bookedSeatsCount += booking.seatNumber.length;
    });

    return bookedSeatsCount;
  }

  async getBookedSeats(scheduleId: string): Promise<number[]> {
    const Booking = mongoose.model('Booking');
    const bookings = await Booking.find({
      scheduleId,
      status: { $ne: 'cancelled' }
    }).exec();

    const bookedSeats: number[] = [];
    bookings.forEach(booking => {
      bookedSeats.push(...booking.seatNumber);
    });

    return bookedSeats;
  }
}

export const scheduleService = new ScheduleService();
