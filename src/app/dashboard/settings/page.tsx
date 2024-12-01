'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon, BellIcon, GlobeAltIcon, ShieldCheckIcon, KeyIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function Settings() {
  const { data: session, update } = useSession();
  const [theme, setTheme] = useState('dark');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    portfolioViews: true,
    newFollowers: false,
    projectLikes: true
  });
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    showStats: true
  });

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Here you would typically make an API call to update the profile
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Settings</h1>
          {message && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-sm ${
                message.includes('success') ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {message}
            </motion.div>
          )}
        </div>

        {/* Theme Settings */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-card rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <SunIcon className="h-6 w-6 text-accent" />
            <h2 className="text-xl font-semibold">Theme Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleThemeChange('light')}
                className={`p-3 rounded-lg transition-colors ${
                  theme === 'light'
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
                aria-label="Switch to light mode"
              >
                <SunIcon className="h-6 w-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleThemeChange('dark')}
                className={`p-3 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
                aria-label="Switch to dark mode"
              >
                <MoonIcon className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-card rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <BellIcon className="h-6 w-6 text-accent" />
            <h2 className="text-xl font-semibold">Notification Preferences</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <span className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleNotificationChange(key as keyof typeof notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-accent' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </motion.button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-card rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheckIcon className="h-6 w-6 text-accent" />
            <h2 className="text-xl font-semibold">Privacy Settings</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(privacy).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <span className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePrivacyChange(key as keyof typeof privacy)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-accent' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </motion.button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Profile Settings */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-card rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <KeyIcon className="h-6 w-6 text-accent" />
            <h2 className="text-xl font-semibold">Profile Settings</h2>
          </div>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Display Name</label>
              <input
                type="text"
                defaultValue={session?.user?.name || ''}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={session?.user?.email || ''}
                disabled
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                rows={4}
                placeholder="Tell us about yourself..."
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
