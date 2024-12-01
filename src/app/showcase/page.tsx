'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const showcaseItems = [
  {
    id: 1,
    name: 'Alex Rivera',
    role: 'Full Stack Developer',
    description: 'Interactive portfolio with 3D elements and WebGL animations',
    image: '/showcase/portfolio1.jpg',
    color: 'from-blue-500 to-purple-600',
    link: '/templates/modern',
    tags: ['React', 'Three.js', 'WebGL', 'GSAP'],
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'UI/UX Engineer',
    description: 'Minimalist design with smooth micro-interactions',
    image: '/showcase/portfolio2.jpg',
    color: 'from-emerald-500 to-teal-600',
    link: '/templates/minimal',
    tags: ['Vue.js', 'Framer Motion', 'Tailwind CSS'],
  },
  {
    id: 3,
    name: 'Marcus Thompson',
    role: 'Creative Developer',
    description: 'Creative portfolio with unique scroll experiences',
    image: '/showcase/portfolio3.jpg',
    color: 'from-orange-500 to-pink-600',
    link: '/templates/creative',
    tags: ['Next.js', 'GSAP', 'Canvas'],
  },
  {
    id: 4,
    name: 'Emma Rodriguez',
    role: 'Frontend Architect',
    description: 'Tech-focused portfolio with terminal-style interface',
    image: '/showcase/portfolio4.jpg',
    color: 'from-cyan-500 to-blue-600',
    link: '/templates/tech',
    tags: ['TypeScript', 'React', 'Animations'],
  },
  {
    id: 5,
    name: 'David Kim',
    role: 'Game Developer',
    description: 'Interactive game-inspired portfolio experience',
    image: '/showcase/portfolio5.jpg',
    color: 'from-purple-500 to-indigo-600',
    link: '/templates/creative',
    tags: ['Unity', 'WebGL', '3D Graphics'],
  },
  {
    id: 6,
    name: 'Lisa Wang',
    role: 'Design Engineer',
    description: 'Clean, typography-focused portfolio with subtle animations',
    image: '/showcase/portfolio6.jpg',
    color: 'from-rose-500 to-orange-600',
    link: '/templates/minimal',
    tags: ['Design Systems', 'Motion', 'Typography'],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gray-900 py-24 sm:py-32"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 opacity-90" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
            >
              Portfolio Showcase
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-lg leading-8 text-gray-300"
            >
              Get inspired by our collection of stunning developer portfolios.
              Each showcase demonstrates unique styles and creative approaches.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Showcase Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {showcaseItems.map((item) => (
            <motion.div
              key={item.id}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl"
            >
              <Link href={item.link} className="block">
                <div className="relative h-64 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {item.role}
                  </p>
                  <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1 text-xs font-medium text-gray-800 dark:text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-purple-800 to-indigo-900 py-16"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to create your own portfolio?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Choose from our collection of templates and customize them to match your style.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/templates"
              className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-purple-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
