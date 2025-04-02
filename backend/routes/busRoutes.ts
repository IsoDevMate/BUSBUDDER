import { Router } from 'express';
import { BusController } from '../controllers/busController';
import { Request, Response } from 'express';
import { AuthMiddleware } from '../middleware/authMiddleware';

const busController = new BusController();
const router = Router();

// Create a new bus
router.post('/', (req: Request, res: Response) => {
  AuthMiddleware.verifyToken,
  AuthMiddleware.hasRole(['admin'])(req, res, async () => {
    await busController.createBus(req, res);
  });
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
  AuthMiddleware.verifyToken,
  AuthMiddleware.hasRole(['admin'])(req, res, async () => {
  await busController.getBusesByOperator(req, res);
  });
});

// Get bus by ID
router.get('/:id', async (req: Request, res: Response) => {
  await busController.getBusById(req, res);
});

// Update bus
router.put('/:id', async (req: Request, res: Response) => {
  AuthMiddleware.verifyToken,
    AuthMiddleware.hasRole(['admin'])(req, res, async () => {
      await busController.updateBus(req, res);
    });
})

// Update bus status
router.patch('/:id/status', async (req: Request, res: Response) => {
  AuthMiddleware.verifyToken,
    AuthMiddleware.hasRole(['admin'])(req, res, async () => {
      await busController.updateBusStatus(req, res);
    });
})

// Delete bus
router.delete('/:id', async (req: Request, res: Response) => {
  AuthMiddleware.verifyToken,
    AuthMiddleware.hasRole(['admin'])(req, res, async () => {
      await busController.deleteBus(req, res);
    });
})

export default router;
