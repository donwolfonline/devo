import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import SecuritySettings from '@/models/SecuritySettings';
import SessionManagement from '@/models/SessionManagement';
import User from '@/models/User';
import mongoose from 'mongoose';

async function handleDatabaseOperation<T>(operation: () => Promise<T>): Promise<T> {
  try {
    await connectDB();
    return await operation();
  } catch (error: any) {
    console.error('Database operation failed:', error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await connectDB();
    const data = await req.json();
    
    // Update security settings
    let securitySettings = await SecuritySettings.findOne();
    if (!securitySettings) {
      securitySettings = new SecuritySettings();
    }
    
    // Update password and authentication settings
    securitySettings.twoFactorAuth = data.twoFactorAuth ?? false;
    securitySettings.passwordComplexity = data.passwordComplexity ?? true;
    securitySettings.ipWhitelisting = data.ipWhitelisting ?? false;
    securitySettings.failedLoginLockout = data.failedLoginLockout ?? true;
    securitySettings.auditLogging = data.auditLogging ?? true;
    securitySettings.encryptedStorage = data.encryptedStorage ?? true;

    await securitySettings.save();

    // Update session management settings
    let sessionManagement = await SessionManagement.findOne({ 
      userId: new mongoose.Types.ObjectId(session.user.id)
    });

    if (!sessionManagement) {
      sessionManagement = new SessionManagement({
        userId: session.user.id,
        settings: {
          autoLogoutEnabled: data.sessionTimeout ?? false,
          multipleSessions: !data.concurrentSessions,
          autoLogoutTimeMinutes: 30
        }
      });
    } else {
      sessionManagement.settings = {
        ...sessionManagement.settings,
        autoLogoutEnabled: data.sessionTimeout ?? false,
        multipleSessions: !data.concurrentSessions,
        autoLogoutTimeMinutes: sessionManagement.settings?.autoLogoutTimeMinutes ?? 30
      };
    }

    await sessionManagement.save();

    return NextResponse.json({ 
      success: true,
      settings: {
        twoFactorAuth: securitySettings.twoFactorAuth,
        passwordComplexity: securitySettings.passwordComplexity,
        ipWhitelisting: securitySettings.ipWhitelisting,
        failedLoginLockout: securitySettings.failedLoginLockout,
        auditLogging: securitySettings.auditLogging,
        encryptedStorage: securitySettings.encryptedStorage,
        sessionTimeout: sessionManagement.settings.autoLogoutEnabled,
        concurrentSessions: !sessionManagement.settings.multipleSessions
      }
    });
  } catch (error: any) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await connectDB();
    const securitySettings = await SecuritySettings.findOne() || new SecuritySettings();
    const sessionManagement = await SessionManagement.findOne({ 
      userId: new mongoose.Types.ObjectId(session.user.id)
    }) || { settings: { autoLogoutEnabled: false, multipleSessions: true, autoLogoutTimeMinutes: 30 }};

    return NextResponse.json({
      settings: {
        twoFactorAuth: securitySettings.twoFactorAuth ?? false,
        passwordComplexity: securitySettings.passwordComplexity ?? true,
        ipWhitelisting: securitySettings.ipWhitelisting ?? false,
        failedLoginLockout: securitySettings.failedLoginLockout ?? true,
        auditLogging: securitySettings.auditLogging ?? true,
        encryptedStorage: securitySettings.encryptedStorage ?? true,
        sessionTimeout: sessionManagement.settings?.autoLogoutEnabled ?? false,
        concurrentSessions: !sessionManagement.settings?.multipleSessions
      }
    });
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}
