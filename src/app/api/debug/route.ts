import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    
    // Find all superadmin users
    const superadmins = await User.find({ role: 'SUPER_ADMIN' }).select('-password');
    
    return NextResponse.json({ 
      success: true,
      superadmins,
      count: superadmins.length
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch superadmins' 
    }, { status: 500 });
  }
}
