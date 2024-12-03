import { NextRequest, NextResponse } from 'next/server';
import { requireSuperAdmin } from '@/lib/admin-auth';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import Log from '@/models/Log';

export async function GET(req: NextRequest) {
  const authCheck = await requireSuperAdmin();
  if (authCheck instanceof NextResponse) return authCheck;

  try {
    await connectDB();

    // User Statistics
    const [
      totalUsers,
      newUsersThisMonth,
      usersByRole,
      usersBySignupDate
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({
        createdAt: { 
          $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) 
        }
      }),
      User.aggregate([
        { 
          $group: { 
            _id: '$role', 
            count: { $sum: 1 } 
          } 
        }
      ]),
      User.aggregate([
        { 
          $group: { 
            _id: { 
              $dateToString: { 
                format: '%Y-%m-%d', 
                date: '$createdAt' 
              } 
            }, 
            count: { $sum: 1 } 
          } 
        },
        { 
          $sort: { _id: 1 } 
        }
      ])
    ]);

    // Log Statistics
    const [
      totalLogs,
      logsByType,
      recentLogs
    ] = await Promise.all([
      Log.countDocuments(),
      Log.aggregate([
        { 
          $group: { 
            _id: '$type', 
            count: { $sum: 1 } 
          } 
        }
      ]),
      Log.find()
        .sort({ timestamp: -1 })
        .limit(10)
    ]);

    return NextResponse.json({
      users: {
        total: totalUsers,
        newThisMonth: newUsersThisMonth,
        byRole: usersByRole,
        bySignupDate: usersBySignupDate
      },
      logs: {
        total: totalLogs,
        byType: logsByType,
        recent: recentLogs
      }
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
