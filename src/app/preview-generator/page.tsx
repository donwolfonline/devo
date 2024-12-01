'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const PreviewGenerator = () => {
  const [currentTemplate, setCurrentTemplate] = useState('minimal');

  const templates = {
    minimal: {
      style: 'bg-white',
      content: (
        <div className="h-full w-full bg-white p-8">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-4">
              <div className="h-8 w-32 bg-gray-200 rounded-md"></div>
              <div className="h-4 w-64 bg-gray-100 rounded-md"></div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="h-40 w-full bg-gray-100 rounded-lg"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded-md"></div>
                <div className="h-4 w-1/2 bg-gray-100 rounded-md"></div>
              </div>
              <div className="space-y-3">
                <div className="h-40 w-full bg-gray-100 rounded-lg"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded-md"></div>
                <div className="h-4 w-1/2 bg-gray-100 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    modern: {
      style: 'bg-gradient-to-br from-blue-500 to-purple-600',
      content: (
        <div className="h-full w-full bg-gradient-to-br from-blue-500 to-purple-600 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8 space-y-6">
                <div className="h-12 w-48 bg-white/20 rounded-xl"></div>
                <div className="h-6 w-96 bg-white/10 rounded-lg"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-48 bg-white/10 rounded-2xl"></div>
                  <div className="h-48 bg-white/10 rounded-2xl"></div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="h-64 bg-white/20 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    creative: {
      style: 'bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500',
      content: (
        <div className="h-full w-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-8">
          <div className="grid grid-cols-3 gap-8 h-full">
            <div className="space-y-4">
              <div className="h-40 bg-white/20 rounded-full"></div>
              <div className="h-4 w-3/4 bg-white/10 rounded-full"></div>
            </div>
            <div className="space-y-4 mt-12">
              <div className="h-40 bg-white/20 rounded-[3rem]"></div>
              <div className="h-4 w-3/4 bg-white/10 rounded-full"></div>
            </div>
            <div className="space-y-4 mt-24">
              <div className="h-40 bg-white/20 rounded-3xl"></div>
              <div className="h-4 w-3/4 bg-white/10 rounded-full"></div>
            </div>
          </div>
        </div>
      ),
    },
    tech: {
      style: 'bg-gray-900',
      content: (
        <div className="h-full w-full bg-gray-900 p-8 font-mono">
          <div className="space-y-6">
            <div className="flex space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="space-y-2">
              <div className="h-6 w-64 bg-emerald-500/20 rounded border border-emerald-500/30"></div>
              <div className="h-6 w-96 bg-emerald-500/10 rounded border border-emerald-500/20"></div>
              <div className="h-6 w-80 bg-emerald-500/10 rounded border border-emerald-500/20"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-32 bg-emerald-500/10 rounded-lg border border-emerald-500/20"></div>
                <div className="h-4 w-3/4 bg-emerald-500/20 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-32 bg-emerald-500/10 rounded-lg border border-emerald-500/20"></div>
                <div className="h-4 w-3/4 bg-emerald-500/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    portfolioplus: {
      style: 'bg-gradient-to-bl from-orange-500 to-red-600',
      content: (
        <div className="h-full w-full bg-gradient-to-bl from-orange-500 to-red-600 p-8">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4 space-y-4">
              <div className="h-48 bg-white/20 rounded-2xl transform -rotate-6"></div>
              <div className="h-4 w-3/4 bg-white/10 rounded-lg"></div>
            </div>
            <div className="col-span-4 space-y-4">
              <div className="h-48 bg-white/20 rounded-2xl"></div>
              <div className="h-4 w-3/4 bg-white/10 rounded-lg"></div>
            </div>
            <div className="col-span-4 space-y-4">
              <div className="h-48 bg-white/20 rounded-2xl transform rotate-6"></div>
              <div className="h-4 w-3/4 bg-white/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-center space-x-4">
          {Object.keys(templates).map((template) => (
            <button
              key={template}
              onClick={() => setCurrentTemplate(template)}
              className={`px-4 py-2 rounded-lg ${
                currentTemplate === template
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {template.charAt(0).toUpperCase() + template.slice(1)}
            </button>
          ))}
        </div>

        <motion.div
          key={currentTemplate}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl"
        >
          {templates[currentTemplate].content}
        </motion.div>

        <div className="text-center text-gray-600">
          <p>Take a screenshot of the template above to use as preview image</p>
          <p className="text-sm mt-2">
            Recommended: Use browser dev tools to set viewport to 1920x1080 before taking screenshot
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreviewGenerator;
