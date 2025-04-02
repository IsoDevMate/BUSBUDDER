import Schedule from '../models/scheduleModel';
import Bus from '../models/busModel';
import Route from '../models/routeModel';
import { busService } from './busService';
import { routeService } from './routeService';
import { Schedule as ScheduleInterface } from '../interfaces/schedule.interface';
import mongoose from 'mongoose';

class ScheduleService {
  // Create a new schedule
  async createSchedule(scheduleData: {
    routeName: string;
    busNumber: string;
    departureTime: Date;
    arrivalTime: Date;
    fare: number;
  }): Promise<ScheduleInterface> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Get the route by name
      const route = await Route.findOne({ name: scheduleData.routeName }).session(session);
      if (!route) {
        throw new Error('Route not found');
      }

      // Get the bus by number
      const bus = await Bus.findOne({ busNumber: scheduleData.busNumber }).session(session);
      if (!bus) {
        throw new Error('Bus not found');
      }

      // Check if bus is active
      if (bus.status !== 'active') {
        throw new Error('Bus is not active');
      }

      // Check if bus is unassigned or available for assignment
      const now = new Date();
      if (bus.assignmentStatus === 'assigned' &&
          bus.availableForAssignmentDate &&
          bus.availableForAssignmentDate > now) {
        throw new Error('Bus is not available for assignment at this time');
      }

      // Validate departure time
      const departureTime = new Date(scheduleData.departureTime);
      if (departureTime <= new Date()) {
        throw new Error('Departure time must be in the future');
      }

      // Validate schedule times
      this.validateScheduleTimes(departureTime, new Date(scheduleData.arrivalTime));

      // Check for conflicting schedules
      const existingSchedule = await Schedule.findOne({
        busNumber: scheduleData.busNumber,
        $or: [
          {
            departureTime: {
              $lte: departureTime,
              $gte: departureTime
            }
          },
          {
            arrivalTime: {
              $lte: scheduleData.arrivalTime,
              $gte: scheduleData.arrivalTime
            }
          },
          {
            departureTime: { $lte: departureTime },
            arrivalTime: { $gte: scheduleData.arrivalTime }
          }
        ],
        status: { $in: ['scheduled', 'in-transit'] }
      }).session(session);

      if (existingSchedule) {
        throw new Error('Bus is already scheduled for this time period');
      }

      // Create the schedule
      const newScheduleData = {
        routeId: route._id,
        routeName: route.name,
        busId: bus._id,
        busNumber: bus.busNumber,
        departureTime: departureTime,
        arrivalTime: new Date(scheduleData.arrivalTime),
        fare: scheduleData.fare,
        availableSeats: bus.capacity,
        status: 'scheduled'
      };

      const newSchedule = await Schedule.create([newScheduleData], { session });

      // Update bus assignment status
      await Bus.findByIdAndUpdate(
        bus._id,
        {
          assignmentStatus: 'assigned',
          lastAssignmentDate: new Date(),
          availableForAssignmentDate: new Date(scheduleData.arrivalTime)
        },
        { session }
      );

      await session.commitTransaction();
      return newSchedule[0];
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  // Validate schedule times to ensure they meet business rules
  validateScheduleTimes(departureTime: Date, arrivalTime: Date): void {
    // Check that arrival time is after departure time
    if (arrivalTime <= departureTime) {
      throw new Error('Arrival time must be after departure time');
    }

    // Calculate duration in hours
    const durationMs = arrivalTime.getTime() - departureTime.getTime();
    const durationMinutes = durationMs / (1000 * 60);

    // Check minimum duration (420 minutes, equivalent to 7 hours)
    if (durationMinutes < 420) {
      throw new Error('Schedule duration must be at least 7 hours');
    }

    // Check maximum duration (10 hours)
    if (durationMinutes > 600) {
      throw new Error('Schedule duration must not exceed 10 hours');
    }

    // Check departure time (must be between 8:00am and 10:00pm)
    const departureHour = departureTime.getHours();
    const departureMinutes = departureTime.getMinutes();

    if (departureHour < 8 || (departureHour === 22 && departureMinutes > 0) || departureHour > 22) {
      throw new Error('Departure time must be between 8:00am and 10:00pm');
    }

    // First bus leaves at 8:30am
    if (departureHour === 8 && departureMinutes < 30) {
      throw new Error('First bus of the day leaves at 8:30am');
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
      .sort({ departureTime: 1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async getScheduleById(scheduleId: string): Promise<ScheduleInterface | null> {
    return await Schedule.findById(scheduleId).exec();
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

    // If times are being updated, validate them
    if (scheduleData.departureTime || scheduleData.arrivalTime) {
      const departureTime = scheduleData.departureTime
        ? new Date(scheduleData.departureTime)
        : schedule.departureTime;

      const arrivalTime = scheduleData.arrivalTime
        ? new Date(scheduleData.arrivalTime)
        : schedule.arrivalTime;

      this.validateScheduleTimes(departureTime, arrivalTime);
    }

    return await Schedule.findByIdAndUpdate(scheduleId, scheduleData, { new: true }).exec();
  }

  async cancelSchedule(scheduleId: string): Promise<ScheduleInterface | null> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const schedule = await Schedule.findById(scheduleId).session(session);
      if (!schedule) {
        throw new Error('Schedule not found');
      }

      if (schedule.status === 'completed') {
        throw new Error('Cannot cancel completed schedule');
      }

      if (schedule.status === 'cancelled') {
        throw new Error('Schedule is already cancelled');
      }

      // Update schedule status
      const updatedSchedule = await Schedule.findByIdAndUpdate(
        scheduleId,
        { status: 'cancelled' },
        { new: true, session }
      ).exec();

      // Update bus assignment status if the schedule is in the future
      if (schedule.departureTime > new Date()) {
        await Bus.findByIdAndUpdate(
          schedule.busId,
          {
            assignmentStatus: 'unassigned',
            availableForAssignmentDate: null
          },
          { session }
        );
      }

      await session.commitTransaction();
      return updatedSchedule;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
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
    const routeNames = routes.map(route => route.name);

    const scheduleQuery: any = {
      routeName: { $in: routeNames },
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

  async getAvailableSeats(scheduleId: string): Promise<number> {
    return Schedule.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(scheduleId) }
      },
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'scheduleId',
          as: 'bookings'
        }
      },
      {
        $project: {
          availableSeats: 1,
          bookedSeatsCount: {
            $sum: {
              $map: {
                input: '$bookings',
                as: 'booking',
                in: { $size: '$$booking.seatNumber' }
              }
            }
          }
        }
      }
    ]).then(results => {
      if (results.length > 0) {
        const schedule = results[0];
        return schedule.availableSeats - schedule.bookedSeatsCount;
      } else {
        throw new Error('Schedule not found');
      }
    });
  }
}

export const scheduleService = new ScheduleService();
