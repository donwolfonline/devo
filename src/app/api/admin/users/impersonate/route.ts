import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and has super admin role
    if (!session || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized: Insufficient permissions' }, 
        { status: 403 }
      );
    }

    const { userId } = await request.json();

    // Find the user to impersonate
    const userToImpersonate = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        name: true
      }
    });

    if (!userToImpersonate) {
      return NextResponse.json(
        { error: 'User not found' }, 
        { status: 404 }
      );
    }

    // Create an impersonation token
    const impersonationToken = sign(
      {
        originalUser: {
          id: session.user.id,
          email: session.user.email,
          role: session.user.role
        },
        impersonatedUser: userToImpersonate
      },
      process.env.NEXTAUTH_SECRET || '',
      { expiresIn: '1h' }
    );

    // Log the impersonation attempt
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        lastImpersonationAttempt: new Date(),
        lastImpersonatedUserId: userId
      }
    });

    // Return a redirect URL for the impersonated user's dashboard
    return NextResponse.json({
      success: true,
      redirectUrl: `/dashboard?impersonation_token=${impersonationToken}`,
      user: userToImpersonate
    });
  } catch (error) {
    console.error('Impersonation error:', error);
    return NextResponse.json(
      { error: 'Internal server error during impersonation' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
