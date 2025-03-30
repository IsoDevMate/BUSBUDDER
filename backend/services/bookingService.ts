// // import Booking from '../models/bookingModel';
// // import Schedule from '../models/scheduleModel';
// // import { IBooking } from '../interfaces/booking.interface';
// // import { generateUniqueId } from '../utils/generateId';

// // export const createBooking = async (bookingData: IBooking): Promise<IBooking> => {
// //   // Generate a unique ticket ID
// //   const ticketId = generateUniqueId();

// //   // Create the booking with ticket ID
// //   const booking = await Booking.create({
// //     ...bookingData,
// //     ticketId
// //   });

// //   // Update available seats in schedule
// //   await Schedule.findByIdAndUpdate(
// //     bookingData.scheduleId,
// //     { $inc: { availableSeats: -bookingData.seatNumber.length } },
// //     { new: true }
// //   );

// //   return booking;
// // };

// // export const getBookingById = async (bookingId: string): Promise<IBooking | null> => {
// //   return await Booking.findById(bookingId)
// //     .populate('userId', 'name email phone')
// //     .populate({
// //       path: 'scheduleId',
// //       populate: [
// //         { path: 'routeId', select: 'startLocation endLocation distance estimatedDuration' },
// //         { path: 'busId', select: 'busNumber capacity' }
// //       ]
// //     });
// // };

// // export const getUserBookings = async (userId: string): Promise<IBooking[]> => {
// //   return await Booking.find({ userId })
// //     .populate({
// //       path: 'scheduleId',
// //       populate: [
// //         { path: 'routeId', select: 'startLocation endLocation' },
// //         { path: 'busId', select: 'busNumber' }
// //       ]
// //     })
// //     .sort({ bookingDate: -1 });
// // };

// // export const cancelBooking = async (bookingId: string): Promise<IBooking | null> => {
// //   const booking = await Booking.findById(bookingId);

// //   if (!booking) {
// //     return null;
// //   }

// //   // Update booking status
// //   booking.status = 'cancelled';
// //   await booking.save();

// //   // Return seats to available pool
// //   await Schedule.findByIdAndUpdate(
// //     booking.scheduleId,
// //     { $inc: { availableSeats: booking.seatNumber.length } },
// //     { new: true }
// //   );

// //   return booking;
// // };

// // export const getBookingByTicketId = async (ticketId: string): Promise<IBooking | null> => {
// //   return await Booking.findOne({ ticketId })
// //     .populate('userId', 'name email phone')
// //     .populate({
// //       path: 'scheduleId',
// //       populate: [
// //         { path: 'routeId', select: 'startLocation endLocation distance estimatedDuration' },
// //         { path: 'busId', select: 'busNumber capacity' }
// //       ]
// //     });
// // };



// import Booking from '../models/bookingModel';
// import Schedule from '../models/scheduleModel';
// import { Booking as BookingInterface } from '../interfaces/booking.interface';
// import { generateTicketId } from '../utils/generateTickets';
// import mongoose from 'mongoose';

// export const bookingService = {
//   // Create a new booking
//   async createBooking(bookingData: {
//     userName: string;
//     userEmail: string;
//     userPhone: string;
//     scheduleId: string;
//     seatNumber: number[];
//   }): Promise<BookingInterface> {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//       // Check if schedule exists and has available seats
//       const schedule = await Schedule.findById(bookingData.scheduleId).session(session);
//       if (!schedule) {
//         throw new Error('Schedule not found');
//       }

//       // Check if there are enough available seats
//       if (schedule.availableSeats < bookingData.seatNumber.length) {
//         throw new Error('Not enough available seats');
//       }

//       // Check if the selected seats are already booked
//       const existingBooking = await Booking.findOne({
//         scheduleId: bookingData.scheduleId,
//         seatNumber: { $in: bookingData.seatNumber },
//         status: { $ne: 'cancelled' }
//       }).session(session);

//       if (existingBooking) {
//         throw new Error('One or more selected seats are already booked');
//       }

//       // Generate ticket ID
//       const ticketId = generateTicketId();

//       // Create booking
//       const newBooking = await Booking.create([{
//         userName: bookingData.userName,
//         userEmail: bookingData.userEmail,
//         userPhone: bookingData.userPhone,
//         scheduleId: bookingData.scheduleId,
//         seatNumber: bookingData.seatNumber,
//         ticketId
//       }], { session });

