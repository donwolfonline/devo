'use client';

import { motion } from 'framer-motion';
import { LinkBioProfile } from '@/types/link-bio';
import { BarChart, LineChart, PieChart } from '@/components/ui/charts';
import { Card } from '@/components/ui/card';
import { 
  Users, 
  MousePointerClick, 
  Globe, 
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface AnalyticsDashboardProps {
  profile: LinkBioProfile;
  analytics: {
    totalViews: number;
    viewsChange: number;
    totalClicks: number;
    clicksChange: number;
    clickThroughRate: number;
    ctrChange: number;
    viewsByCountry: Record<string, number>;
    clicksByLink: Record<string, number>;
    viewsOverTime: {
      date: string;
      views: number;
    }[];
    deviceTypes: Record<string, number>;
  };
}

export default function AnalyticsDashboard({ profile, analytics }: AnalyticsDashboardProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Views</p>
                <h3 className="text-2xl font-bold mt-1">{analytics.totalViews}</h3>
                <div className={`flex items-center mt-2 ${
                  analytics.viewsChange >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {analytics.viewsChange >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  )}
                  <span className="text-sm">{Math.abs(analytics.viewsChange)}%</span>
                </div>
              </div>
              <Users className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Clicks</p>
                <h3 className="text-2xl font-bold mt-1">{analytics.totalClicks}</h3>
                <div className={`flex items-center mt-2 ${
                  analytics.clicksChange >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {analytics.clicksChange >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  )}
                  <span className="text-sm">{Math.abs(analytics.clicksChange)}%</span>
                </div>
              </div>
              <MousePointerClick className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Click Through Rate</p>
                <h3 className="text-2xl font-bold mt-1">{analytics.clickThroughRate}%</h3>
                <div className={`flex items-center mt-2 ${
                  analytics.ctrChange >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {analytics.ctrChange >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  )}
                  <span className="text-sm">{Math.abs(analytics.ctrChange)}%</span>
                </div>
              </div>
              <TrendingUp className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Top Country</p>
                <h3 className="text-2xl font-bold mt-1">
                  {Object.entries(analytics.viewsByCountry)
                    .sort(([, a], [, b]) => b - a)[0][0]}
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  {Object.entries(analytics.viewsByCountry)
                    .sort(([, a], [, b]) => b - a)[0][1]} views
                </p>
              </div>
              <Globe className="w-12 h-12 text-yellow-500 opacity-20" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Views Over Time</h3>
            <LineChart
              data={analytics.viewsOverTime}
              xKey="date"
              yKey="views"
              color={profile.customization.primaryColor}
            />
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Clicks by Link</h3>
            <BarChart
              data={Object.entries(analytics.clicksByLink).map(([name, value]) => ({
                name,
                value
              }))}
              color={profile.customization.secondaryColor}
            />
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Device Types</h3>
            <PieChart
              data={Object.entries(analytics.deviceTypes).map(([name, value]) => ({
                name,
                value
              }))}
              colors={['#9333EA', '#A855F7', '#C084FC']}
            />
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
            <BarChart
              data={Object.entries(analytics.viewsByCountry).map(([name, value]) => ({
                name,
                value
              }))}
              color={profile.customization.primaryColor}
              layout="horizontal"
            />
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
