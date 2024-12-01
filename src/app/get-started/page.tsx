'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const features = [
  {
    title: 'Choose a Template',
    description: 'Browse our collection of modern, responsive portfolio templates designed specifically for developers.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: 'Customize Your Site',
    description: 'Personalize your portfolio with your projects, skills, and experience. Our intuitive editor makes it easy.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
  {
    title: 'Deploy & Share',
    description: 'Launch your portfolio with one click. Get a custom domain and share your work with the world.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
];

export default function GetStarted() {
  const [selectedFeature, setSelectedFeature] = useState(0);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Create Your Developer Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-muted max-w-3xl mx-auto mb-10"
          >
            Build a stunning portfolio website in minutes. Show off your skills, projects, and experience with our modern templates.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/templates"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent hover:bg-accent/90 text-white font-medium transition-colors duration-200"
            >
              Browse Templates
            </Link>
            <Link
              href="/showcase"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground font-medium transition-colors duration-200"
            >
              View Examples
            </Link>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 3) }}
              onMouseEnter={() => setSelectedFeature(index)}
              className={`p-6 rounded-2xl transition-colors duration-200 ${
                selectedFeature === index
                  ? 'bg-accent/10 border border-accent/20'
                  : 'bg-foreground/5 border border-foreground/10 hover:bg-foreground/10'
              }`}
            >
              <div className={`p-3 rounded-lg inline-block ${
                selectedFeature === index ? 'bg-accent/20' : 'bg-foreground/10'
              }`}>
                <div className={`${selectedFeature === index ? 'text-accent' : 'text-foreground'}`}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
              <p className="text-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-gradient-to-r from-accent/10 to-secondary/10 rounded-2xl p-8 sm:p-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Build Your Portfolio?</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
            Join thousands of developers who have already created their professional portfolios with DevShowcase.
          </p>
          <Link
            href="/templates"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-accent hover:bg-accent/90 text-white font-medium transition-colors duration-200"
          >
            Get Started Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
