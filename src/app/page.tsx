'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const features = [
  {
    title: 'Modern Templates',
    description: 'Choose from our collection of professionally designed, responsive portfolio templates.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: 'Interactive Customization',
    description: 'Customize every aspect of your portfolio with our intuitive interface.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: 'Code Integration',
    description: 'Seamlessly import and showcase your projects from GitHub and other platforms.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_49%,rgba(99,102,241,0.05)_49%,rgba(99,102,241,0.05)_51%,transparent_51%,transparent_100%)] bg-[length:100px_100%]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_97%,rgba(99,102,241,0.1)_97%,rgba(99,102,241,0.1)_100%)] bg-[length:100%_8px]"></div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center"
        >
          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            Build Your Developer
            <br />
            Portfolio in Minutes
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Create a stunning portfolio that showcases your skills and projects.
            Choose from modern templates, customize every detail, and deploy instantly.
          </motion.p>
          <motion.div
            variants={item}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/get-started"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-medium transition-colors duration-200"
            >
              Get Started
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-lg font-medium transition-colors duration-200"
            >
              View Templates
            </Link>
          </motion.div>
        </motion.div>

        {/* Code Preview */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="relative max-w-5xl mx-auto mt-20 px-4"
        >
          <div className="relative rounded-xl bg-gray-900 shadow-2xl overflow-hidden">
            <div className="flex items-center space-x-1.5 absolute top-0 left-0 right-0 h-8 px-4 bg-gray-800">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
            <div className="pt-8 p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                <code>{`import { motion } from 'framer-motion';

export default function Portfolio() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="portfolio"
    >
      <h1>Welcome to My Portfolio</h1>
      // Your amazing projects here
    </motion.div>
  );
}`}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.h2
            variants={item}
            className="text-3xl font-bold text-center mb-12 text-white"
          >
            Everything you need to showcase your work
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={item}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative p-6 bg-gray-900 rounded-lg">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to build your portfolio?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of developers who have already created their professional portfolios with DevShowcase.
          </p>
          <Link
            href="/get-started"
            className="inline-flex items-center px-8 py-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-medium transition-colors duration-200"
          >
            Get Started Now
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
