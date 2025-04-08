import { Router } from 'express';
import{ AuthController } from '../controllers/authController';
import { AuthMiddleware } from '../middleware/authMiddleware';


const router = Router();

// Email & Password Authentication
router.post('/register', (req, res, next) => {
  (AuthController.register as any)(req, res, next);
}
);

router.post('/login', (req, res, next) => {
  (AuthController.login as any)(req, res, next);
});



// router.post('/logout', async (req, res, next) => {
//   try {
//     await AuthController.logout(req, res, next);
//   } catch (error) {
//     next(error);
//   }
// });

router.post('/forgot-password', (req, res, next) => {
  (AuthController.requestPasswordReset as any)(req, res, next);
}
);

router.post('/reset-password', (req, res, next) => {
  (AuthController.resetPassword as any)(req, res, next);
}
);

router.put('/update-profile',
  AuthMiddleware.verifyToken ,
  (req, res, next) => {
    (AuthController.updateProfile as any)(req, res, next);
  }
)

router.get('/profile',
  AuthMiddleware.verifyToken,
  (req, res, next) => {
    (AuthController.getUserProfile as any)(req, res, next);
  }
)

router.get('/all-users',
  AuthMiddleware.verifyToken,
  AuthMiddleware.ensureAdmin,
  (req, res, next) => {
    (AuthController.getAllusers as any)(req, res, next);
  }
)

  router.post('/create-admin',
  AuthMiddleware.verifyToken,
  AuthMiddleware.ensureAdmin,
  (req, res, next) => {
    (AuthController.createAdmin as any)(req, res, next);
  }
);

// Admin can update user roles
router.put('/update-user-role/:userId',
  AuthMiddleware.verifyToken,
  AuthMiddleware.ensureAdmin,
  (req, res, next) => {
    (AuthController.updateUserRole as any)(req, res, next);
  }

)

export default router;
