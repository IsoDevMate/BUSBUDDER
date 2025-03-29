import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/apiResponse';
import * as bookingService from '../services/bookingService';
import * as scheduleService from '../services/scheduleService';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { scheduleId, seatNumber } = req.body;
    const userId = req.user._id;

    // Check if schedule exists and has available seats
    const schedule = await scheduleService.getScheduleById(scheduleId);
    if (!schedule) {
      return errorResponse(res, 'Schedule not found', 404);
    }

    if (schedule.availableSeats < seatNumber.length) {
      return errorResponse(res, 'Not enough seats available', 400);
    }

    // Check if selected seats are valid
    const busCapacity = schedule.busId.capacity;
    for (const seat of seatNumber) {
      if (seat <= 0 || seat > busCapacity) {
        return errorResponse(res, `Invalid seat number: ${
