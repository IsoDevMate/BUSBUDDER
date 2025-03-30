import { Request, Response } from 'express';
import { busService } from '../services/busService';
import { apiResponse } from '../utils/apiv2response';

export class BusController {
  // Create a new bus
    async createBus(req: Request, res: Response) {
    try {
      const busData = req.body;
      const newBus = await busService.createBus(busData);
      return apiResponse(res, 201, 'Bus created successfully', newBus);
    } catch (error) {
      console.error('Error creating bus:', error);
      return apiResponse(res, 500, 'Failed to create bus', null, error);
    }
  }

  // Get all buses
   async getAllBuses(req: Request, res: Response) {
    try {
      const filter = req.query.status ? { status: req.query.status } : {};
      const buses = await busService.getAllBuses(filter);
      return apiResponse(res, 200, 'Buses retrieved successfully', buses);
    } catch (error) {
      console.error('Error retrieving buses:', error);
      return apiResponse(res, 500, 'Failed to retrieve buses', null, error);
    }
  }

  // Get bus by ID
   async getBusById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const bus = await busService.getBusById(id);

      if (!bus) {
        return apiResponse(res, 404, 'Bus not found', null);
      }

      return apiResponse(res, 200, 'Bus retrieved successfully', bus);
    } catch (error) {
      console.error('Error retrieving bus:', error);
      return apiResponse(res, 500, 'Failed to retrieve bus', null, error);
    }
  }

  // Get buses by operator
   async getBusesByOperator(req: Request, res: Response) {
    try {
      const { operatorId } = req.params;
      const buses = await busService.getBusesByOperator(operatorId);
      return apiResponse(res, 200, 'Buses retrieved successfully', buses);
    } catch (error) {
      console.error('Error retrieving operator buses:', error);
      return apiResponse(res, 500, 'Failed to retrieve operator buses', null, error);
    }
  }


  // Get buses by route
  async getBusesByRoute(req: Request, res: Response) {
    try {
      const { routeId } = req.params;
      const buses = await busService.getBusesByRoute(routeId);
      return apiResponse(res, 200, 'Buses retrieved successfully', buses);
    } catch (error) {
      console.error('Error retrieving route buses:', error);
      return apiResponse(res, 500, 'Failed to retrieve route buses', null, error);
    }
  }

  // Get buses by departure and destination
  async getBusesByLocations(req: Request, res: Response) {
    try {
      const { departure, destination } = req.query;

      if (!departure || !destination) {
        return apiResponse(res, 400, 'Both departure and destination are required', null);
      }

      const buses = await busService.getBusesByLocations(
        departure.toString(),
        destination.toString()
      );

      return apiResponse(res, 200, 'Buses retrieved successfully', buses);
    } catch (error) {
      console.error('Error retrieving buses by locations:', error);
      return apiResponse(res, 500, 'Failed to retrieve buses by locations', null, error);
    }
  }

  // Update bus
   async updateBus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedBus = await busService.updateBus(id, updateData);

      if (!updatedBus) {
        return apiResponse(res, 404, 'Bus not found', null);
      }

      return apiResponse(res, 200, 'Bus updated successfully', updatedBus);
    } catch (error) {
      console.error('Error updating bus:', error);
      return apiResponse(res, 500, 'Failed to update bus', null, error);
    }
  }

  // Update bus status
   async updateBusStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['active', 'maintenance', 'inactive'].includes(status)) {
        return apiResponse(res, 400, 'Invalid status value', null);
      }

      const updatedBus = await busService.updateBusStatus(id, status);

      if (!updatedBus) {
        return apiResponse(res, 404, 'Bus not found', null);
      }

      return apiResponse(res, 200, 'Bus status updated successfully', updatedBus);
    } catch (error) {
      console.error('Error updating bus status:', error);
      return apiResponse(res, 500, 'Failed to update bus status', null, error);
    }
  }

  // Delete bus
   async deleteBus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedBus = await busService.deleteBus(id);

      if (!deletedBus) {
        return apiResponse(res, 404, 'Bus not found', null);
      }

      return apiResponse(res, 200, 'Bus deleted successfully', deletedBus);
    } catch (error) {
      console.error('Error deleting bus:', error);
      return apiResponse(res, 500, 'Failed to delete bus', null, error);
    }
  }
}
