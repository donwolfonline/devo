import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { NextResponse } from 'next/server';

export async function requireSuperAdmin() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401 }
      );
    }

    if (session.user.role !== 'SUPER_ADMIN') {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized: Super Admin access required' }),
        { status: 403 }
      );
    }
    
    return session.user;
  } catch (error) {
    console.error('Super Admin Authentication Error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
