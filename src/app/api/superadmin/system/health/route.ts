import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/mongodb';
import os from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptime: number;
  memory: {
    total: number;
    free: number;
    used: number;
    usagePercent: number;
  };
  cpu: {
    cores: number;
    loadAvg: number[];
    usagePercent: number;
  };
  disk: {
    total: number;
    free: number;
    used: number;
    usagePercent: number;
  };
  database: {
    status: 'connected' | 'disconnected';
    latency: number;
  };
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get system metrics
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const memUsagePercent = (usedMem / totalMem) * 100;

    // Get disk usage
    const { stdout: dfOutput } = await execAsync('df -k /');
    const diskStats = dfOutput.split('\n')[1].split(/\s+/);
    const totalDisk = parseInt(diskStats[1]) * 1024;
    const usedDisk = parseInt(diskStats[2]) * 1024;
    const freeDisk = parseInt(diskStats[3]) * 1024;
    const diskUsagePercent = (usedDisk / totalDisk) * 100;

    // Check database connection and latency
    const startTime = Date.now();
    const { db } = await connectToDatabase();
    const dbLatency = Date.now() - startTime;

    // Get CPU metrics
    const cpuCores = os.cpus().length;
    const loadAvg = os.loadavg();
    const cpuUsagePercent = (loadAvg[0] / cpuCores) * 100;

    const health: SystemHealth = {
      status: 'healthy',
      uptime: os.uptime(),
      memory: {
        total: totalMem,
        free: freeMem,
        used: usedMem,
        usagePercent: memUsagePercent,
      },
      cpu: {
        cores: cpuCores,
        loadAvg: loadAvg,
        usagePercent: cpuUsagePercent,
      },
      disk: {
        total: totalDisk,
        free: freeDisk,
        used: usedDisk,
        usagePercent: diskUsagePercent,
      },
      database: {
        status: 'connected',
        latency: dbLatency,
      },
    };

    // Determine system status based on metrics
    if (memUsagePercent > 90 || diskUsagePercent > 90 || cpuUsagePercent > 90 || dbLatency > 1000) {
      health.status = 'degraded';
    }

    return NextResponse.json(health);
  } catch (error) {
    console.error('Error checking system health:', error);
    return NextResponse.json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
