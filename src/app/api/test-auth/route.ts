import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    await connectDB();
    console.log('Connected to DB');

    // Find user
    const user = await User.findOne({ username }).select('+password');
    console.log('User found:', !!user);

    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: 'User not found' 
      }, { status: 404 });
    }

    // Test direct password comparison
    const directMatch = user.password === password;
    console.log('Direct password match:', directMatch);

    // Test bcrypt comparison
    const bcryptMatch = await bcrypt.compare(password, user.password);
    console.log('Bcrypt password match:', bcryptMatch);

    return NextResponse.json({ 
      success: true,
      user: {
        username: user.username,
        role: user.role,
        hashedPassword: user.password,
        providedPassword: password,
        directMatch,
        bcryptMatch
      }
    });
  } catch (error: any) {
    console.error('Test auth error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
