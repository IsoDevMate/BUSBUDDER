import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,

  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenExpiration: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION || '30', 10) * 24 * 60 * 60,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refreshTokenExpiration: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION || '7', 10) * 24 * 60 * 60,
    qrCodeSecret: process.env.JWT_QR_CODE_SECRET,
  },

  mpesa: {
    consumerKey: process.env.MPESA_CONSUMER_KEY,
    consumerSecret: process.env.MPESA_CONSUMER_SECRET,
    shortcode: process.env.MPESA_SHORTCODE,
    lipaNaMpesaShortcode: process.env.LIPA_NA_MPESA_SHORTCODE,
    mpesa_passkey: process.env.MPESA_PASSKEY,
  },

frontendUrl: process.env.FRONTEND_URL,
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
    },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY || 'SG......',
    fromEmail: process.env.SENDGRID_SENDER_EMAIL || "o.........",
  },
};

export default config;
