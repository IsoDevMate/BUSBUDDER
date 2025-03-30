import { Router } from 'express';
import { bookingController } from '../controllers/bookingController';

const router = Router();

// Create a new booking
router.post('/', bookingController.createBooking);

// Get booking by ID
router.get('/:id', bookingController.getBookingById);

// Get bookings by user details
router.get('/', bookingController.getBookingsByUserDetails);

// Cancel booking
router.patch('/:id/cancel', bookingController.cancelBooking);

export default router;
