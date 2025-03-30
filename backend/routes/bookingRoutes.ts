// import { Router } from 'express';
// import { bookingController } from '../controllers/bookingController';

// const router = Router();

// // Create a new booking
// router.post('/', bookingController.createBooking);

// // Get booking by ID
// router.get('/:id', bookingController.getBookingById);

// // Get bookings by user details
// router.get('/', bookingController.getBookingsByUserDetails);

// // Cancel booking
// router.patch('/:id/cancel', bookingController.cancelBooking);

// export default router;


import { Router } from 'express';
import { bookingController } from '../controllers/bookingController';

const router = Router();

// This endpoint would typically be called internally by the payment service
// or might be needed for admin purposes, but not directly by users
router.post('/', bookingController.createBooking);

// Get booking by ID
router.get('/:id', bookingController.getBookingById);

// Get bookings by user details
router.get('/', bookingController.getBookingsByUserDetails);

// Cancel booking
router.patch('/:id/cancel', bookingController.cancelBooking);

export default router;
