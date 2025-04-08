// import { Request, Response } from 'express';
// import { bookingService } from '../services/bookingService';
// import { successResponse, errorResponse } from '../utils/apiResponse';

// export class BookingController {
//   // Create a new booking
//   async createBooking(req: Request, res: Response): Promise<void> {
//     try {
//       const { userName, userEmail, userPhone, scheduleId, seatNumber } = req.body;

//       // Basic validation
//       if (!userName || !userEmail || !userPhone || !scheduleId || !seatNumber) {
//         errorResponse(res, 'Missing required fields', 400);
//         return;
//       }

//       // Validate seat numbers are an array
//       if (!Array.isArray(seatNumber) || seatNumber.length === 0) {
//         errorResponse(res, 'Seat numbers must be a non-empty array', 400);
//         return;
//       }

//       const booking = await bookingService.createBookingFromReservation({
//         userName,
//         userEmail,
//         userPhone,
//         scheduleId,
//         seatNumber
//       });

//       successResponse(res, 'Booking created successfully', booking, 201);
//     } catch (error: any) {
//       errorResponse(res, error.message || 'Failed to create booking', 400, error);
//     }
//   }

//   // Get booking by ID
//   async getBookingById(req: Request, res: Response): Promise<void> {
//     try {
//       const { id } = req.params;
//       const booking = await bookingService.getBookingById(id);

//       if (!booking) {
//         errorResponse(res, 'Booking not found', 404);
//         return;
//       }

//       successResponse(res, 'Booking retrieved successfully', booking);
//     } catch (error: any) {
//       errorResponse(res, error.message || 'Failed to retrieve booking', 400, error);
//     }
//   }

//   // Get bookings by user details
//   async getBookingsByUserDetails(req: Request, res: Response): Promise<void> {
//     try {
//       const { email, phone } = req.query;

//       if (!email) {
//         errorResponse(res, 'Email is required', 400);
//         return;
//       }

//       const bookings = await bookingService.getBookingsByUserDetails(
//         email as string,
//         phone as string | undefined
//       );

//       successResponse(res, 'Bookings retrieved successfully', bookings);
//     } catch (error: any) {
//       errorResponse(res, error.message || 'Failed to retrieve bookings', 400, error);
//     }
//   }

//   // Cancel booking
//   async cancelBooking(req: Request, res: Response): Promise<void> {
//     try {
//       const { id } = req.params;
//       const booking = await bookingService.cancelBooking(id);

//       if (!booking) {
//         errorResponse(res, 'Booking not found', 404);
//         return;
//       }

//       successResponse(res, 'Booking cancelled successfully', booking);
//     } catch (error: any) {
//       errorResponse(res, error.message || 'Failed to cancel booking', 400, error);
//     }
//   }
// }

// export const bookingController = new BookingController();


import { Request, Response } from 'express';
import { bookingService } from '../services/bookingService';
import { successResponse, errorResponse } from '../utils/apiResponse';

export class BookingController {
  // Create a new booking from a reservation ID
  async createBooking(req: Request, res: Response): Promise<void> {
    try {
      const { reservationId } = req.body;

      // Basic validation
      if (!reservationId) {
        errorResponse(res, 'Reservation ID is required', 400);
        return;
      }

      const booking = await bookingService.createBookingFromReservation(reservationId);

      successResponse(res, 'Booking created successfully', booking, 201);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to create booking', 400, error);
    }
  }

  // Get booking by ID
  async getBookingById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const booking = await bookingService.getBookingById(id);

      if (!booking) {
        errorResponse(res, 'Booking not found', 404);
        return;
      }

      successResponse(res, 'Booking retrieved successfully', booking);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to retrieve booking', 400, error);
    }
  }

// In bookingController.ts
async getAllBookings(req: Request, res: Response): Promise<void> {
  try {
    const bookings = await bookingService.getAllBookings();
    if (!bookings) {
      errorResponse(res, 'No bookings found', 404);
      return;
    }
    successResponse(res, 'Bookings retrieved successfully', bookings);
  } catch (error: any) {
    errorResponse(res, error.message || 'Failed to retrieve bookings', 400, error);
  }
}

  // Get bookings by user details
  async getBookingsByUserDetails(req: Request, res: Response): Promise<void> {
    try {
      const { email, phone } = req.query;

      if (!email) {
        errorResponse(res, 'Email is required', 400);
        return;
      }

      const bookings = await bookingService.getBookingsByUserDetails(
        email as string,
        phone as string | undefined
      );

      successResponse(res, 'Bookings retrieved successfully', bookings);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to retrieve bookings', 400, error);
    }
  }

  // Cancel booking
  async cancelBooking(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const booking = await bookingService.cancelBooking(id);

      if (!booking) {
        errorResponse(res, 'Booking not found', 404);
        return;
      }

      successResponse(res, 'Booking cancelled successfully', booking);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to cancel booking', 400, error);
    }
  }
}

export const bookingController = new BookingController();
