import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
  try {
    await connectDB();
    
    // Check if superadmin already exists
    const existingSuperAdmin = await User.findOne({ role: 'SUPER_ADMIN' });
    if (existingSuperAdmin) {
      return NextResponse.json({ 
        success: false, 
        message: 'Superadmin already exists' 
      });
    }

    // Create superadmin user with raw password
    const password = 'admin123';
    
    const superadmin = new User({
      username: 'superadmin',
      email: 'superadmin@example.com',
      password: password, // Let the User model handle hashing
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
      isActive: true // Explicitly set isActive to true
    });

    await superadmin.save();

    // Remove password from response
    const { password: _, ...superadminWithoutPassword } = superadmin.toObject();

    return NextResponse.json({ 
      success: true,
      message: 'Superadmin created successfully',
      user: superadminWithoutPassword,
      credentials: {
        username: 'superadmin',
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
