'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { getAllThemeNames, ThemeName } from '@/themes';
import { updateUserTheme } from '@/lib/actions/user-actions';

interface ThemeSwitcherProps {
  currentTheme: ThemeName;
}

export function ThemeSwitcher({ currentTheme }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const themes = getAllThemeNames();

  const handleThemeChange = async (theme: ThemeName) => {
    try {
      const result = await updateUserTheme(theme);
      if (result.success) {
        // Optional: Add a toast or notification
        setIsOpen(false);
        // Force a page reload to apply theme changes
        window.location.reload();
      } else {
        console.error('Theme update failed:', result.error);
      }
    } catch (error) {
      console.error('Failed to update theme:', error);
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 rounded-full bg-gray-100/10 hover:bg-gray-100/20 transition-colors"
      >
        <Palette className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
          >
            <div className="p-2">
              <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Choose Theme
              </h3>
              <div className="space-y-1">
                {themes.map((theme) => (
                  <motion.button
                    key={theme}
                    onClick={() => handleThemeChange(theme)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      w-full flex items-center justify-between p-2 rounded
                      ${currentTheme === theme 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                    `}
                  >
                    <span className="capitalize">{theme.replace('-', ' ')}</span>
                    {currentTheme === theme && (
                      <Check className="w-4 h-4" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Server Component for fetching and rendering ThemeSwitcher
export async function ThemeSwitcherWrapper() {
  // TODO: Implement user theme fetching logic
  const currentTheme: ThemeName = 'cyberpunk';

  return <ThemeSwitcher currentTheme={currentTheme} />;
}
