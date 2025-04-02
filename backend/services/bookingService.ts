import Booking from '../models/bookingModel';
import Schedule from '../models/scheduleModel';
import SeatReservation from '../models/seatReservatonModel';
import { Booking as BookingInterface } from '../interfaces/booking.interface';
import { generateTicketId } from '../utils/generateTickets';
import mongoose from 'mongoose';
import { emailService } from './emailservice';
import { PopulatedSchedule } from '../interfaces/schedule.interface';

export const bookingService = {
  // Create a booking from a completed reservation
  async createBookingFromReservation(reservationId: string): Promise<BookingInterface> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Get the reservation
      const reservation = await SeatReservation.findById(reservationId).session(session);

      if (!reservation) {
        throw new Error('Reservation not found');
      }

      if (reservation.status !== 'completed') {
        throw new Error('Cannot create booking: Reservation is not completed');
      }

      // Generate ticket ID
      const ticketId = generateTicketId();

      // Create booking from reservation data
      const newBooking = await Booking.create([{
        userName: reservation.userName,
        userEmail: reservation.userEmail,
        userPhone: reservation.userPhone,
        scheduleId: reservation.scheduleId,
        seatNumber: reservation.seatNumber,
        ticketId,
        paymentStatus: 'completed',
        status: 'confirmed'
      }], { session });

      // Get schedule details for email
      const schedule = await Schedule.findById(reservation.scheduleId)
        .populate({ path: 'routeId', select: 'startLocation endLocation' })
        .populate('busId')
        .session(session);

      await session.commitTransaction();

      // Send confirmation email after transaction is committed
      if (schedule) {
        const populatedSchedule = schedule as unknown as PopulatedSchedule;

        try {
          await emailService.sendBookingConfirmation(
            reservation.userEmail,
            reservation.userName,
            ticketId,
            {

              departureTime: schedule.departureTime,
              arrivalTime: schedule.arrivalTime,
              startLocation: populatedSchedule.routeId.startLocation,
              endLocation: populatedSchedule.routeId.endLocation,
              busNumber: populatedSchedule.busId.busNumber,
              // routeName: populatedSchedule.routeName,
              seatNumbers: reservation.seatNumber,
              fare: schedule.fare
            }
          );
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
        }
      }

      return newBooking[0];
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },

  // Get booking by ID
  async getBookingById(bookingId: string): Promise<BookingInterface | null> {
    return await Booking.findById(bookingId)
      .populate({
        path: 'scheduleId',
        populate: [
          { path: 'routeId' },
          { path: 'busId' }
        ]
      })
      .exec();
  },

  // Get bookings by user details (email/phone)
  async getBookingsByUserDetails(email: string, phone?: string): Promise<BookingInterface[]> {
    const query: any = { userEmail: email };
    if (phone) {
      query.userPhone = phone;
    }

    return await Booking.find(query)
      .populate({
        path: 'scheduleId',
        populate: [
          { path: 'routeId' },
          { path: 'busId' }
        ]
      })
      .sort({ bookingDate: -1 })
      .exec();
  },

  // Cancel booking
  async cancelBooking(bookingId: string): Promise<BookingInterface | null> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const booking = await Booking.findById(bookingId)
        .populate({
          path: 'scheduleId',
          populate: [
            { path: 'routeId' },
            { path: 'busId' }
          ]
        })
        .session(session);

      if (!booking) {
        throw new Error('Booking not found');
      }

      if (booking.status === 'cancelled') {
        throw new Error('Booking is already cancelled');
      }

      // Update booking status
      booking.status = 'cancelled';
      await booking.save({ session });

      // Increase available seats in schedule
      const schedule = await Schedule.findById(booking.scheduleId).session(session);
      if (schedule && schedule.status !== 'completed') {
        schedule.availableSeats += booking.seatNumber.length;
        await schedule.save({ session });
      }

      await session.commitTransaction();

      // Send cancellation email after transaction is committed
      try {
        await emailService.sendCancellationEmail(
          booking.userEmail,
          booking.userName,
          booking.ticketId!
        );
      } catch (emailError) {
        console.error('Failed to send cancellation email:', emailError);
      }

      return booking;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
};
