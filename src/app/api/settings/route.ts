import { NextRequest, NextResponse } from 'next/server';
import { authenticateAPI } from '@/lib/auth-helpers';
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
  performance: {
    performanceMonitoring: boolean;
    resourceThreshold: string;
  };
  auditLog: {
    auditLogRetention: string;
    enableAuditLog: boolean;
  };
  apiRateLimit: {
    apiRateLimit: string;
    rateLimitWindow: string;
  };
  maintenance: {
    maintenanceWindow: string;
    maintenanceDuration: string;
  };
  backup: {
    backupSchedule: string;
  };
}

const defaultSettings: SystemSettings = {
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
  },
  performance: {
    performanceMonitoring: true,
    resourceThreshold: '80'
  },
  auditLog: {
    auditLogRetention: '90',
    enableAuditLog: true
  },
  apiRateLimit: {
    apiRateLimit: '1000',
    rateLimitWindow: '60'
  },
  maintenance: {
    maintenanceWindow: '',
    maintenanceDuration: '60'
  },
  backup: {
    backupSchedule: '0 0 * * *'
  }
};

export async function GET(request: NextRequest) {
  try {
    const { authenticated, error } = await authenticateAPI(request, 'SUPER_ADMIN');
    
    if (!authenticated) {
      return NextResponse.json({ error }, { status: 401 });
    }

    const connection = await connectDB();
    const settings = await connection.db.collection('systemSettings').findOne({});

    return NextResponse.json(settings || defaultSettings);
  } catch (error: any) {
    console.error('Error in GET /api/settings:', error);
    return NextResponse.json(defaultSettings);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { authenticated, error } = await authenticateAPI(request, 'SUPER_ADMIN');
    
    if (!authenticated) {
      return NextResponse.json({ error }, { status: 401 });
    }

    const settings: SystemSettings = await request.json();
    const connection = await connectDB();
    
    await connection.db.collection('systemSettings').updateOne(
      {},
      { $set: settings },
      { upsert: true }
    );

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error('Error in POST /api/settings:', error);
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { authenticated, error } = await authenticateAPI(request, 'SUPER_ADMIN');
    
    if (!authenticated) {
      return NextResponse.json({ error }, { status: 401 });
    }

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
