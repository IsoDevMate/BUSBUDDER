
import { Router } from 'express';
import { scheduleController } from '../controllers/scheduleController';

const router = Router();

// Create a new schedule
router.post('/create', scheduleController.createSchedule);

// Get all schedules
router.get('/', scheduleController.getAllSchedules);

// Search schedules
router.get('/search', scheduleController.searchSchedules);

// Get booked seats for a schedule
router.get('/:id/seats', scheduleController.getBookedSeats);

router.get("/:id/routes", scheduleController.getSchedulesByRouteId);

router.get('/:id/available-seats', scheduleController.getAvailableSeats);

// Get schedule by ID
router.get('/:id', scheduleController.getScheduleById);

// Update schedule
router.put('/:id', scheduleController.updateSchedule);

// Cancel schedule
router.patch('/:id/cancel', scheduleController.cancelSchedule);

export default router;
