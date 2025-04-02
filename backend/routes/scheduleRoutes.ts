import { Router } from 'express';
import { scheduleController } from '../controllers/scheduleController';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Create a new schedule - requires admin role
router.post('/create',
  AuthMiddleware.verifyToken,
  AuthMiddleware.hasRole(['admin']),
  scheduleController.createSchedule
);

// Get all schedules - public endpoint
router.get('/', scheduleController.getAllSchedules);

// Search schedules - public endpoint
router.get('/search', scheduleController.searchSchedules);

// Get booked seats for a schedule - public endpoint
router.get('/:id/seats', scheduleController.getBookedSeats);

// Get schedules by route ID - public endpoint
router.get("/:id/routes", scheduleController.getSchedulesByRouteId);

// Get available seats - public endpoint
router.get('/:id/available-seats', scheduleController.getAvailableSeats);

// Get schedule by ID - public endpoint
router.get('/:id', scheduleController.getScheduleById);

// Update schedule - requires admin role
router.put('/:id',
  AuthMiddleware.verifyToken,
  AuthMiddleware.hasRole(['admin']),
  scheduleController.updateSchedule
);

// Cancel schedule - requires admin role
router.patch('/:id/cancel',
  AuthMiddleware.verifyToken,
  AuthMiddleware.hasRole(['admin']),
  scheduleController.cancelSchedule
);

export default router;
