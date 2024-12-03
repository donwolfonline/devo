'use client';

import { FolderKanban, Users, Clock, ArrowUpRight } from 'lucide-react';
import DashboardHeading from '@/components/shared/DashboardHeading';

export default function ProjectOverview() {
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
            <div className="text-[40px] font-semibold text-white">156</div>
          </div>
          <h3 className="text-white font-semibold mb-1">Active Projects</h3>
          <p className="text-gray-400 text-sm">Currently in development</p>
        </div>

        <div className="bg-[#1a1a24] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <Users className="text-blue-500" size={24} />
            <div className="text-[40px] font-semibold text-white">892</div>
          </div>
          <h3 className="text-white font-semibold mb-1">Team Members</h3>
          <p className="text-gray-400 text-sm">Across all projects</p>
        </div>

        <div className="bg-[#1a1a24] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <Clock className="text-green-500" size={24} />
            <div className="text-[40px] font-semibold text-white">85%</div>
          </div>
          <h3 className="text-white font-semibold mb-1">On Schedule</h3>
          <p className="text-gray-400 text-sm">Projects meeting deadlines</p>
        </div>

        <div className="bg-[#1a1a24] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <ArrowUpRight className="text-yellow-500" size={24} />
            <div className="text-[40px] font-semibold text-white">23%</div>
          </div>
          <h3 className="text-white font-semibold mb-1">Growth</h3>
          <p className="text-gray-400 text-sm">New projects this month</p>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-[#1a1a24] rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Projects</h2>
        <div className="space-y-4">
          {[
            {
              name: 'E-commerce Platform',
              team: 'Team Alpha',
              progress: 75,
              status: 'active',
            },
            {
              name: 'Mobile App Development',
              team: 'Team Beta',
              progress: 45,
              status: 'active',
            },
            {
              name: 'Cloud Migration',
              team: 'Team Gamma',
              progress: 90,
              status: 'review',
            },
          ].map((project, index) => (
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
