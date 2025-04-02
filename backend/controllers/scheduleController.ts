import { Request, Response } from 'express';
import { scheduleService } from '../services/scheduleService';
import { successResponse, errorResponse } from '../utils/apiResponse';
import Schedule from '../models/scheduleModel';

export class ScheduleController {
  // Create a new schedule
  async createSchedule(req: Request, res: Response): Promise<void> {
    try {
      const { routeName, busNumber, departureTime, arrivalTime, fare } = req.body;

      // Basic validation
      if (!routeName || !busNumber || !departureTime || !arrivalTime || fare === undefined) {
        errorResponse(res, 'Missing required fields', 400);
        return;
      }

      const schedule = await scheduleService.createSchedule({
        routeName,
        busNumber,
        departureTime: new Date(departureTime),
        arrivalTime: new Date(arrivalTime),
        fare: Number(fare)
      });

      successResponse(res, 'Schedule created successfully', schedule, 201);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to create schedule', 400, error);
    }
  }

  // Get all schedules
  async getAllSchedules(req: Request, res: Response): Promise<void> {
    try {
      const skip = parseInt(req.query.skip as string) || 0;
      const limit = parseInt(req.query.limit as string) || 10;

      const filters: any = {};
      if (req.query.status) filters.status = req.query.status;
      if (req.query.startDate) filters.startDate = new Date(req.query.startDate as string);
      if (req.query.endDate) filters.endDate = new Date(req.query.endDate as string);

      const schedules = await scheduleService.getAllSchedules(skip, limit, filters);
      successResponse(res, 'Schedules retrieved successfully', schedules);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to retrieve schedules', 500, error);
    }
  }

  // Get schedule by ID
  async getScheduleById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const schedule = await scheduleService.getScheduleById(id);

      if (!schedule) {
        errorResponse(res, 'Schedule not found', 404);
        return;
      }

      successResponse(res, 'Schedule retrieved successfully', schedule);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to retrieve schedule', 400, error);
    }
  }

  // Update schedule
  async updateSchedule(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const scheduleData = req.body;

      const updatedSchedule = await scheduleService.updateSchedule(id, scheduleData);

      if (!updatedSchedule) {
        errorResponse(res, 'Schedule not found', 404);
        return;
      }

      successResponse(res, 'Schedule updated successfully', updatedSchedule);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to update schedule', 400, error);
    }
  }

  // Cancel schedule
  async cancelSchedule(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const schedule = await scheduleService.cancelSchedule(id);

      if (!schedule) {
        errorResponse(res, 'Schedule not found', 404);
        return;
      }

      successResponse(res, 'Schedule cancelled successfully', schedule);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to cancel schedule', 400, error);
    }
  }

  // Search schedules
  async searchSchedules(req: Request, res: Response): Promise<void> {
    try {
      const { startLocation, endLocation, date } = req.query;

      const searchParams: any = {};
      if (startLocation) searchParams.startLocation = startLocation as string;
      if (endLocation) searchParams.endLocation = endLocation as string;
      if (date) searchParams.date = new Date(date as string);

      const schedules = await scheduleService.searchSchedules(searchParams);
      successResponse(res, 'Schedules retrieved successfully', schedules);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to search schedules', 400, error);
    }
  }

  // Get booked seats for a schedule
  async getBookedSeats(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const bookedSeats = await scheduleService.getBookedSeats(id);

      successResponse(res, 'Booked seats retrieved successfully', {
        scheduleId: id,
        bookedSeats
      });
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to retrieve booked seats', 400, error);
    }
  }

  // Get available seats for a schedule
  async getAvailableSeats(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const availableSeats = await scheduleService.getAvailableSeats(id);

      successResponse(res, 'Available seats retrieved successfully', {
        scheduleId: id,
        availableSeats
      });
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to retrieve available seats', 400, error);
    }
  }

  // Get schedule by route ID
  async getSchedulesByRouteId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const schedules = await Schedule.find({ routeId: id });

      if (!schedules || schedules.length === 0) {
        errorResponse(res, 'No schedules found for this route', 404);
        return;
      }

      successResponse(res, 'Schedules retrieved successfully', schedules);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to retrieve schedules', 400, error);
    }
  }
}

export const scheduleController = new ScheduleController();
