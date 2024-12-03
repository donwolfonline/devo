import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { UserSchema } from './schemas/UserSchema';

// Only initialize on server side
const isServer = typeof window === 'undefined';

if (!isServer) {
  throw new Error('Cannot access Mongoose models on the client side');
}

// Define interfaces
interface IUser {
  username: string;
  email: string;
  password: string;
  name?: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  isActive: boolean;
  failedLoginAttempts: number;
  lockUntil?: Date;
  lastLogin?: Date;
  passwordChangedAt?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  incrementLoginAttempts(): Promise<{ isLocked: boolean; remainingTime: number }>;
  resetLoginAttempts(): Promise<void>;
}

interface IUserModel extends mongoose.Model<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
  findByUsername(username: string): Promise<IUser | null>;
}

// Indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ role: 1 });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// Method to increment login attempts
UserSchema.methods.incrementLoginAttempts = async function() {
  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCK_TIME = 15 * 60 * 1000; // 15 minutes

  if (this.lockUntil && this.lockUntil > new Date()) {
    return {
      isLocked: true,
      remainingTime: Math.ceil((this.lockUntil.getTime() - Date.now()) / 1000 / 60),
    };
  }

  this.failedLoginAttempts += 1;

  if (this.failedLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
    this.lockUntil = new Date(Date.now() + LOCK_TIME);
  }

  await this.save();

  return {
    isLocked: this.failedLoginAttempts >= MAX_LOGIN_ATTEMPTS,
    remainingTime: this.lockUntil ? Math.ceil((this.lockUntil.getTime() - Date.now()) / 1000 / 60) : 0,
  };
};

// Method to reset login attempts
UserSchema.methods.resetLoginAttempts = async function() {
  this.failedLoginAttempts = 0;
  this.lockUntil = undefined;
  await this.save();
};

// Add static methods
UserSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

UserSchema.statics.findByUsername = function(username: string) {
  return this.findOne({ username: username.toLowerCase() });
};

// Export the model
const User = (mongoose.models.User || mongoose.model<IUser, IUserModel>('User', UserSchema)) as IUserModel;

export default User;
