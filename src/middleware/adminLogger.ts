import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connect } from '@/lib/mongodb';
import mongoose from 'mongoose';

// Define the AdminLog schema
const adminLogSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  action: {
    type: String,
    required: true,
  },
  targetUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  details: {
    type: Object,
  },
  ip: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create the model if it doesn't exist
const AdminLog = mongoose.models.AdminLog || mongoose.model('AdminLog', adminLogSchema);

export async function logAdminAction(
  adminId: string,
  action: string,
  targetUserId?: string,
  details?: object,
  request?: NextRequest
) {
  try {
    await connect();

    const log = new AdminLog({
      adminId,
      action,
      targetUserId,
      details,
      ip: request?.ip,
      userAgent: request?.headers.get('user-agent'),
    });

    await log.save();
  } catch (error) {
    console.error('Error logging admin action:', error);
  }
}

// Middleware to log admin actions
export async function adminLogger(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (session?.user.role === 'SUPER_ADMIN' && request.nextUrl.pathname.startsWith('/api/admin')) {
    const adminId = session.user.id;
    const action = `${request.method} ${request.nextUrl.pathname}`;
    
    // Extract targetUserId from URL or body if present
    let targetUserId;
    if (request.nextUrl.pathname.includes('/users/')) {
      targetUserId = request.nextUrl.pathname.split('/users/')[1];
    }

    await logAdminAction(adminId, action, targetUserId, undefined, request);
  }

  return NextResponse.next();
}
