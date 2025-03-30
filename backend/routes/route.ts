import { Router } from 'express';
import { routeController } from '../controllers/routeController';

const router = Router();

// Create a new route
router.post('/', routeController.createRoute);

// Get all routes
router.get('/', routeController.getAllRoutes);

// Search routes
router.get('/search', routeController.searchRoutes);

// Get route by ID
router.get('/:id', routeController.getRouteById);

// Update route
router.put('/:id', routeController.updateRoute);

// Delete route
router.delete('/:id', routeController.deleteRoute);

export default router;
