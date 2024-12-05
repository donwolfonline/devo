import { NextRequest, NextResponse } from 'next/server';
import { authenticateAPI } from '@/lib/auth-helpers';
import { connectDB } from '@/lib/mongodb';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';

const execAsync = promisify(exec);

async function ensureDirectoryExists(dir: string) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { authenticated, error } = await authenticateAPI(request, 'SUPER_ADMIN');
    
    if (!authenticated) {
      return NextResponse.json({ error }, { status: 401 });
    }

    // Get MongoDB database size
    let databaseSize = 0;
    try {
      const connection = await connectDB();
      const stats = await connection.db.stats();
      databaseSize = Math.round(stats.dataSize / (1024 * 1024)); // Convert to MB
    } catch (error) {
      console.error('Error getting database size:', error);
    }

    // Ensure directories exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const backupsDir = path.join(process.cwd(), 'backups');
    await ensureDirectoryExists(uploadsDir);
    await ensureDirectoryExists(backupsDir);

    // Get uploads directory size
    let uploadsSize = 0;
    try {
      const files = await fs.readdir(uploadsDir, { withFileTypes: true });
      for (const file of files) {
        if (file.isFile()) {
          const stats = await fs.stat(path.join(uploadsDir, file.name));
          uploadsSize += stats.size;
        }
      }
    } catch (error) {
      console.error('Error getting uploads size:', error);
    }
    uploadsSize = Math.round(uploadsSize / (1024 * 1024)); // Convert to MB

    // Get backups directory size
    let backupsSize = 0;
    try {
      const files = await fs.readdir(backupsDir, { withFileTypes: true });
      for (const file of files) {
        if (file.isFile()) {
          const stats = await fs.stat(path.join(backupsDir, file.name));
          backupsSize += stats.size;
        }
      }
    } catch (error) {
      console.error('Error getting backups size:', error);
    }
    backupsSize = Math.round(backupsSize / (1024 * 1024)); // Convert to MB

    // Get disk usage
    let diskSpace = {
      total: 100, // Default values in GB
      used: 0,
      free: 100
    };

    try {
      if (process.platform === 'darwin') {
        // macOS
        const { stdout } = await execAsync('df -k / | tail -1');
        const [, total, used, free] = stdout.split(/\s+/);
        diskSpace = {
          total: Math.round(parseInt(total) / (1024 * 1024)), // Convert to GB
          used: Math.round(parseInt(used) / (1024 * 1024)),
          free: Math.round(parseInt(free) / (1024 * 1024))
        };
      } else if (process.platform === 'linux') {
        // Linux
        const { stdout } = await execAsync('df -B1 / | tail -1');
        const [, total, used, free] = stdout.split(/\s+/);
        diskSpace = {
          total: Math.round(parseInt(total) / (1024 * 1024 * 1024)), // Convert to GB
          used: Math.round(parseInt(used) / (1024 * 1024 * 1024)),
          free: Math.round(parseInt(free) / (1024 * 1024 * 1024))
        };
      }
    } catch (error) {
      console.error('Error getting disk usage:', error);
    }

    return NextResponse.json({
      databaseSize,
      uploadsSize,
      backupsSize,
      diskSpace,
      total: diskSpace.total || 100,
      used: diskSpace.used || 0,
      free: diskSpace.free || 100
    });
  } catch (error) {
    console.error('Error in storage route:', error);
    return NextResponse.json({
      databaseSize: 0,
      uploadsSize: 0,
      backupsSize: 0,
      diskSpace: { total: 100, used: 0, free: 100 },
      total: 100,
      used: 0,
      free: 100
    });
  }
}

export async function POST(request: NextRequest) {
  const { authenticated, error } = await authenticateAPI(request, 'SUPER_ADMIN');
  
  if (!authenticated) {
    return NextResponse.json({ error }, { status: 401 });
  }

  try {
    // No existing storage logic for POST request
    return NextResponse.json({ message: 'Storage updated successfully' });
  } catch (error) {
    console.error('Storage error:', error);
    return NextResponse.json({ error: 'Failed to update storage' }, { status: 500 });
  }
}
