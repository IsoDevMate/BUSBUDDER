import { Router } from 'express';
import busRoutes from './busRoutes';
 import routeRoutes from './route';
 import scheduleRoutes from './scheduleRoutes';
import searchroutes from  './searchroutes'
import bookingRoutes from './bookingRoutes';
 import paymentRoutes from './paymentRoutes';
import reservationRoutes from './reservation'
// import authRoutes from './authRoutes'; // We'll keep this commented out for now

const router = Router();

// API version prefix
const API_PREFIX = '/api/v1';

// Routes that don't require authentication
router.use(`${API_PREFIX}/buses`, busRoutes);
router.use(`${API_PREFIX}/reservations`, reservationRoutes);
router.use(`${API_PREFIX}/routes`, routeRoutes);
router.use(`${API_PREFIX}/search`, searchroutes);
 router.use(`${API_PREFIX}/schedules`, scheduleRoutes);
router.use(`${API_PREFIX}/bookings`, bookingRoutes);
router.use(`${API_PREFIX}/payments`, paymentRoutes);

// Authentication routes - will be added later
// router.use(`${API_PREFIX}/auth`, authRoutes);

export default router;
