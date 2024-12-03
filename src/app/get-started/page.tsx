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

          {/* App Store and Google Play Store Buttons */}
          <div className="flex flex-col items-center space-y-6 mt-8 w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-[600px]">
              <Link 
                href="https://apps.apple.com/app/devshowcase/id1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center h-[40px] sm:h-[48px] md:h-[56px] w-[200px] sm:w-[220px] md:w-[240px]
                         bg-black rounded-lg hover:opacity-80 transition-opacity duration-200"
              >
                <div className="flex items-center space-x-3 mx-auto">
                  <svg className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.02.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11"/>
                  </svg>
                  <div className="flex flex-col -space-y-1">
                    <span className="text-white text-[8px] sm:text-[10px] md:text-[12px]">Download on the</span>
                    <span className="text-white text-[14px] sm:text-[16px] md:text-[18px] font-semibold">App Store</span>
                  </div>
                </div>
              </Link>

              <Link 
                href="https://play.google.com/store/apps/details?id=com.devshowcase.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center h-[40px] sm:h-[48px] md:h-[56px] w-[200px] sm:w-[220px] md:w-[240px]
                         bg-black rounded-lg hover:opacity-80 transition-opacity duration-200"
              >
                <div className="flex items-center space-x-3 mx-auto">
                  <svg className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]" viewBox="0 0 24 24">
                    <path d="M4.5 2.83l14.95 8.64-14.95 8.64v-17.28z" fill="#EA4335"/>
                    <path d="M4.5 2.83l14.95 8.64-3.68 2.12-11.27-6.49v-4.27z" fill="#FBBC04"/>
                    <path d="M19.45 11.47l-3.68 2.12-11.27 6.49v-4.27l14.95-8.64" fill="#34A853"/>
                    <path d="M19.45 11.47l-14.95 8.64v-17.28" fill="#4285F4"/>
                  </svg>
                  <div className="flex flex-col -space-y-1">
                    <span className="text-white text-[8px] sm:text-[10px] md:text-[12px]">GET IT ON</span>
                    <span className="text-white text-[14px] sm:text-[16px] md:text-[18px] font-semibold">Google Play</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

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
