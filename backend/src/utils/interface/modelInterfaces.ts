import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    dateOfBirth: Date;
    isEmailVerified: boolean;
    verificationOTP?: string;
    VerificationOTPExpiry?: Date;
    refreshToken?: string;
    generateAccessToken(keepLoggedIn?: boolean): string;
    generateRefreshToken(keepLoggedIn?: boolean): string;
}

export interface INote extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}