'use client';

import { motion } from 'framer-motion';
import { LinkBioProfile } from '@/types/link-bio';
import {
  AreaChart,
  BarChart,
  PieChart,
  HeatMap,
  WorldMap
} from '@/components/ui/charts';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import {
  Users,
  MousePointerClick,
  Globe,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Smartphone,
  Monitor,
  Tablet,
} from 'lucide-react';

interface AdvancedAnalyticsProps {
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
      uniqueVisitors: number;
    }[];
    deviceTypes: Record<string, number>;
    browserTypes: Record<string, number>;
    referralSources: Record<string, number>;
    engagementMetrics: {
      averageTimeOnPage: number;
      bounceRate: number;
      returnVisitorRate: number;
    };
    peakHours: Record<string, number>;
    socialShareStats: Record<string, number>;
    heatmapData: {
      x: number;
      y: number;
      value: number;
    }[];
  };
}

export default function AdvancedAnalytics({
  profile,
  analytics
}: AdvancedAnalyticsProps) {
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
      {/* Date Range Picker */}
      <div className="flex justify-end">
        <DateRangePicker
          onChange={(range) => {
            // Handle date range change
          }}
        />
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Views"
          value={analytics.totalViews}
          change={analytics.viewsChange}
          icon={<Users className="w-12 h-12 text-purple-500 opacity-20" />}
        />
        <StatsCard
          title="Total Clicks"
          value={analytics.totalClicks}
          change={analytics.clicksChange}
          icon={<MousePointerClick className="w-12 h-12 text-blue-500 opacity-20" />}
        />
        <StatsCard
          title="Click Through Rate"
          value={`${analytics.clickThroughRate}%`}
          change={analytics.ctrChange}
          icon={<TrendingUp className="w-12 h-12 text-green-500 opacity-20" />}
        />
        <StatsCard
          title="Avg. Time on Page"
          value={`${Math.round(analytics.engagementMetrics.averageTimeOnPage)}s`}
          change={0}
          icon={<Clock className="w-12 h-12 text-yellow-500 opacity-20" />}
        />
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="traffic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Traffic Overview</h3>
              <AreaChart
                data={analytics.viewsOverTime}
                xKey="date"
                yKey={["views", "uniqueVisitors"]}
                colors={[profile.customization.primaryColor, profile.customization.secondaryColor]}
              />
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Referral Sources</h3>
              <PieChart
                data={Object.entries(analytics.referralSources).map(([name, value]) => ({
                  name,
                  value
                }))}
                colors={['#9333EA', '#A855F7', '#C084FC', '#D8B4FE']}
              />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Click Distribution</h3>
              <HeatMap
                data={analytics.heatmapData}
                xLabel="Hour of Day"
                yLabel="Day of Week"
              />
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Link Performance</h3>
              <BarChart
                data={Object.entries(analytics.clicksByLink).map(([name, value]) => ({
                  name,
                  value
                }))}
                color={profile.customization.primaryColor}
              />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Device Types</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <DeviceCard
                  icon={<Smartphone />}
                  label="Mobile"
                  value={analytics.deviceTypes.mobile || 0}
                />
                <DeviceCard
                  icon={<Monitor />}
                  label="Desktop"
                  value={analytics.deviceTypes.desktop || 0}
                />
                <DeviceCard
                  icon={<Tablet />}
                  label="Tablet"
                  value={analytics.deviceTypes.tablet || 0}
                />
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Browsers</h3>
              <PieChart
                data={Object.entries(analytics.browserTypes).map(([name, value]) => ({
                  name,
                  value
                }))}
                colors={['#9333EA', '#A855F7', '#C084FC', '#D8B4FE']}
              />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geography">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
            <WorldMap
              data={Object.entries(analytics.viewsByCountry).map(([country, value]) => ({
                country,
                value
              }))}
              color={profile.customization.primaryColor}
            />
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

function StatsCard({ title, value, change, icon }: any) {
  return (
    <motion.div variants={item}>
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <div className={`flex items-center mt-2 ${
              change >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {change >= 0 ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm">{Math.abs(change)}%</span>
            </div>
          </div>
          {icon}
        </div>
      </Card>
    </motion.div>
  );
}

function DeviceCard({ icon, label, value }: any) {
  return (
    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="text-gray-400 mb-2">{icon}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
      <div className="text-lg font-semibold mt-1">{value}</div>
    </div>
  );
}
