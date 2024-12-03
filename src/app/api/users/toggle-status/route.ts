import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { isValidObjectId } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    // Get token and validate session
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });

    if (!token?.sub || !token?.role) {
      return NextResponse.json({ 
        error: 'Unauthorized',
        details: 'Valid session required'
      }, { status: 401 });
    }

    if (token.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ 
        error: 'Forbidden',
        details: 'Super admin role required'
      }, { status: 403 });
    }

    // Parse and validate request body
    const body = await request.json();
    const userId = body?.userId?.toString();

    if (!userId || !isValidObjectId(userId)) {
      return NextResponse.json({
        error: 'Bad Request',
        details: 'Invalid user ID format'
      }, { status: 400 });
    }

    // Prevent self-modification
    if (userId === token.sub) {
      return NextResponse.json({
        error: 'Forbidden',
        details: 'Cannot modify own account'
      }, { status: 403 });
    }

    // Connect to database
    await connectDB();

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        error: 'Not Found',
        details: 'User not found'
      }, { status: 404 });
    }

    // Update user status directly using updateOne to avoid validation
    await User.updateOne(
      { _id: userId },
      { 
        $set: { 
          isActive: !user.isActive,
          updatedAt: new Date()
        }
      },
      { runValidators: false }
    );

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        isActive: !user.isActive
      }
    });

  } catch (error) {
    console.error('Error in toggle status:', error);
    return NextResponse.json({
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'An unexpected error occurred'
    }, { status: 500 });
  }
}
