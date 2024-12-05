import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const adminSecret = req.headers.get('x-admin-secret');
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'SUPER_ADMIN' });
    if (existingAdmin) {
      return NextResponse.json({ 
        message: 'Super admin already exists',
        email: existingAdmin.email 
      });
    }

    // Create super admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      email: 'admin@devoapp.com',
      username: 'admin',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      name: 'Super Admin',
      isActive: true
    });

    await adminUser.save();
    
    return NextResponse.json({ 
      message: 'Super admin created successfully',
      email: adminUser.email,
      username: adminUser.username
    });
  } catch (error: any) {
    console.error('Error creating admin:', error);
    return NextResponse.json({ 
      error: 'Failed to create admin user',
      details: error.message 
    }, { status: 500 });
  }
}
