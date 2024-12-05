import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
  try {
    await connectDB();
    
    // Find and activate superadmin
    const superadmin = await User.findOneAndUpdate(
      { role: 'SUPER_ADMIN' },
      { isActive: true },
      { new: true }
    );

    if (!superadmin) {
      return NextResponse.json({ 
        success: false, 
        message: 'Superadmin not found' 
      });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Superadmin activated successfully',
      user: {
        username: superadmin.username,
        email: superadmin.email,
        role: superadmin.role,
        isActive: superadmin.isActive
      }
    });
  } catch (error: any) {
    console.error('Activation error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to activate superadmin'
    }, { status: 500 });
  }
}
