import { Request, Response } from 'express';
import { routeService } from '../services/routeService';
import { successResponse, errorResponse } from '../utils/apiResponse';

export const routeController = {
  // Create a new route
  async createRoute(req: Request, res: Response): Promise<void> {
    try {
      const { startLocation, endLocation, distance, estimatedDuration } = req.body;

      // Basic validation
      if (!startLocation || !endLocation || !distance || !estimatedDuration) {
        errorResponse(res, 'Missing required fields', 400);
        return;
      }

      const route = await routeService.createRoute({
        startLocation,
        endLocation,
        distance,
        estimatedDuration
      });

      successResponse(res, 'Route created successfully', route, 201);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to create route', 400, error);
    }
  },

  // Get all routes
  async getAllRoutes(req: Request, res: Response): Promise<void> {
    try {
      const skip = parseInt(req.query.skip as string) || 0;
      const limit = parseInt(req.query.limit as string) || 10;
      const sortBy = (req.query.sortBy as string) || 'startLocation';

      const routes = await routeService.getAllRoutes(skip, limit, sortBy);
      successResponse(res, 'Routes retrieved successfully', routes);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to retrieve routes', 500, error);
    }
  },

  // Get route by ID
  async getRouteById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const route = await routeService.getRouteById(id);

      if (!route) {
        errorResponse(res, 'Route not found', 404);
        return;
      }

      successResponse(res, 'Route retrieved successfully', route);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to retrieve route', 400, error);
    }
  },

  // Update route
  async updateRoute(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const routeData = req.body;

      const updatedRoute = await routeService.updateRoute(id, routeData);

      if (!updatedRoute) {
        errorResponse(res, 'Route not found', 404);
        return;
      }

      successResponse(res, 'Route updated successfully', updatedRoute);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to update route', 400, error);
    }
  },

  // Delete route
  async deleteRoute(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const isDeleted = await routeService.deleteRoute(id);

      if (!isDeleted) {
        errorResponse(res, 'Route not found', 404);
        return;
      }

      successResponse(res, 'Route deleted successfully', { deleted: true });
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to delete route', 400, error);
    }
  },

  // Search routes
  async searchRoutes(req: Request, res: Response): Promise<void> {
    try {
      const { startLocation, endLocation } = req.query;

      const routes = await routeService.searchRoutes({
        startLocation: startLocation as string | undefined,
        endLocation: endLocation as string | undefined
      });

      successResponse(res, 'Routes retrieved successfully', routes);
    } catch (error: any) {
      errorResponse(res, error.message || 'Failed to search routes', 400, error);
    }
  }
};
