'use client';

import { FolderKanban, Users, Clock, ArrowUpRight } from 'lucide-react';
import DashboardHeading from '@/components/shared/DashboardHeading';
import { useEffect, useState } from 'react';

interface ProjectStats {
  activeProjects: number;
  teamMembers: number;
  onSchedule: number;
  growth: number;
  recentProjects: {
    name: string;
    team: string;
    progress: number;
    status: string;
  }[];
}

export default function ProjectOverview() {
  const [stats, setStats] = useState<ProjectStats>({
    activeProjects: 0,
    teamMembers: 0,
    onSchedule: 0,
    growth: 0,
    recentProjects: []
  });
  const [retryCount, setRetryCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects/stats');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch project statistics');
        }
        const data = await response.json();
        setStats(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching project stats:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Retry up to 3 times with exponential backoff
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, Math.pow(2, retryCount) * 1000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [retryCount]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-500/10 text-red-400 p-4 rounded-lg mt-4 flex items-center justify-between">
          <div>
            <p className="font-medium">Error: {error}</p>
            <p className="text-sm mt-1">Please try again or contact support if the problem persists.</p>
          </div>
          {retryCount < 3 && (
            <button
              onClick={() => setRetryCount(prev => prev + 1)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <DashboardHeading 
        title="Project Overview" 
        subtitle="Monitor and manage all active projects" 
      />

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1a1a24] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <FolderKanban className="text-purple-500" size={24} />
            <div className="text-[40px] font-semibold text-white">{stats.activeProjects}</div>
          </div>
          <h3 className="text-white font-semibold mb-1">Active Projects</h3>
          <p className="text-gray-400 text-sm">Currently in development</p>
        </div>

        <div className="bg-[#1a1a24] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <Users className="text-blue-500" size={24} />
            <div className="text-[40px] font-semibold text-white">{stats.teamMembers}</div>
          </div>
          <h3 className="text-white font-semibold mb-1">Team Members</h3>
          <p className="text-gray-400 text-sm">Across all projects</p>
        </div>

        <div className="bg-[#1a1a24] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <Clock className="text-green-500" size={24} />
            <div className="text-[40px] font-semibold text-white">{stats.onSchedule}%</div>
          </div>
          <h3 className="text-white font-semibold mb-1">On Schedule</h3>
          <p className="text-gray-400 text-sm">Projects meeting deadlines</p>
        </div>

        <div className="bg-[#1a1a24] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <ArrowUpRight className="text-yellow-500" size={24} />
            <div className="text-[40px] font-semibold text-white">{stats.growth}%</div>
          </div>
          <h3 className="text-white font-semibold mb-1">Growth</h3>
          <p className="text-gray-400 text-sm">New projects this month</p>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-[#1a1a24] rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Projects</h2>
        <div className="space-y-4">
          {stats.recentProjects.map((project, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#13131f] rounded-lg"
            >
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">{project.name}</h3>
                <p className="text-gray-400 text-sm">{project.team}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'active'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-yellow-500/10 text-yellow-400'
                  }`}
                >
                  {project.status === 'active' ? 'Active' : 'In Review'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
