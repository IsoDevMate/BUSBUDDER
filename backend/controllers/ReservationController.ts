import { Request, Response } from 'express';
import { reservationService } from '../services/Reservationservice';
import { successResponse, errorResponse } from '../utils/apiResponse';

export class ReservationController {
  // Create a new seat reservation
  async createReservation(req: Request, res: Response): Promise<void> {
    try {
      const { userName, userEmail, userPhone, scheduleId, seatNumber } = req.body;

      // Basic validation
      if (!userName || !userEmail || !userPhone || !scheduleId || !seatNumber) {
        errorResponse(res, 'Missing required fields', 400);
        return;
      }

      // Validate seat numbers are an array
      if (!Array.isArray(seatNumber) || seatNumber.length === 0) {
        errorResponse(res, 'Seat numbers must be a non-empty array', 400);
        return;
      }

      const reservation = await reservationService.reserveSeats({
        userName,
        userEmail,
        userPhone,
        scheduleId,
        seatNumber
      });

      successResponse(res, 'Seats reserved successfully', reservation, 201);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to reserve seats', 400, error);
    }
  }

  // Get reservation by ID
  async getReservationById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const reservation = await reservationService.getReservationById(id);

      if (!reservation) {
        errorResponse(res, 'Reservation not found', 404);
        return;
      }

      successResponse(res, 'Reservation retrieved successfully', reservation);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to retrieve reservation', 400, error);
    }
  }

  // Cancel reservation
  async cancelReservation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const reservation = await reservationService.cancelReservation(id);

      if (!reservation) {
        errorResponse(res, 'Reservation not found', 404);
        return;
      }

      successResponse(res, 'Reservation cancelled successfully', reservation);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to cancel reservation', 400, error);
    }
  }
}

export const reservationController = new ReservationController();
