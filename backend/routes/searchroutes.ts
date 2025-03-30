import { Router } from 'express';
import { searchController } from '../controllers/searchController';

const router = Router();

// Search for available buses
router.get('/buses', searchController.searchAvailableBuses);

// Get popular routes
router.get('/popular-routes', searchController.getPopularRoutes);

// Quick search
router.get('/quick', searchController.quickSearch);

export default router;
