import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';
import dbConnect from '@/lib/db';

const execAsync = promisify(exec);
const MAX_BACKUPS = 10; // Keep only last 10 backups

interface BackupMetadata {
  id: string;
  timestamp: Date;
  size: number;
  type: 'manual' | 'automated';
  status: 'completed' | 'failed';
  path: string;
}

// Cleanup old backups
async function cleanupOldBackups(db: any) {
  try {
    // Get all backups sorted by timestamp
    const backups = await db.collection('backups')
      .find()
      .sort({ timestamp: -1 })
      .toArray();

    // If we have more backups than the limit
    if (backups.length > MAX_BACKUPS) {
      const backupsToDelete = backups.slice(MAX_BACKUPS);
      
      // Delete old backup files
      for (const backup of backupsToDelete) {
        try {
          await fs.unlink(backup.path);
          await db.collection('backups').deleteOne({ id: backup.id });
        } catch (error) {
          console.error(`Failed to delete backup ${backup.id}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error cleaning up old backups:', error);
  }
}

// Get list of backups
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await dbConnect();
    const backups = await db.collection('backups')
      .find()
      .sort({ timestamp: -1 })
      .toArray();

    return NextResponse.json(backups);
  } catch (error) {
    console.error('Error fetching backups:', error);
    return NextResponse.json({ error: 'Failed to fetch backups' }, { status: 500 });
  }
}

// Create a new backup
export async function POST(req: Request) {
  let dbConnection = null;
  try {
    console.log('Starting backup process...');
    
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'SUPER_ADMIN') {
      console.error('Unauthorized access attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Parsing request body...');
    const { type } = await req.json();
    
    console.log('Connecting to database...');
    const { db } = await dbConnect();
    if (!db) {
      throw new Error('Failed to connect to database');
    }
    dbConnection = db;

    // Create backup directory if it doesn't exist
    const backupDir = path.join(process.cwd(), 'data', 'backups');
    console.log('Creating backup directory:', backupDir);
    try {
      await fs.mkdir(backupDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create backup directory:', error);
      return NextResponse.json({ 
        error: 'Failed to create backup',
        details: `Could not create backup directory: ${error instanceof Error ? error.message : 'Unknown error'}`
      }, { status: 500 });
    }

    // Generate backup filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `backup-${timestamp}.gz`;
    const backupPath = path.join(backupDir, filename);
    console.log('Backup path:', backupPath);

    // Get MongoDB connection URI
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('MongoDB URI not found in environment variables');
      return NextResponse.json({ 
        error: 'Failed to create backup',
        details: 'MongoDB connection URI not found in environment'
      }, { status: 500 });
    }

    console.log('Starting mongodump process...');
    try {
      // Get mongodump path
      const mongodumpPath = await execAsync('which mongodump');
      console.log('mongodump path:', mongodumpPath.stdout.trim());

      // Execute mongodump command with error output
      const { stdout, stderr } = await execAsync(
        `mongodump --uri="${uri}" --archive="${backupPath}" --gzip`,
        { 
          timeout: 60000, // 1 minute timeout
          env: {
            ...process.env,
            PATH: '/usr/local/bin:/usr/bin:/bin:/opt/homebrew/bin'  // Include common MongoDB installation paths
          }
        }
      );

      console.log('mongodump stdout:', stdout);
      if (stderr) {
        console.log('mongodump stderr:', stderr);
        if (!stderr.includes('done dumping')) {
          throw new Error(stderr);
        }
      }

      // Verify backup file exists and has size
      console.log('Verifying backup file...');
      const stats = await fs.stat(backupPath);
      console.log('Backup file size:', stats.size);

      if (stats.size === 0) {
        throw new Error('Backup file is empty');
      }

      // Create backup metadata
      console.log('Creating backup metadata...');
      const backupMetadata: BackupMetadata = {
        id: timestamp,
        timestamp: new Date(),
        size: stats.size,
        type: type || 'manual',
        status: 'completed',
        path: backupPath
      };

      // Save backup metadata to database
      await dbConnection.collection('backups').insertOne(backupMetadata);

      // Cleanup old backups
      await cleanupOldBackups(dbConnection);

      console.log('Backup completed successfully');
      return NextResponse.json({ 
        message: 'Backup created successfully', 
        backup: backupMetadata 
      });
    } catch (error) {
      console.error('Backup process failed:', error);
      
      // Try to get more system information
      try {
        const { stdout: mongoVersion } = await execAsync('mongodump --version');
        console.log('MongoDB tools version:', mongoVersion);
      } catch (versionError) {
        console.error('Failed to get MongoDB tools version:', versionError);
      }

      // If backup fails, create a failed backup entry
      const backupMetadata: BackupMetadata = {
        id: timestamp,
        timestamp: new Date(),
        size: 0,
        type: type || 'manual',
        status: 'failed',
        path: backupPath
      };

      if (dbConnection) {
        await dbConnection.collection('backups').insertOne(backupMetadata);
      }
      
      return NextResponse.json({ 
        error: 'Failed to create backup',
        details: error instanceof Error ? error.message : 'Backup command failed'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Unhandled error in backup process:', error);
    return NextResponse.json({ 
      error: 'Failed to create backup',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

// Restore from backup
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { backupId } = await req.json();
    const { db } = await dbConnect();

    // Find backup metadata
    const backup = await db.collection('backups').findOne({ id: backupId });
    if (!backup) {
      return NextResponse.json({ error: 'Backup not found' }, { status: 404 });
    }

    // Verify backup file exists
    try {
      await fs.access(backup.path);
    } catch {
      return NextResponse.json({ error: 'Backup file not found' }, { status: 404 });
    }

    // Get MongoDB connection URI
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MongoDB connection URI not found');
    }

    try {
      // Execute mongorestore command
      await execAsync(
        `mongorestore --uri="${uri}" --archive="${backup.path}" --gzip --drop`,
        { 
          env: {
            ...process.env,
            PATH: process.env.PATH // Ensure mongorestore is in PATH
          }
        }
      );

      return NextResponse.json({ message: 'Backup restored successfully' });
    } catch (error) {
      console.error('Error restoring backup:', error);
      return NextResponse.json({ 
        error: 'Failed to restore backup',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error restoring backup:', error);
    return NextResponse.json({ 
      error: 'Failed to restore backup',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
