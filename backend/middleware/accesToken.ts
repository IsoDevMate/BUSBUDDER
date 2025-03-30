// Updated accesToken.ts
import axios from 'axios';
import config from '../config/config';

interface TokenResponse {
  access_token: string;
  expires_in: string;
}

class MpesaMiddleware {
  private token: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor() {
    this.token = null;
    this.tokenExpiry = null;
  }

  /**
   * Generate and cache M-Pesa API token
   */
  async getToken(): Promise<string> {
    try {
      // Check if we have a valid cached token
      if (this.token && this.tokenExpiry && this.tokenExpiry > new Date()) {
        console.log('Using cached M-Pesa token');
        return this.token;
      }

      console.log('Generating new M-Pesa token...');

      // Get credentials directly from environment variables instead of config
      const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY || '';
      const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET || '';

      if (!MPESA_CONSUMER_KEY || !MPESA_CONSUMER_SECRET) {
        throw new Error('M-Pesa consumer key or secret is not defined in environment variables');
      }

      // Create the auth string exactly as in your working JS code
      const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
      console.log("Auth string generated (first 10 chars):", auth.substring(0, 10) + "...");

      const response = await axios.get<TokenResponse>(
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data || !response.data.access_token) {
        throw new Error('Failed to retrieve access token from M-Pesa API');
      }

      this.token = response.data.access_token;

      // Calculate token expiry (typically 1 hour)
      const expiresIn = parseInt(response.data.expires_in, 10) || 3600; // Default to 1 hour if not specified
      this.tokenExpiry = new Date(Date.now() + (expiresIn * 1000));

      console.log('M-Pesa token generated successfully, expires:', this.tokenExpiry);

      return this.token;
    } catch (error: any) {
      console.error('Error generating M-Pesa token:', error.message);

      // Add detailed error logging
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', JSON.stringify(error.response.headers));
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error config:', error.config);
      }

      throw new Error(`Failed to generate M-Pesa token: ${error.message}`);
    }
  }

  /**
   * Format phone number for M-Pesa API
   * Removes leading zero and adds country code if needed
   */
  formatPhoneNumber(phoneNumber: string): string {
    // Remove any non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, '');

    // Handle Kenyan numbers
    if (digitsOnly.startsWith('0')) {
      return '254' + digitsOnly.substring(1);
    }

    // If it starts with country code already
    if (digitsOnly.startsWith('254')) {
      return digitsOnly;
    }

    // Otherwise assume it's a local number and add country code
    return '254' + digitsOnly;
  }
}

export const mpesaMiddleware = new MpesaMiddleware();
