import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    await connectDB();
    
    // Delete existing superadmin
    await User.deleteMany({ role: 'SUPER_ADMIN' });

    // Create superadmin user with simple password
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const superadmin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'SUPER_ADMIN',
      isActive: true,
      failedLoginAttempts: 0
    });

    return NextResponse.json({ 
      success: true,
      message: 'Simple superadmin created',
      credentials: {
        username: 'admin',
        password: password
      }
    });
  } catch (error: any) {
    console.error('Setup error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to create superadmin'
    }, { status: 500 });
  }
}
