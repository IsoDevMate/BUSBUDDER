import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { authService } from '../services/authService';
import { ResponseUtil } from '../utils/Response.util';
import { User, UserRole } from '../models/userModel';
import { AppError } from '../utils/error.utils';
import {
  loginSchema,
  registerSchema,
  passwordResetSchema,
  passwordResetConfirmSchema
} from '../utils/auth.validation.utils';
export class AuthController {


  // static async logout(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const userId = (req.user as User | undefined)?.id;
  //     console.log('User ID from request:', userId);

  //     if (!userId) {
  //       return ResponseUtil.error(res, 401, 'Unauthorized: User not found');
  //     }

  //     await authService.logout(userId);
  //     return ResponseUtil.success(res, 200, null, 'Logout successful');
  //   } catch (error) {
  //     if (error instanceof AppError) {
  //       return ResponseUtil.error(res, error.statusCode, error.message);
  //     }
  //     // Log the unexpected error for server-side tracking
  //     console.error('Unexpected logout error:', error);
  //     return ResponseUtil.error(res, 500, 'An unexpected error occurred during logout');
  //   }
  // }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = passwordResetConfirmSchema.parse(req.body);
      await authService.resetPassword({ token: validatedData.token, newPassword: validatedData.password });

      return ResponseUtil.success(res, 200, null, 'Password reset successfully');
    } catch (error) {
      if (error instanceof ZodError) {
        return ResponseUtil.error(res, 400, error.errors[0].message);
      }
      next(error);
    }
  }


static  async requestPasswordReset(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = passwordResetSchema.parse(req.body);
      await authService.forgotPassword({ email: validatedData.email });

      // Always return success even if email doesn't exist (for security)
      return ResponseUtil.success(res, 200, null, 'If the email exists, a password reset link will be sent');
    } catch (error) {
      if (error instanceof ZodError) {
        return ResponseUtil.error(res, 400, error.errors[0].message);
      }
      next(error);
    }
  }


   static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = registerSchema.parse(req.body);
      const user = await authService.register(validatedData);

      return ResponseUtil.success(res, 201, user, 'User registered successfully');
    } catch (error) {
      if (error instanceof ZodError) {
        return ResponseUtil.error(res, 400, error.errors[0].message);
      }
      if (error instanceof AppError) {
        return ResponseUtil.error(res, error.statusCode, error.message);
      }
      // Log the unexpected error for server-side tracking
      console.error('Unexpected registration error:', error);
      return ResponseUtil.error(res, 500, 'An unexpected error occurred during registration');
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const { user, tokens } = await authService.login(validatedData);

      return ResponseUtil.success(res, 200, { user, tokens }, 'Login successful');
    } catch (error) {
      if (error instanceof ZodError) {
        return ResponseUtil.error(res, 400, error.errors[0].message);
      }
      if (error instanceof AppError) {
        return ResponseUtil.error(res, error.statusCode, error.message);
      }
      // Log the unexpected error for server-side tracking
      console.error('Unexpected login error:', error);
      return ResponseUtil.error(res, 500, 'An unexpected error occurred during login');
    }
  }

static async updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
      console.log('User ID from request:', userId);

      if (!userId) {
        return ResponseUtil.error(res, 401, 'Unauthorized: User not found');
      }

      const updateData = req.body;

      // Validate update data if needed
      const updatedUser = await authService.updateProfile(userId, updateData);

      return ResponseUtil.success(res, 200, updatedUser, 'Profile updated successfully');
    } catch (error) {
      if (error instanceof AppError) {
        return ResponseUtil.error(res, error.statusCode, error.message);
      }
      // Log the unexpected error for server-side tracking
      console.error('Unexpected profile update error:', error);
      return ResponseUtil.error(res, 500, 'An unexpected error occurred while updating profile');
    }
  }

  static async getUserProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
      console.log('User ID from request:', userId);

      if (!userId) {
        return ResponseUtil.error(res, 401, 'Unauthorized: User not found');
      }

      const userProfile = await authService.getUserProfile(userId);

      return ResponseUtil.success(res, 200, userProfile, 'User profile retrieved successfully');
    } catch (error) {
      if (error instanceof AppError) {
        return ResponseUtil.error(res, error.statusCode, error.message);
      }
      // Log the unexpected error for server-side tracking
      console.error('Unexpected get profile error:', error);
      return ResponseUtil.error(res, 500, 'An unexpected error occurred while retrieving profile');
    }
  }

  static async getAllusers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await authService.getAllUsers();
      return ResponseUtil.success(res, 200, users, 'Users retrieved successfully');
    } catch (error) {
      if (error instanceof AppError) {
        return ResponseUtil.error(res, error.statusCode, error.message);
      }
      // Log the unexpected error for server-side tracking
      console.error('Unexpected get all users error:', error);
      return ResponseUtil.error(res, 500, 'An unexpected error occurred while retrieving users');
    }
  }


static async createAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = registerSchema.parse(req.body);

    // Override the role to explicitly be admin
    const adminData = {
      ...validatedData,
      role: UserRole.ADMIN
    };

    const newAdmin = await authService.createAdmin(adminData);

    return ResponseUtil.success(res, 201, newAdmin, 'Admin user created successfully');
  } catch (error) {
    if (error instanceof ZodError) {
      return ResponseUtil.error(res, 400, error.errors[0].message);
    }
    if (error instanceof AppError) {
      return ResponseUtil.error(res, error.statusCode, error.message);
    }
    console.error('Unexpected admin creation error:', error);
    return ResponseUtil.error(res, 500, 'An unexpected error occurred');
  }
}

static async updateUserRole(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!Object.values(UserRole).includes(role)) {
      return ResponseUtil.error(res, 400, 'Invalid role specified');
    }

    const updatedUser = await authService.updateUserRole(userId, role);

    return ResponseUtil.success(res, 200, updatedUser, 'User role updated successfully');
  } catch (error) {
    if (error instanceof AppError) {
      return ResponseUtil.error(res, error.statusCode, error.message);
    }
    console.error('Unexpected role update error:', error);
    return ResponseUtil.error(res, 500, 'An unexpected error occurred');
  }
  }

}

export default new AuthController();
