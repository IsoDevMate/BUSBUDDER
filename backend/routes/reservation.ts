import { Router } from 'express';
import { reservationController } from '../controllers/ReservationController';

const router = Router();

// Create a new reservation
router.post('/', reservationController.createReservation);

// Get reservation by ID
router.get('/:id', reservationController.getReservationById);

// Cancel reservation
router.patch('/:id/cancel', reservationController.cancelReservation);

export default router;
