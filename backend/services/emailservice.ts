import sgMail from '@sendgrid/mail';
import config from '../config/config';

// Initialize SendGrid with API key
sgMail.setApiKey(config.sendgrid.apiKey);

export const emailService = {
  /**
   * Send a booking confirmation email
   * @param to Recipient email address
   * @param userName User's name
   * @param ticketId Booking ticket ID
   * @param bookingDetails Additional booking details
   */
  async sendBookingConfirmation(
    to: string,
    userName: string,
    ticketId: string,
    bookingDetails: {
      departureTime: Date;
      arrivalTime: Date;
      startLocation: string;
      endLocation: string;
      busNumber: string;
      seatNumbers: number[];
      fare: number;
    }
  ): Promise<void> {
    const formattedDepartureTime = new Date(bookingDetails.departureTime).toLocaleString();
    const formattedArrivalTime = new Date(bookingDetails.arrivalTime).toLocaleString();

    const msg = {
      to,
      from: {
        email: config.sendgrid.fromEmail,
        name: 'Bus Booking System'
      },
      subject: `Booking Confirmation - Ticket #${ticketId}`,
      text: `
        Hello ${userName},

        Your booking has been confirmed!

        Booking Details:
        Ticket ID: ${ticketId}
        Route: ${bookingDetails.startLocation} → ${bookingDetails.endLocation}
        Bus Number: ${bookingDetails.busNumber}
        Seat Number(s): ${bookingDetails.seatNumbers.join(', ')}
        Departure: ${formattedDepartureTime}
        Arrival: ${formattedArrivalTime}
        Fare: ${bookingDetails.fare}

        Please arrive at least 30 minutes before departure time.

        Thank you for choosing our service!
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">Booking Confirmation</h2>
          <p>Hello <strong>${userName}</strong>,</p>
          <p>Your booking has been confirmed!</p>

          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="margin-top: 0; color: #4a6f8a;">Booking Details</h3>
            <p><strong>Ticket ID:</strong> ${ticketId}</p>
            <p><strong>Route:</strong> ${bookingDetails.startLocation} → ${bookingDetails.endLocation}</p>
            <p><strong>Bus Number:</strong> ${bookingDetails.busNumber}</p>
            <p><strong>Seat Number(s):</strong> ${bookingDetails.seatNumbers.join(', ')}</p>
            <p><strong>Departure:</strong> ${formattedDepartureTime}</p>
            <p><strong>Arrival:</strong> ${formattedArrivalTime}</p>
            <p><strong>Fare:</strong> ${bookingDetails.fare}</p>
          </div>

          <p style="color: #666;">Please arrive at least 30 minutes before departure time.</p>
          <p style="margin-top: 30px; font-style: italic;">Thank you for choosing our service!</p>
        </div>
      `
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send confirmation email');
    }
  },

  /**
   * Send a booking cancellation email
   * @param to Recipient email address
   * @param userName User's name
   * @param ticketId Booking ticket ID
   */
  async sendCancellationEmail(
    to: string,
    userName: string,
    ticketId: string
  ): Promise<void> {
    const msg = {
      to,
      from: {
        email: config.sendgrid.fromEmail,
        name: 'Bus Booking System'
      },
      subject: `Booking Cancelled - Ticket #${ticketId}`,
      text: `
        Hello ${userName},

        Your booking with Ticket ID: ${ticketId} has been cancelled.

        If you did not request this cancellation, please contact our customer support.

        Thank you for choosing our service!
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">Booking Cancellation</h2>
          <p>Hello <strong>${userName}</strong>,</p>
          <p>Your booking with Ticket ID: <strong>${ticketId}</strong> has been cancelled.</p>
          <p style="color: #666;">If you did not request this cancellation, please contact our customer support.</p>
          <p style="margin-top: 30px; font-style: italic;">Thank you for choosing our service!</p>
        </div>
      `
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error('Error sending cancellation email:', error);
      throw new Error('Failed to send cancellation email');
    }
  },

  /**
   * Send payment confirmation email
   * @param to Recipient email address
   * @param userName User's name
   * @param ticketId Booking ticket ID
   * @param amount Payment amount
   * @param transactionId Payment transaction ID
   */
  async sendPaymentConfirmation(
    to: string,
    userName: string,
    ticketId: string,
    amount: number,
    transactionId: string
  ): Promise<void> {
    const msg = {
      to,
      from: {
        email: config.sendgrid.fromEmail,
        name: 'Bus Booking System'
      },
      subject: `Payment Confirmation - Ticket #${ticketId}`,
      text: `
        Hello ${userName},

        Your payment of ${amount} for Ticket ID: ${ticketId} has been confirmed.

        Transaction ID: ${transactionId}

        Thank you for your payment!
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">Payment Confirmation</h2>
          <p>Hello <strong>${userName}</strong>,</p>
          <p>Your payment has been confirmed!</p>

          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>Ticket ID:</strong> ${ticketId}</p>
            <p><strong>Amount:</strong> ${amount}</p>
            <p><strong>Transaction ID:</strong> ${transactionId}</p>
          </div>

          <p style="margin-top: 30px; font-style: italic;">Thank you for your payment!</p>
        </div>
      `
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error('Error sending payment confirmation email:', error);
      throw new Error('Failed to send payment confirmation email');
    }
  }
};
