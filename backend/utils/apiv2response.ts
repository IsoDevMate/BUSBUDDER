import { Response } from 'express';

/**
 * Standard API response format
 * @param res Express response object
 * @param statusCode HTTP status code
 * @param message Response message
 * @param data Response data (optional)
 * @param error Error details (optional)
 */
export const apiResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null,
  error: any = null
) => {
  const response: {
    success: boolean;
    message: string;
    data?: any;
    error?: any;
  } = {
    success: statusCode >= 200 && statusCode < 300,
    message
  };

  if (data !== null) {
    response.data = data;
  }

  if (error !== null) {
    response.error = error instanceof Error ? error.message : error;
  }

  return res.status(statusCode).json(response);
};
