'use client';

import { useState } from 'react';
import { Shield, AlertTriangle, FileCheck, Clock } from 'lucide-react';
import DashboardHeading from '@/components/shared/DashboardHeading';

export default function SecurityPage() {
  return (
    <div className="p-6">
      <DashboardHeading 
        title="Security Center" 
        subtitle="Monitor and manage system security" 
      />

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1a1a24] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <Shield className="text-purple-500" size={24} />
            <span className="text-green-400 text-sm font-medium">98% Secure</span>
          </div>
          <h3 className="text-white font-semibold mb-1">System Health</h3>
          <p className="text-gray-400 text-sm">All systems operating normally</p>
        </div>

        <div className="bg-[#1a1a24] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="text-yellow-500" size={24} />
            <span className="text-yellow-400 text-sm font-medium">3 Alerts</span>
          </div>
          <h3 className="text-white font-semibold mb-1">Active Alerts</h3>
          <p className="text-gray-400 text-sm">Requires your attention</p>
        </div>

        <div className="bg-[#1a1a24] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <FileCheck className="text-blue-500" size={24} />
            <span className="text-blue-400 text-sm font-medium">24/7</span>
          </div>
          <h3 className="text-white font-semibold mb-1">Audit Logs</h3>
          <p className="text-gray-400 text-sm">System activity monitoring</p>
        </div>

        <div className="bg-[#1a1a24] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <Clock className="text-purple-500" size={24} />
            <span className="text-purple-400 text-sm font-medium">99.9%</span>
          </div>
          <h3 className="text-white font-semibold mb-1">Uptime</h3>
          <p className="text-gray-400 text-sm">Last 30 days performance</p>
        </div>
      </div>

      {/* Recent Security Events */}
      <div className="bg-[#1a1a24] rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Security Events</h2>
        <div className="space-y-4">
          {[
            {
              event: 'Suspicious login attempt blocked',
              time: '2 minutes ago',
              type: 'warning',
            },
            {
              event: 'System backup completed',
              time: '1 hour ago',
              type: 'success',
            },
            {
              event: 'Security patch installed',
              time: '3 hours ago',
              type: 'info',
            },
          ].map((event, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#13131f] rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-2 h-2 rounded-full ${
                    event.type === 'warning'
                      ? 'bg-yellow-500'
                      : event.type === 'success'
                      ? 'bg-green-500'
                      : 'bg-blue-500'
                  }`}
                />
                <span className="text-white">{event.event}</span>
              </div>
              <span className="text-gray-400 text-sm">{event.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
