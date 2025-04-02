import { Router } from 'express';
import { routeController } from '../controllers/routeController';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Create a new route
router.post('/',
  AuthMiddleware.verifyToken,
  AuthMiddleware.hasRole(['admin']),
  routeController.createRoute
);

// Get all routes
router.get('/', routeController.getAllRoutes);

// Search routes
router.get('/search', routeController.searchRoutes);

// Get route by ID
router.get('/:id', routeController.getRouteById);

// Update route - requires admin role
router.put('/:id',
  AuthMiddleware.verifyToken,
  AuthMiddleware.hasRole(['admin']),
  routeController.updateRoute
);

// Delete route - requires admin role
router.delete('/:id',
  AuthMiddleware.verifyToken,
  AuthMiddleware.hasRole(['admin']),
  routeController.deleteRoute
);

export default router;
