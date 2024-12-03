import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const SETTINGS_ID = 'settings';

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated as SUPER_ADMIN
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Default settings
    const defaultSettings = {
      maintenanceMode: false,
      maxUserAccounts: 1000,
      defaultUserRole: 'USER',
      analyticsTracking: true,
      emailNotifications: true
    };

    return NextResponse.json(defaultSettings);
  } catch (error) {
    console.error('Error fetching system settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Check if user is authenticated as SUPER_ADMIN
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Get updated settings from request body
    const updatedSettings = await request.json();
    
    // Validate and merge with default settings
    const settings = {
      maintenanceMode: updatedSettings.maintenanceMode ?? false,
      maxUserAccounts: updatedSettings.maxUserAccounts ?? 1000,
      defaultUserRole: updatedSettings.defaultUserRole ?? 'USER',
      analyticsTracking: updatedSettings.analyticsTracking ?? true,
      emailNotifications: updatedSettings.emailNotifications ?? true
    };

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating system settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
