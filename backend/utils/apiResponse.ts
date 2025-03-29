import { Response } from 'express';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export const successResponse = <T>(
  res: Response,
  message: string,
  data: T,
  statusCode = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode = 400,
  error?: any
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error?.toString() || undefined
  });
};
