'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { CustomizationProvider } from '@/context/CustomizationContext';
import CustomizationPanel from './CustomizationPanel';
import DevicePreview from './DevicePreview';

export default function TemplatePreviewBar({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const [activeView, setActiveView] = useState<'preview' | 'code' | 'customize'>('preview');
  const [isOpen, setIsOpen] = useState(true);

  return (
    <CustomizationProvider>
      <div className="fixed inset-0 flex">
        {/* Preview Bar */}
        <motion.div
          initial={false}
          animate={{
            width: isOpen ? '400px' : '64px',
          }}
          className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <motion.h2
              animate={{ opacity: isOpen ? 1 : 0 }}
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              Template Preview
            </motion.h2>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isOpen ? '←' : '→'}
            </button>
          </div>

          {/* View Toggles */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              {['preview', 'code', 'customize'].map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view as any)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeView === view
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <span className="capitalize">{view}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  {activeView === 'customize' && <CustomizationPanel />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <DevicePreview>{children}</DevicePreview>
        </div>
      </div>
    </CustomizationProvider>
  );
}
