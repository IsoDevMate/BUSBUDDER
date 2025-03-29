import Booking from '../models/bookingModel';
import Schedule from '../models/scheduleModel';
import { IBooking } from '../interfaces/booking.interface';
import { generateUniqueId } from '../utils/generateId';

export const createBooking = async (bookingData: IBooking): Promise<IBooking> => {
  // Generate a unique ticket ID
  const ticketId = generateUniqueId();

  // Create the booking with ticket ID
  const booking = await Booking.create({
    ...bookingData,
    ticketId
  });

  // Update available seats in schedule
  await Schedule.findByIdAndUpdate(
    bookingData.scheduleId,
    { $inc: { availableSeats: -bookingData.seatNumber.length } },
    { new: true }
  );

  return booking;
};

export const getBookingById = async (bookingId: string): Promise<IBooking | null> => {
  return await Booking.findById(bookingId)
    .populate('userId', 'name email phone')
    .populate({
      path: 'scheduleId',
      populate: [
        { path: 'routeId', select: 'startLocation endLocation distance estimatedDuration' },
        { path: 'busId', select: 'busNumber capacity' }
      ]
    });
};

export const getUserBookings = async (userId: string): Promise<IBooking[]> => {
  return await Booking.find({ userId })
    .populate({
      path: 'scheduleId',
      populate: [
        { path: 'routeId', select: 'startLocation endLocation' },
        { path: 'busId', select: 'busNumber' }
      ]
    })
    .sort({ bookingDate: -1 });
};

export const cancelBooking = async (bookingId: string): Promise<IBooking | null> => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return null;
  }

  // Update booking status
  booking.status = 'cancelled';
  await booking.save();

  // Return seats to available pool
  await Schedule.findByIdAndUpdate(
    booking.scheduleId,
    { $inc: { availableSeats: booking.seatNumber.length } },
    { new: true }
  );

  return booking;
};

export const getBookingByTicketId = async (ticketId: string): Promise<IBooking | null> => {
  return await Booking.findOne({ ticketId })
    .populate('userId', 'name email phone')
    .populate({
      path: 'scheduleId',
      populate: [
        { path: 'routeId', select: 'startLocation endLocation distance estimatedDuration' },
        { path: 'busId', select: 'busNumber capacity' }
      ]
    });
};
