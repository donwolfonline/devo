import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Create a lean schema without validation for auth checks
const UserAuthSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String
}, { 
  collection: 'users',
  validateBeforeSave: false 
});

// Create a separate model for auth that doesn't enforce validation
const UserAuth = (mongoose.models.UserAuth as mongoose.Model<any>) || 
                mongoose.model('UserAuth', UserAuthSchema, undefined, { 
                  skipInit: true 
                });

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    console.log('Super admin validation attempt:', { 
      username,
      passwordLength: password?.length 
    });

    await connectDB();

    // Find user without triggering validation
    const user = await UserAuth.findOne({
      $or: [
        { email: username?.toLowerCase() },
        { username: username?.toLowerCase() }
      ]
    }).select('+password').lean();

    console.log('User lookup result:', user ? {
      found: true,
      username: user.username,
      role: user.role
    } : 'User not found');

    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password using bcrypt directly
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    console.log('Password validation:', {
      username: user.username,
      isValid: isPasswordValid
    });

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify super admin role
    if (user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Access denied. Super admin privileges required.' },
        { status: 403 }
      );
    }

    // Return success with user data
    return NextResponse.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      message: 'Login successful'
    });

  } catch (error: any) {
    console.error('Super admin validation error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
