import Bus from '../models/busModel';
import { Bus as IBus } from '../interfaces/bus.interface';
import mongoose from 'mongoose';

class BusService {
  // Create a new bus
  async createBus(busData: IBus): Promise<IBus> {
    try {
      const newBus = new Bus(busData);
      return await newBus.save();
    } catch (error) {
      throw error;
    }
  }

  // Get all buses with optional filtering
  async getAllBuses(filter = {}): Promise<IBus[]> {
    try {
      return await Bus.find(filter).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  }

  // Get bus by ID
  async getBusById(id: string): Promise<IBus | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid bus ID');
      }
      return await Bus.findById(id);
    } catch (error) {
      throw error;
    }
  }

  // Get buses by operator ID
  async getBusesByOperator(operatorId: string): Promise<IBus[]> {
    try {
      return await Bus.find({ operatorId });
    } catch (error) {
      throw error;
    }
  }

  // Update bus details
  async updateBus(id: string, updateData: Partial<IBus>): Promise<IBus | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid bus ID');
      }
      return await Bus.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // Update bus status
  async updateBusStatus(id: string, status: 'active' | 'maintenance' | 'inactive'): Promise<IBus | null> {
    try {
      return await this.updateBus(id, { status });
    } catch (error) {
      throw error;
    }
  }

  // Delete bus
  async deleteBus(id: string): Promise<IBus | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid bus ID');
      }
      return await Bus.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

   // Get buses by route ID
  async getBusesByRoute(routeId: string): Promise<IBus[]> {
    try {
      if (!mongoose.Types.ObjectId.isValid(routeId)) {
        throw new Error('Invalid route ID');
      }
      return await Bus.find({ routes: routeId });
    } catch (error) {
      throw error;
    }
  }

  // Get buses by departure and destination
  async getBusesByLocations(departure: string, destination: string): Promise<IBus[]> {
    try {
      // Assuming the bus document has servingRoutes array with route information
      // This implementation might need adjustment based on your data model
      return await Bus.find({
        "servingRoutes.departure": departure,
        "servingRoutes.destination": destination
      });
    } catch (error) {
      throw error;
    }
  }

}

export const busService = new BusService();
