import { prisma } from './prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

export interface AnalyticsTimeRange {
  start: Date;
  end: Date;
}

export class AnalyticsService {
  static async getTimeRange(range: '24h' | '7d' | '30d' | '90d'): Promise<AnalyticsTimeRange> {
    const end = new Date();
    const start = new Date();

    switch (range) {
      case '24h':
        start.setHours(start.getHours() - 24);
        break;
      case '7d':
        start.setDate(start.getDate() - 7);
        break;
      case '30d':
        start.setDate(start.getDate() - 30);
        break;
      case '90d':
        start.setDate(start.getDate() - 90);
        break;
    }

    return { start, end };
  }

  static async trackSession(userId: string, headers: Headers): Promise<string> {
    const userAgent = headers.get('user-agent') || '';
    const ip = headers.get('x-forwarded-for') || headers.get('x-real-ip') || '';
    
    const parser = new UAParser(userAgent);
    const deviceInfo = JSON.stringify({
      browser: parser.getBrowser(),
      device: parser.getDevice(),
      os: parser.getOS()
    });

    const session = await prisma.userSession.create({
      data: {
        userId,
        deviceInfo,
        ipAddress: ip,
        userAgent,
      }
    });

    return session.id;
  }

  static async updateSessionActivity(sessionId: string) {
    await prisma.userSession.update({
      where: { id: sessionId },
      data: {
        lastActivity: new Date(),
      }
    });
  }

  static async endSession(sessionId: string) {
    const session = await prisma.userSession.findUnique({
      where: { id: sessionId }
    });

    if (session) {
      const endTime = new Date();
      const duration = Math.floor((endTime.getTime() - session.startTime.getTime()) / 1000);

      await prisma.userSession.update({
        where: { id: sessionId },
        data: {
          endTime,
          duration,
          isActive: false,
        }
      });
    }
  }

  static async trackPageView(sessionId: string | null, userId: string | null, path: string, referrer?: string) {
    await prisma.pageView.create({
      data: {
        sessionId,
        userId,
        path,
        referrer,
      }
    });
  }

  static async trackConversion(sessionId: string | null, userId: string | null, eventType: string, metadata?: any) {
    await prisma.conversionEvent.create({
      data: {
        sessionId,
        userId,
        eventType,
        metadata: metadata || {},
      }
    });
  }

  static async trackTrafficSource(sessionId: string, source: string, medium?: string, campaign?: string) {
    await prisma.trafficSource.create({
      data: {
        sessionId,
        source,
        medium,
        campaign,
      }
    });
  }

  static async getAnalytics(timeRange: AnalyticsTimeRange) {
    try {
      const { start, end } = timeRange;

      // Get total users
      const totalUsers = await prisma.user.count().catch(() => 0);
      const newUsers = await prisma.user.count({
        where: {
          createdAt: {
            gte: start,
            lte: end,
          }
        }
      }).catch(() => 0);

      // Get active sessions
      const activeSessions = await prisma.userSession.count({
        where: {
          isActive: true,
          lastActivity: {
            gte: new Date(Date.now() - 30 * 60 * 1000) // Active in last 30 minutes
          }
        }
      }).catch(() => 0);

      // Calculate average session time
      const sessions = await prisma.userSession.findMany({
        where: {
          startTime: {
            gte: start,
            lte: end,
          },
          duration: { not: null }
        },
        select: { duration: true }
      }).catch(() => []);

      const totalDuration = sessions.reduce((sum, session) => sum + (session.duration || 0), 0);
      const avgSessionTime = sessions.length > 0 ? Math.floor(totalDuration / sessions.length) : 0;

      // Calculate conversion rate
      const totalVisits = await prisma.pageView.count({
        where: {
          createdAt: {
            gte: start,
            lte: end,
          }
        }
      }).catch(() => 0);

      const conversions = await prisma.conversionEvent.count({
        where: {
          createdAt: {
            gte: start,
            lte: end,
          }
        }
      }).catch(() => 0);

      const conversionRate = totalVisits > 0 ? (conversions / totalVisits) * 100 : 0;

      // Get traffic sources with fallback
      const trafficSources = await prisma.trafficSource.groupBy({
        by: ['source'],
        where: {
          createdAt: {
            gte: start,
            lte: end,
          }
        },
        _count: {
          source: true
        }
      }).catch(() => []);

      // Calculate growth rates with fallback
      const previousStart = new Date(start);
      previousStart.setDate(previousStart.getDate() - (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

      const [previousUserCount, previousSessionCount] = await Promise.all([
        prisma.user.count({
          where: {
            createdAt: {
              gte: previousStart,
              lt: start,
            }
          }
        }).catch(() => 0),
        prisma.userSession.count({
          where: {
            startTime: {
              gte: previousStart,
              lt: start,
            }
          }
        }).catch(() => 0)
      ]);

      const userGrowth = previousUserCount > 0 ? ((newUsers - previousUserCount) / previousUserCount) * 100 : 0;
      const sessionGrowth = previousSessionCount > 0 ? ((sessions.length - previousSessionCount) / previousSessionCount) * 100 : 0;

      // Get user activity over time with fallback
      const userActivity = await prisma.pageView.groupBy({
        by: ['createdAt'],
        where: {
          createdAt: {
            gte: start,
            lte: end,
          }
        },
        _count: {
          id: true
        }
      }).catch(() => []);

      return {
        totalUsers,
        newUsers,
        activeSessions,
        avgSessionTime,
        conversionRate,
        userGrowth,
        sessionGrowth,
        trafficSources: trafficSources.map(ts => ({
          source: ts.source || 'Unknown',
          count: ts._count?.source || 0
        })),
        userActivity: userActivity.map(ua => ({
          date: ua.createdAt || new Date(),
          count: ua._count?.id || 0
        }))
      };
    } catch (error) {
      console.error('Analytics service error:', error);
      // Return fallback data instead of throwing
      return {
        totalUsers: 0,
        newUsers: 0,
        activeSessions: 0,
        avgSessionTime: 0,
        conversionRate: 0,
        userGrowth: 0,
        sessionGrowth: 0,
        trafficSources: [],
        userActivity: []
      };
    }
  }
}
