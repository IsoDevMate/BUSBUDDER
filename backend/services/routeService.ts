import Route from '../models/routeModel';
import { Route as RouteInterface } from '../interfaces/route.interface';

export const routeService = {
  // Create a new route
  async createRoute(routeData: {
    startLocation: string;
    endLocation: string;
    distance: number;
    estimatedDuration: number;
  }): Promise<RouteInterface> {
    // Check if route already exists
    const existingRoute = await Route.findOne({
      startLocation: routeData.startLocation,
      endLocation: routeData.endLocation
    });

    if (existingRoute) {
      throw new Error('Route already exists');
    }

    // Generate route name
    const startCode = this.generateLocationCode(routeData.startLocation);
    const endCode = this.generateLocationCode(routeData.endLocation);
    const routeName = `${startCode} - ${endCode} (${routeData.distance} km)`;

    // Create new route with name
    const newRoute = await Route.create({
      ...routeData,
      name: routeName
    });

    return newRoute;
  },

  // Generate location code (first 3-4 letters uppercase)
  generateLocationCode(location: string): string {
    // Remove any whitespace and take the first 4 letters
    return location.replace(/\s+/g, '').substring(0, 4).toUpperCase();
  },

  // Get all routes
  async getAllRoutes(
    skip: number = 0,
    limit: number = 10,
    sortBy: string = 'startLocation'
  ): Promise<RouteInterface[]> {
    return await Route.find()
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .exec();
  },

  // Get route by ID
  async getRouteById(routeId: string): Promise<RouteInterface | null> {
    return await Route.findById(routeId).exec();
  },

  // Get route by name
  async getRouteByName(routeName: string): Promise<RouteInterface | null> {
    return await Route.findOne({ name: routeName }).exec();
  },

  // Update route
  async updateRoute(
    routeId: string,
    routeData: Partial<RouteInterface>
  ): Promise<RouteInterface | null> {
    // If startLocation or endLocation is being updated, regenerate the name
    if (routeData.startLocation || routeData.endLocation) {
      const currentRoute = await Route.findById(routeId).exec();
      if (currentRoute) {
        const startLocation = routeData.startLocation || currentRoute.startLocation;
        const endLocation = routeData.endLocation || currentRoute.endLocation;

        const startCode = this.generateLocationCode(startLocation);
        const endCode = this.generateLocationCode(endLocation);
        routeData.name = `${startCode} - ${endCode}`;
      }
    }

    return await Route.findByIdAndUpdate(routeId, routeData, { new: true }).exec();
  },

  // Delete route
  async deleteRoute(routeId: string): Promise<boolean> {
    const result = await Route.findByIdAndDelete(routeId).exec();
    return !!result;
  },

  // Search routes
  async searchRoutes(searchParams: {
    startLocation?: string;
    endLocation?: string;
  }): Promise<RouteInterface[]> {
    const query: any = {};

    if (searchParams.startLocation) {
      query.startLocation = { $regex: searchParams.startLocation, $options: 'i' };
    }

    if (searchParams.endLocation) {
      query.endLocation = { $regex: searchParams.endLocation, $options: 'i' };
    }

    return await Route.find(query).exec();
  }
};
