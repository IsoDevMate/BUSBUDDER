import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User, UserRole } from './models/userModel';
import config from './config/config';


/**
 * Script to initialize the admin user
 * Run this once during system setup or deployment
 */
async function initAdmin() {
  try {
    await mongoose.connect(config.mongoUri as string);
    // Check if the connection was successful
      if (mongoose.connection.readyState !== 1) {
        console.error('Failed to connect to the database');
        process.exit(1);
      }
    // Connection successful
    console.log('Database connection established successfully');

    // Check if admin already exists
    const adminExists = await User.findOne({ role: UserRole.ADMIN });

    if (adminExists) {
      console.log('Admin user already exists');
      await mongoose.disconnect();
      return;
    }

    // Admin credentials - preferably from environment variables
    const adminEmail = config.adminCredentials.adminEmail || process.env.ADMIN_EMAIL || 'levis@students.kcau.ac.ke'
      const adminPassword = config.adminCredentials.adminPassword || process.env.ADMIN_PASSWORD || 'okanga2845'
      if (!adminEmail || !adminPassword) {
          console.error('ERROR: Admin email and password must be provided via environment variables');
          process.exit(1);
        }

    if (process.env.NODE_ENV === 'production' &&
        (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD)) {
      console.error('ERROR: Admin credentials must be provided via environment variables in production');
      process.exit(1);
    }

    // Hash password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create admin user
    const admin = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: adminEmail,
      password: hashedPassword,
      role: UserRole.ADMIN
    });

    await admin.save();

    console.log(`Admin user created successfully with email: ${adminEmail}`);
    console.log('Make sure to change the default password immediately after first login');

    await mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error initializing admin user:', error);
    process.exit(1);
  }
}

// Run the initialization
initAdmin();
