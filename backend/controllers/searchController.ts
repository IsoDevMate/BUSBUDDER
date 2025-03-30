import { Request, Response } from 'express';
import { searchService } from '../services/searchService';
import { successResponse, errorResponse } from '../utils/apiResponse';

export const searchController = {
  // Search for available buses
  async searchAvailableBuses(req: Request, res: Response): Promise<void> {
    try {
      const { startLocation, endLocation, date, minSeats } = req.query;

      const results = await searchService.searchAvailableBuses({
        startLocation: startLocation as string | undefined,
        endLocation: endLocation as string | undefined,
        date: date ? new Date(date as string) : undefined,
        minSeats: minSeats ? parseInt(minSeats as string) : undefined
      });

      successResponse(res, 'Search results retrieved successfully', results);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to search buses', 400, error);
    }
  },

  // Get popular routes
  async getPopularRoutes(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 5;

      const popularRoutes = await searchService.getPopularRoutes(limit);

      successResponse(res, 'Popular routes retrieved successfully', popularRoutes);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to retrieve popular routes', 500, error);
    }
  },

  // Quick search
  async quickSearch(req: Request, res: Response): Promise<void> {
    try {
      const { term } = req.query;

      if (!term) {
        errorResponse(res, 'Search term is required', 400);
        return;
      }
      
      const results = await searchService.quickSearch(term as string);

      successResponse(res, 'Quick search results retrieved successfully', results);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to perform quick search', 400, error);
    }
  }
};
