'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Search, Filter, Star, ThumbsUp, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { SpaceBackground } from '@/components/SpaceBackground';
import { MouseFollower, FloatingDots } from '@/components/BackgroundElements';

export default function ExplorePage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sample featured developers (replace with real data later)
  const allDevelopers = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Full Stack Developer',
      skills: ['React', 'Node.js', 'TypeScript'],
      image: '/avatars/dev1.jpg',
      likes: 128
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'Frontend Engineer',
      skills: ['Vue.js', 'TailwindCSS', 'JavaScript'],
      image: '/avatars/dev2.jpg',
      likes: 95
    },
    {
      id: 3,
      name: 'Priya Patel',
      role: 'Backend Developer',
      skills: ['Python', 'Django', 'PostgreSQL'],
      image: '/avatars/dev3.jpg',
      likes: 156
    },
    {
      id: 4,
      name: 'Alex Thompson',
      role: 'Mobile Developer',
      skills: ['React Native', 'Swift', 'Kotlin'],
      image: '/avatars/dev4.jpg',
      likes: 112
    },
    {
      id: 5,
      name: 'Emma Wilson',
      role: 'UI/UX Developer',
      skills: ['Figma', 'React', 'TailwindCSS'],
      image: '/avatars/dev5.jpg',
      likes: 143
    },
    {
      id: 6,
      name: 'David Kim',
      role: 'DevOps Engineer',
      skills: ['Docker', 'Kubernetes', 'AWS'],
      image: '/avatars/dev6.jpg',
      likes: 167
    },
    {
      id: 7,
      name: 'Sophie Martin',
      role: 'Frontend Developer',
      skills: ['Angular', 'SCSS', 'TypeScript'],
      image: '/avatars/dev7.jpg',
      likes: 89
    },
    {
      id: 8,
      name: 'James Wilson',
      role: 'Full Stack Developer',
      skills: ['Next.js', 'MongoDB', 'GraphQL'],
      image: '/avatars/dev8.jpg',
      likes: 134
    },
    {
      id: 9,
      name: 'Lisa Anderson',
      role: 'Cloud Architect',
      skills: ['AWS', 'Terraform', 'Python'],
      image: '/avatars/dev9.jpg',
      likes: 178
    }
  ];

  const totalPages = Math.ceil(allDevelopers.length / itemsPerPage);
  const currentDevelopers = allDevelopers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-black via-purple-950/5 to-black">
      <SpaceBackground />
      <main className="flex min-h-screen flex-col relative overflow-hidden">
        <MouseFollower />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingDots />
        </div>

        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-black to-purple-950/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/10 via-transparent to-transparent pointer-events-none mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-800/5 via-transparent to-transparent pointer-events-none mix-blend-screen" />

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          
          {/* Hero Section */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <motion.h1 
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-gray-100 via-purple-100 to-purple-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.2)] [text-shadow:_0_1px_20px_rgb(168_85_247_/_20%)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Explore Developer Portfolios
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl text-gray-300 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Discover talented developers and get inspired by their work
              </motion.p>

              {/* Search Bar */}
              <motion.div
                className="flex gap-4 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search developers..."
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-500/20 rounded-xl focus:outline-none focus:border-purple-500/40 text-white placeholder-gray-400 transition-colors"
                  />
                </div>
                <button className="px-6 py-3 bg-white/5 border border-purple-500/20 rounded-xl text-white hover:bg-white/10 transition-colors flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </button>
              </motion.div>
            </div>

            {/* Developer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentDevelopers.map((developer, index) => (
                <motion.div
                  key={developer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-colors border border-purple-500/10"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-purple-500/20 overflow-hidden">
                        {/* Avatar placeholder */}
                        <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-purple-700/30" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white/90">{developer.name}</h3>
                        <p className="text-gray-300/80">{developer.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {developer.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 text-sm bg-purple-500/10 text-purple-300/90 rounded-full border border-purple-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-300/80">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{developer.likes}</span>
                      </div>
                      <Link
                        href={`/portfolio/${developer.id}`}
                        className="px-4 py-2 bg-purple-500/10 text-purple-300/90 rounded-full hover:bg-purple-500/20 transition-colors text-sm border border-purple-500/20"
                      >
                        View Portfolio
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                      currentPage === index + 1
                        ? 'bg-purple-500/20 border-purple-500/40 text-white'
                        : 'border-purple-500/20 text-gray-400 hover:bg-purple-500/10'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
