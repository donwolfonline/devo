import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectDB();

    // Find superadmin with all fields including password
    const superadmin = await User.findOne({ role: 'SUPER_ADMIN' }).select('+password');
    if (!superadmin) {
      return NextResponse.json({
        success: true,
        userExists: false,
        message: 'Superadmin does not exist'
      });
    }

    // Test raw password
    const rawPassword = 'admin123';
    const hashedPassword = superadmin.password;
    const isValid = await bcrypt.compare(rawPassword, hashedPassword);

    // Return full user data for debugging
    return NextResponse.json({
      success: true,
      userExists: true,
      user: {
        id: superadmin._id.toString(),
        username: superadmin.username,
        email: superadmin.email,
        role: superadmin.role,
        isActive: superadmin.isActive,
        hashedPassword: hashedPassword
      },
      testData: {
        rawPassword: rawPassword,
        passwordValid: isValid,
        passwordStartsWithBcrypt: hashedPassword.startsWith('$2')
      }
    });
  } catch (error: any) {
    console.error('Test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to test superadmin'
    }, { status: 500 });
  }
}
