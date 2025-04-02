// import { Router } from 'express';
// import { BusController } from '../controllers/busController';
// import { Request, Response } from 'express';

// const busController = new BusController();
// const router = Router();

// // Create a new bus
// router.post('/', async (req: Request, res: Response) => {
//   try {
//     await busController.createBus(req, res);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message || 'Unknown error occurred' });
//   }
// });

// router.get('/search', async (req: Request, res: Response) => {
//   await busController.getBusesByLocations(req, res);
// });

// // Get buses by route
// router.get('/route/:routeId', async (req: Request, res: Response) => {
//   await busController.getBusesByRoute(req, res);
// });

// // Get all buses with optional status filter
// router.get('/', async (req: Request, res: Response) => {
//   await busController.getAllBuses(req, res);
// });

// // Get buses by operator
// router.get('/operator/:operatorId', async (req: Request, res: Response) => {
//   await busController.getBusesByOperator(req, res);
// });

// // Get bus by ID
// router.get('/:id', async (req: Request, res: Response) => {
//   await busController.getBusById(req, res);
// });

// // Update bus
// router.put('/:id', async (req: Request, res: Response) => {
//   await busController.updateBus(req, res);
// });

// // Update bus status
// router.patch('/:id/status', async (req: Request, res: Response) => {
//   await busController.updateBusStatus(req, res);
// });

// // Delete bus
// router.delete('/:id', async (req: Request, res: Response) => {
//   await busController.deleteBus(req, res);
// });

// export default router;


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
})


// Get available buses for assignment
router.get('/available', async (req: Request, res: Response) => {
  await busController.getAvailableBuses(req, res);
});

// Get buses by location
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

// Get bus by number
router.get('/number/:busNumber', async (req: Request, res: Response) => {
  await busController.getBusByNumber(req, res);
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

// Update bus assignment status
router.patch('/:id/assignment', async (req: Request, res: Response) => {
  await busController.updateBusAssignmentStatus(req, res);
});

// Delete bus
router.delete('/:id', async (req: Request, res: Response) => {
  AuthMiddleware.verifyToken,
    AuthMiddleware.hasRole(['admin'])(req, res, async () => {
      await busController.deleteBus(req, res);
    });
})

export default router;
