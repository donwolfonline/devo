import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
  try {
    await connectDB();
    
    // Delete existing superadmin
    await User.deleteOne({ role: 'SUPER_ADMIN' });

    return NextResponse.json({ 
      success: true,
      message: 'Superadmin deleted successfully'
    });
  } catch (error: any) {
    console.error('Reset error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to delete superadmin'
    }, { status: 500 });
  }
}
