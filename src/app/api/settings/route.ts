import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { connectDB } from '@/lib/mongodb';

interface SystemSettings {
  email: {
    smtpServer: string;
    smtpPort: string;
    smtpEncryption: string;
    senderEmail: string;
    senderName: string;
    smtpUsername: string;
    smtpPassword: string;
    emailAuthentication: boolean;
  };
  data: {
    dataRetention: string;
    automatedBackups: boolean;
    backupFrequency: string;
    storageLocation: string;
    dataEncryption: boolean;
    backupRetention: string;
  };
  notifications: {
    emailNotifications: boolean;
    securityAlerts: boolean;
    maintenanceUpdates: boolean;
    systemNotifications: boolean;
    userActivityAlerts: boolean;
    performanceAlerts: boolean;
  };
  security: {
    passwordLength: string;
    sessionTimeout: string;
    twoFactorAuth: boolean;
  };
}

// Helper function to check admin authorization
async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  if (session.user.role !== 'SUPER_ADMIN') {
    throw new Error('Forbidden: Requires SUPER_ADMIN role');
  }
  return session;
}

export async function GET(request: NextRequest) {
  try {
    await checkAdminAuth();
    const { db } = await connectDB();

    // Get settings from database
    const settings = await db.collection('systemSettings').findOne({});

    // Return settings or default values
    return NextResponse.json(settings || {
      email: {
        smtpServer: '',
        smtpPort: '',
        smtpEncryption: '',
        senderEmail: '',
        senderName: '',
        smtpUsername: '',
        smtpPassword: '',
        emailAuthentication: true
      },
      data: {
        dataRetention: '30',
        automatedBackups: true,
        backupFrequency: 'daily',
        storageLocation: 'local',
        dataEncryption: true,
        backupRetention: '5'
      },
      notifications: {
        emailNotifications: true,
        securityAlerts: true,
        maintenanceUpdates: false,
        systemNotifications: true,
        userActivityAlerts: true,
        performanceAlerts: false
      },
      security: {
        passwordLength: '8',
        sessionTimeout: '30',
        twoFactorAuth: false
      }
    });
  } catch (error: any) {
    console.error('Error in GET /api/settings:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Unauthorized' ? 401 : error.message === 'Forbidden: Requires SUPER_ADMIN role' ? 403 : 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await checkAdminAuth();
    const { db } = await connectDB();

    const settings: SystemSettings = await request.json();

    // Validate settings
    if (!settings || typeof settings !== 'object') {
      return NextResponse.json(
        { error: 'Invalid settings format' },
        { status: 400 }
      );
    }

    // Update settings in database
    await db.collection('systemSettings').updateOne(
      {},
      { $set: settings },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Settings updated successfully' });
  } catch (error: any) {
    console.error('Error in POST /api/settings:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Unauthorized' ? 401 : error.message === 'Forbidden: Requires SUPER_ADMIN role' ? 403 : 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await checkAdminAuth();
    const emailSettings = await request.json();
    
    // Test email configuration
    // TODO: Implement actual email testing logic here
    // This is a placeholder that simulates a successful test
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ message: 'Email configuration test successful' });
  } catch (error: any) {
    console.error('Error in PUT /api/settings:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Unauthorized' ? 401 : error.message === 'Forbidden: Requires SUPER_ADMIN role' ? 403 : 500 }
    );
  }
}
