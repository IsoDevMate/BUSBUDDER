import { Router } from 'express';
import { BusController } from '../controllers/busController';
import { Request, Response } from 'express';

const busController = new BusController();
const router = Router();

// Create a new bus
router.post('/', async (req: Request, res: Response) => {
  try {
    await busController.createBus(req, res);
  } catch (error: any) { // Add type assertion for error
    res.status(500).json({ error: error.message || 'Unknown error occurred' });
  }
});

router.get('/search', async (req: Request, res: Response) => {
  await busController.getBusesByLocations(req, res);
});

// Get buses by route
router.get('/route/:routeId', async (req: Request, res: Response) => {
  await busController.getBusesByRoute(req, res);
});

// Get all buses with optional status filter
router.get('/', async (req: Request, res: Response) => {
  await busController.getAllBuses(req, res);
});

// Get buses by operator
router.get('/operator/:operatorId', async (req: Request, res: Response) => {
  await busController.getBusesByOperator(req, res);
});

// Get bus by ID
router.get('/:id', async (req: Request, res: Response) => {
  await busController.getBusById(req, res);
});

// Update bus
router.put('/:id', async (req: Request, res: Response) => {
  await busController.updateBus(req, res);
});

// Update bus status
router.patch('/:id/status', async (req: Request, res: Response) => {
  await busController.updateBusStatus(req, res);
});

// Delete bus
router.delete('/:id', async (req: Request, res: Response) => {
  await busController.deleteBus(req, res);
});

export default router;
