import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { User } from '../models/userModel';
// import { UserRole } from '../models/userModel';
import { Token } from '../models/tokenModal';
import {
  RegisterUserDto,
  LoginUserDto,
  AuthTokens,
  TokenPayload,
  ResetPasswordDto,
  ForgotPasswordDto
} from '../interfaces/auth.interface';
import { AppError } from '../utils/error.utils';
import config from '../config/config';
const sgMail = require('@sendgrid/mail');

export class AuthService {

  async register(userData: RegisterUserDto): Promise<User> {
  try {
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }

    const newUser = new User(userData);

    // Hash the password before saving
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    // Remove password from response
    const userObject = newUser.toObject();

    // Send welcome email
    sgMail.setApiKey(config.sendgrid.apiKey);
    const msg = {
      to: newUser.email,
      from: config.sendgrid.fromEmail,
      subject: 'Welcome to Ammaam',
      text: `Hello ${newUser.firstName},\n\nWelcome to Ammaam! We're excited to have you on board.\n\nBest regards,\nThe Ammam Team`,
      html: `<p>Hello ${newUser.firstName},</p><p>Welcome to Ammaam! We're excited to have you on board.</p><p>Best regards,<br>The Ammam Team</p>`,
      };
      await sgMail.send(msg);


    return userObject as User;
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error('Registration error:', error);
    throw new AppError('Registration failed', 500);
  }
}

  async login(loginData: LoginUserDto): Promise<{ user: User, tokens: AuthTokens }> {
    try{
    const user = await User.findOne({ email: loginData.email });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);

    // Check if password is valid
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    const tokens = await this.generateTokens(user);

    // Remove password from response
    const userObject = user.toObject();

      return { user: userObject as User, tokens };
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.error('Login error:', error);
      throw new AppError('Login failed', 500);
    }
  }

  async generateTokens(user: User): Promise<AuthTokens> {
    const payload: TokenPayload = {
      userId: (user._id as string).toString(),
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      bio: user.bio,
      profileImage: user.profileImage,
    };

    const accessToken = jwt.sign(
      payload,
      config.jwt.accessTokenSecret as string,
      { expiresIn: config.jwt.accessTokenExpiration as number }
    );

    // // Save refresh token in database
    // await Token.create({
    //   userId: user._id,
    //   token: refreshToken,
    //   expiresAt: refreshExpiry
    // });

    return { accessToken, expiresIn: config.jwt.accessTokenExpiration };
  }

  async forgotPassword(data: ForgotPasswordDto): Promise<void> {
    const user = await User.findOne({ email: data.email });

    if (!user) {
      // Don't reveal if user exists or not
      return
    }

    // Generate numeric reset token
    const resetToken = this.generateNumericCode(6);
    console.log("resetToken",resetToken)


    // Save token with expiry (1 hour)
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    await Token.create({
      userId: user._id,
      token: resetToken,
      expiresAt: expiryDate
    });

    // In a real application, send email with reset link
    sgMail.setApiKey(config.sendgrid.apiKey);

    const resetUrl = `${config.frontendUrl}/auth/reset-password?token=${resetToken}`;

    const msg = {
      to: user.email,
      from: config.sendgrid.fromEmail,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Please use the following link to reset your password: ${resetUrl}`,
      html: `<p>You requested a password reset. Please use the following link to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
    };

    await sgMail.send(msg);
    console.log("msg",msg)
    // For now, just return success
  }

private generateNumericCode(length: number = 6): string {
    let code = '';
    for (let i = 0; i < length; i++) {
      code += Math.floor(Math.random() * 10).toString();
    }
    return code;
  }

  async resetPassword(data: ResetPasswordDto): Promise<void> {


    const tokenDoc = await Token.findOne({
      token: data.token,
      expiresAt: { $gt: new Date() }
    });

    if (!tokenDoc) {
      throw new AppError('Invalid or expired token', 400);
    }

    const user = await User.findById(tokenDoc.userId);
    console.log("user",user)
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Update password
    user.password = data.newPassword;
    const saveduser = await user.save();

    console.log("saveduser",saveduser)

    // Delete token
    await Token.deleteOne({ _id: tokenDoc._id });

    // In a real application, send confirmation email
    sgMail.setApiKey(config.sendgrid.apiKey);

    const msg = {
        to: user.email,
      from: config.sendgrid.fromEmail,
      subject: 'Password Reset Confirmation',
      text: 'Your password has been successfully reset. If you did not request this change, please contact our support team immediately.',
      html: `
      <p>Dear ${user.firstName},</p>
      <p>Your password has been successfully reset. If you did not request this change, please contact our support team immediately.</p>
      <p>Thank you,</p>
      <p>The Ammaam Team</p>
      `,
    };

    await sgMail.send(msg);
  }

  async updateProfile(userId: string, updateData: Partial<Omit<User, 'email'>>): Promise<User> {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Update user fields except email
    Object.assign(user, updateData);

    await user.save();

    // Remove password from response
    const userObject = user.toObject();

    return userObject as User;
  }

  async getUserProfile(userId: string): Promise<User> {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Remove password from response
    const userObject = user.toObject();

    console.log("userObject",userObject)

    return userObject as User;
  }


  async getAllUsers(): Promise<User[]>{
    const users = await User.find();

    if (!users) {
      throw new AppError('Users not found', 404);
    }

    // Remove password from response
    const userObject = users.map(user => user.toObject());

    return userObject as User[];
  }

  // async logout(refreshToken: string): Promise<void> {
  //   // Delete refresh token from database
  //   const tokenDoc = await Token.findOne({ token: refreshToken });

  //   if (tokenDoc) {
  //     await Token.deleteOne({
  //       _id: tokenDoc._id
  //     });
  //     return;
  //   }
  // }

}

export const authService = new AuthService();
