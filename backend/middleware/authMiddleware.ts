import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include a user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        userId: string;
        email: string;
        role: UserRole;
        firstName: string;
        lastName: string;
        profileImage?: string;
        bio?: string;
        phoneNumber?: string;
      };
    }
  }
}
import jwt from 'jsonwebtoken';
import { ResponseUtil } from '../utils/Response.util';
import config from '../config/config';
import { User, UserRole } from '../models/userModel';
import { AppError } from '../utils/error.utils';

export class AuthMiddleware {
static async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('Access token is required', 401));
      }

      const token = authHeader.split(' ')[1];

      try {
        if (!config.jwt.accessTokenSecret) {
          return next(new AppError('JWT secret is not defined', 500));
        }

        const decoded = jwt.verify(token, config.jwt.accessTokenSecret as string) as {
          userId: string;
          email: string;
          role: UserRole;
          firstName: string;
          lastName: string;
          phoneNumber?: string;
          bio?: string;
          profileImage?: string;
        };

        // Check if user still exists
        const user = await User.findById(decoded.userId);

        if (!user) {
          return next(new AppError('User no longer exists', 401));
        }

        // Attach user info to request
        (req.user as unknown) = {
          id: decoded.userId,
          userId: decoded.userId,
          email: decoded.email,
          role: decoded.role,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          profileImage: decoded.profileImage,
          bio: user.bio,
          phoneNumber: user.phoneNumber,
        };

        next();
      } catch (error) {
        return next(new AppError('Invalid or expired token', 401));
      }
    } catch (error) {
      next(error);
    }
  }


 // Check if user has required role
static hasRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return ResponseUtil.error(res, 401, 'Not authenticated');
      }

      // Type assertion to ensure req.user has the role property
      const user = req.user as { role: string };

      if (!roles.includes(user.role)) {
        return ResponseUtil.error(res, 403, 'Insufficient permissions');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
}

export default new AuthMiddleware();


