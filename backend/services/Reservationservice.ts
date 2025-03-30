import SeatReservation from '../models/seatReservatonModel';
import Schedule from '../models/scheduleModel';
import Booking from '../models/bookingModel';
import mongoose from 'mongoose';
import { SeatReservation as ISeatReservation } from '../models/seatReservatonModel';

// Function to clean up expired reservations
export const cleanupExpiredReservations = async (): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find all expired reservations
    const expiredReservations = await SeatReservation.find({
      status: 'active',
      expiryDate: { $lt: new Date() }
    }).session(session);

    for (const reservation of expiredReservations) {
      // Mark reservation as expired
      reservation.status = 'expired';
      await reservation.save({ session });

      // Release seats in the schedule
      const schedule = await Schedule.findById(reservation.scheduleId).session(session);
      if (schedule && schedule.status !== 'completed') {
        schedule.availableSeats += reservation.seatNumber.length;
        await schedule.save({ session });
      }
    }

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    console.error('Error cleaning up expired reservations:', error);
  } finally {
    session.endSession();
  }
};

export const reservationService = {
  // Create a new seat reservation
  async reserveSeats(reservationData: {
    userName: string;
    userEmail: string;
    userPhone: string;
    scheduleId: string;
    seatNumber: number[];
  }): Promise<ISeatReservation> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Check if schedule exists and has available seats
      const schedule = await Schedule.findById(reservationData.scheduleId).session(session);

      if (!schedule) {
        throw new Error('Schedule not found');
      }

      // Check if there are enough available seats
      if (schedule.availableSeats < reservationData.seatNumber.length) {
        throw new Error('Not enough available seats');
      }

      // Check if the selected seats are already booked or reserved
      const existingBooking = await Booking.findOne({
        scheduleId: reservationData.scheduleId,
        seatNumber: { $in: reservationData.seatNumber },
        status: { $ne: 'cancelled' }
      }).session(session);

      if (existingBooking) {
        throw new Error('One or more selected seats are already booked');
      }

      const existingReservation = await SeatReservation.findOne({
        scheduleId: reservationData.scheduleId,
        seatNumber: { $in: reservationData.seatNumber },
        status: 'active'
      }).session(session);

      if (existingReservation) {
        throw new Error('One or more selected seats are already reserved');
      }

      // Set expiry time (15 minutes from now)
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 15);

      // Create reservation
      const newReservation = await SeatReservation.create([{
        userName: reservationData.userName,
        userEmail: reservationData.userEmail,
        userPhone: reservationData.userPhone,
        scheduleId: reservationData.scheduleId,
        seatNumber: reservationData.seatNumber,
        expiryDate: expiryDate
      }], { session });

      // Temporarily reduce available seats in schedule
      schedule.availableSeats -= reservationData.seatNumber.length;
      await schedule.save({ session });

      await session.commitTransaction();
      return newReservation[0];
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },

  // Get reservation by ID
  async getReservationById(id: string): Promise<ISeatReservation | null> {
    return await SeatReservation.findById(id);
  },

  // Complete reservation (convert to booking)
  async completeReservation(reservationId: string): Promise<ISeatReservation | null> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const reservation = await SeatReservation.findById(reservationId).session(session);

      if (!reservation) {
        throw new Error('Reservation not found');
      }

      if (reservation.status !== 'active') {
        throw new Error('Reservation is no longer active');
      }

      if (new Date() > reservation.expiryDate) {
        reservation.status = 'expired';
        await reservation.save({ session });
        throw new Error('Reservation has expired');
      }

      // Mark reservation as completed
      reservation.status = 'completed';
      await reservation.save({ session });

      await session.commitTransaction();
      return reservation;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },

  // Cancel reservation
  async cancelReservation(reservationId: string): Promise<ISeatReservation | null> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const reservation = await SeatReservation.findById(reservationId).session(session);

      if (!reservation) {
        throw new Error('Reservation not found');
      }

      if (reservation.status !== 'active') {
        throw new Error('Reservation is no longer active');
      }

      // Mark reservation as expired
      reservation.status = 'expired';
      await reservation.save({ session });

      // Release seats in the schedule
      const schedule = await Schedule.findById(reservation.scheduleId).session(session);
      if (schedule && schedule.status !== 'completed') {
        schedule.availableSeats += reservation.seatNumber.length;
        await schedule.save({ session });
      }

      await session.commitTransaction();
      return reservation;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
};

// Set up a cleanup job to run periodically (every 5 minutes)
setInterval(cleanupExpiredReservations, 5 * 60 * 1000);
