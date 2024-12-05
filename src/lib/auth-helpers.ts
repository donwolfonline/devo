import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    role: string;
    username: string;
  };
}

export async function authenticateAPI(
  request: NextRequest,
  requiredRole?: string
): Promise<{ authenticated: boolean; request: AuthenticatedRequest; error?: string }> {
  try {
    const token = await getToken({ req: request });

    if (!token) {
      return {
        authenticated: false,
        request: request as AuthenticatedRequest,
        error: 'Unauthorized'
      };
    }

    if (requiredRole && token.role !== requiredRole) {
      return {
        authenticated: false,
        request: request as AuthenticatedRequest,
        error: 'Insufficient permissions'
      };
    }

    const authenticatedRequest = request as AuthenticatedRequest;
    authenticatedRequest.user = {
      id: token.id as string,
      role: token.role as string,
      username: token.username as string
    };

    return {
      authenticated: true,
      request: authenticatedRequest
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      authenticated: false,
      request: request as AuthenticatedRequest,
      error: 'Authentication failed'
    };
  }
}

export function unauthorized(message: string = 'Unauthorized') {
  return new NextResponse(
    JSON.stringify({ error: message }),
    {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
