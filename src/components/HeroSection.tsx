'use client';

import { motion } from 'framer-motion';

const codeLines = [
  '<div className="portfolio">',
  '  <YourStory />',
  '  <YourProjects />',
  '  <YourImpact />',
  '</div>'
];

export default function HeroSection() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30" />
      
      {/* Animated circles */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-200/20 dark:bg-blue-500/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute right-0 w-96 h-96 rounded-full bg-green-200/20 dark:bg-green-500/10 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 text-center px-4">
        {/* Main heading with typing effect */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-500 dark:from-blue-400 dark:to-green-400 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to DevShowcase
        </motion.h1>

        {/* Animated code block */}
        <motion.div
          className="mb-8 inline-block text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-gray-900 dark:bg-gray-800/50 rounded-lg p-4 font-mono text-sm text-green-400 shadow-xl">
            {codeLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="whitespace-pre"
              >
                {line}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Create your developer portfolio in minutes, not hours.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <button className="px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl">
            Get Started
          </button>
        </motion.div>
      </div>

      {/* Tech stack icons floating animation */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {['⚛️', '🔷', '🟩', '⚡️', '🎨'].map((emoji, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [-20, -100],
              x: Math.sin(index) * 50,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.8,
              ease: "easeOut"
            }}
            style={{
              left: `${20 + index * 15}%`,
              top: '60%',
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
