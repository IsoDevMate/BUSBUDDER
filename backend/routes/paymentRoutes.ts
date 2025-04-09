import { Router, Request, Response } from 'express';
import { PaymentController } from '../controllers/paymentController';

const router = Router();
const paymentController = new PaymentController();



router.get('/all-payments', async (req: Request, res: Response) => {
    try {
        await paymentController.getAllPayments(req, res);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Unknown error occurred' });
    }
}
)

// Initiate payment for a reservation
router.post('/reservation', async (req: Request, res: Response) => {
    try {
        await paymentController.initiatePaymentForReservation(req, res);
    }
    catch (error: any) {
        res.status(500).json({ error: error.message || 'Unknown error occurred' });
    }
});

//mpesa callback endpoint
router.post('/callback', async (req: Request, res: Response) => {
    try {
        await paymentController.mpesaCallback(req, res);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Unknown error occurred' });
    }
}
);

// Get all payments (admin only)
// router.get('/', async (req: Request, res: Response) => {
//     try {
//         const payments = await paymentController.getAllPayments(req, res);
//         return payments;
//     } catch (error) {
//         console.error('Error retrieving payments:', error);
//         return res.status(500).json({ error: 'Failed to retrieve payments' });
//     }
// })

router.get('/verify/:checkoutRequestID', async (req: Request, res: Response) => {
  try {
    await paymentController.verifyTransactionStatus(req, res);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Unknown error occurred' });
  }
});

// Get payment by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        await paymentController.getPaymentById(req, res);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Unknown error occurred' });
    }
}
);


router.post('/stk-push', async (req: Request, res: Response) => {
    try {
        await paymentController.initiateSTKPush(req, res);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Unknown error occurred' });
    }
}
);

// Get payments by booking ID
router.get('/booking/:bookingId', async (req: Request, res: Response) => {
    try {
        await paymentController.getPaymentsByBookingId(req, res);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Unknown error occurred' });
    }
}
);

// Update payment status (would typically require admin authentication)
router.patch('/:id/status', async (req: Request, res: Response) => {
    try {
        await paymentController.updatePaymentStatus(req, res);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Unknown error occurred' });
    }
}
);



// //Payment verification callback endpoint
// router.post('/callback', async (req: Request, res: Response) => {
//     try {
//         await paymentController.verifyPaymentCallback(req, res);
//     } catch (error: any) {
//         res.status(500).json({ error: error.message || 'Unknown error occurred' });
//     }
// }
// );


export default router;