//       // Update available seats in schedule
//       schedule.availableSeats -= bookingData.seatNumber.length;
//       await schedule.save({ session });

//       await session.commitTransaction();
//       return newBooking[0];
//     } catch (error) {
//       await session.abortTransaction();
//       throw error;
//     } finally {
//       session.endSession();
//     }
//   },

//   // Get booking by ID
//   async getBookingById(bookingId: string): Promise<BookingInterface | null> {
//     return await Booking.findById(bookingId)
//       .populate('scheduleId')
//       .exec();
//   },

//   // Get bookings by user details (email/phone)
//   async getBookingsByUserDetails(email: string, phone?: string): Promise<BookingInterface[]> {
//     const query: any = { userEmail: email };
//     if (phone) {
//       query.userPhone = phone;
//     }

//     return await Booking.find(query)
//       .populate('scheduleId')
//       .sort({ bookingDate: -1 })
//       .exec();
//   },

//   // Cancel booking
//   async cancelBooking(bookingId: string): Promise<BookingInterface | null> {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//       const booking = await Booking.findById(bookingId).session(session);
//       if (!booking) {
//         throw new Error('Booking not found');
//       }

//       if (booking.status === 'cancelled') {
//         throw new Error('Booking is already cancelled');
//       }

//       // Update booking status
//       booking.status = 'cancelled';
//       await booking.save({ session });

//       // Increase available seats in schedule
//       const schedule = await Schedule.findById(booking.scheduleId).session(session);
//       if (schedule && schedule.status !== 'completed') {
//         schedule.availableSeats += booking.seatNumber.length;
//         await schedule.save({ session });
//       }

//       await session.commitTransaction();
//       return booking;
//     } catch (error) {
//       await session.abortTransaction();
//       throw error;
//     } finally {
//       session.endSession();
//     }
//   }
// };


import Booking from '../models/bookingModel';
import Schedule from '../models/scheduleModel';
import { Booking as BookingInterface } from '../interfaces/booking.interface';
import { generateTicketId } from '../utils/generateTickets';
import mongoose from 'mongoose';
import { emailService } from './emailService';
import { PopulatedSchedule } from '../interfaces/schedule.interface';

export const bookingService = {
  // Create a new booking
  async createBooking(bookingData: {
    userName: string;
    userEmail: string;
    userPhone: string;
    scheduleId: string;
    seatNumber: number[];
  }): Promise<BookingInterface> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Check if schedule exists and has available seats
      const schedule = await Schedule.findById(bookingData.scheduleId)
        .populate({ path: 'routeId', select: 'startLocation endLocation' })
        .populate('busId')
        .session(session);

      if (!schedule) {
        throw new Error('Schedule not found');
      }

      const populatedSchedule = schedule as unknown as PopulatedSchedule;


      // Check if there are enough available seats
      if (schedule.availableSeats < bookingData.seatNumber.length) {
        throw new Error('Not enough available seats');
      }

      // Check if the selected seats are already booked
      const existingBooking = await Booking.findOne({
        scheduleId: bookingData.scheduleId,
        seatNumber: { $in: bookingData.seatNumber },
        status: { $ne: 'cancelled' }
      }).session(session);

      if (existingBooking) {
        throw new Error('One or more selected seats are already booked');
      }

      // Generate ticket ID
      const ticketId = generateTicketId();

      // Create booking
      const newBooking = await Booking.create([{
        userName: bookingData.userName,
        userEmail: bookingData.userEmail,
        userPhone: bookingData.userPhone,
        scheduleId: bookingData.scheduleId,
        seatNumber: bookingData.seatNumber,
        ticketId
      }], { session });

      // Update available seats in schedule
      schedule.availableSeats -= bookingData.seatNumber.length;
      await schedule.save({ session });

      await session.commitTransaction();



      // Send confirmation email after transaction is committed
      try {
     await emailService.sendBookingConfirmation(
         bookingData.userEmail,
         bookingData.userName,
         ticketId,
         {
           departureTime: schedule.departureTime,
           arrivalTime: schedule.arrivalTime,
           startLocation: populatedSchedule.routeId.startLocation,
           endLocation: populatedSchedule.routeId.endLocation,
           busNumber: populatedSchedule.busId.busNumber,
           seatNumbers: bookingData.seatNumber,
           fare: schedule.fare
         }
       );
      } catch (emailError) {
        // Log the error but don't throw it to the client
        console.error('Failed to send confirmation email:', emailError);
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
        // Log the error but don't throw it to the client
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
