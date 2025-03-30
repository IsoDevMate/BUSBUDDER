import { routeService } from './routeService';
import { scheduleService } from './scheduleService';
import Route from '../models/routeModel';
import Schedule from '../models/scheduleModel';
import Bus from '../models/busModel';
import mongoose from 'mongoose';

export const searchService = {
  // Search for available bus schedules based on route and date
  async searchAvailableBuses(searchParams: {
    startLocation?: string;
    endLocation?: string;
    date?: Date;
    minSeats?: number;
  }) {
    // Default to requiring 1 seat if not specified
    const minSeats = searchParams.minSeats || 1;

    // Build location search query
    let routeQuery: any = {};
    if (searchParams.startLocation) {
      routeQuery.startLocation = { $regex: searchParams.startLocation, $options: 'i' };
    }
    if (searchParams.endLocation) {
      routeQuery.endLocation = { $regex: searchParams.endLocation, $options: 'i' };
    }

    // Find matching routes
    const routes = await Route.find(routeQuery).exec();
    const routeIds = routes.map(route => route._id);

    if (routeIds.length === 0) {
      return [];
    }

    // Build date query
    let dateQuery: any = {};
    if (searchParams.date) {
      const searchDate = new Date(searchParams.date);
      const startOfDay = new Date(searchDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(searchDate);
      endOfDay.setHours(23, 59, 59, 999);

      dateQuery = {
        $gte: startOfDay,
        $lte: endOfDay
      };
    } else {
      // If no date specified, search for future schedules from now
      dateQuery = { $gte: new Date() };
    }

    // Find matching schedules
    const schedules = await Schedule.find({
      routeId: { $in: routeIds },
      departureTime: dateQuery,
      availableSeats: { $gte: minSeats },
      status: 'scheduled'
    })
      .populate({
        path: 'routeId',
        model: 'Route'
      })
      .populate({
        path: 'busId',
        model: 'Bus',
        select: 'busNumber capacity amenities'
      })
      .sort({ departureTime: 1 })
      .exec();

    return schedules;
  },

  // Get popular routes based on booking count
  async getPopularRoutes(limit: number = 5) {
    const Booking = mongoose.model('Booking');

    // Aggregate to find most booked routes
    const popularRoutes = await Booking.aggregate([
      {
        // Match only confirmed and completed bookings
        $match: {
          status: { $in: ['confirmed', 'completed'] }
        }
      },
      {
        // Lookup to get schedule information
        $lookup: {
          from: 'schedules',
          localField: 'scheduleId',
          foreignField: '_id',
          as: 'schedule'
        }
      },
      {
        $unwind: '$schedule'
      },
      {
        // Lookup to get route information
        $lookup: {
          from: 'routes',
          localField: 'schedule.routeId',
          foreignField: '_id',
          as: 'route'
        }
      },
      {
        $unwind: '$route'
      },
      {
        // Group by route and count bookings
        $group: {
          _id: '$route._id',
          startLocation: { $first: '$route.startLocation' },
          endLocation: { $first: '$route.endLocation' },
          distance: { $first: '$route.distance' },
          estimatedDuration: { $first: '$route.estimatedDuration' },
          bookingCount: { $sum: 1 }
        }
      },
      {
        // Sort by booking count descending
        $sort: { bookingCount: -1 }
      },
      {
        // Limit to requested number
        $limit: limit
      }
    ]);

    return popularRoutes;
  },

  // Quick search that returns both routes and schedules
  async quickSearch(searchTerm: string) {
    // Search in routes
    const routes = await Route.find({
      $or: [
        { startLocation: { $regex: searchTerm, $options: 'i' } },
        { endLocation: { $regex: searchTerm, $options: 'i' } }
      ]
    }).limit(5).exec();

    // Find schedules for matching routes (limited to future schedules)
    const routeIds = routes.map(route => route._id);
    const schedules = await Schedule.find({
      routeId: { $in: routeIds },
      departureTime: { $gte: new Date() },
      status: 'scheduled'
    })
      .populate('routeId')
      .populate('busId')
      .limit(10)
      .sort({ departureTime: 1 })
      .exec();

    return {
      routes,
      schedules
    };
  }
};
