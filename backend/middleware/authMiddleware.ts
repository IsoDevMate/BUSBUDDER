import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import User from '../models/userModel';
import { errorResponse } from '../utils/apiResponse';
import { UserRole } from '../interfaces/user.interface';

interface JwtPayload {
  id: string;
}

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return errorResponse(res, 'Not authorized, no token', 401);
    }

    const decoded = jwt.verify(token, config.jwt.accessTokenSecret as string) as JwtPayload;
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return errorResponse(res, 'Not authorized, user not found', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 'Not authorized, token failed', 401);
  }
};

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === UserRole.ADMIN) {
    next();
  } else {
    return errorResponse(res, 'Not authorized as an admin', 403);
  }
};


