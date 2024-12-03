'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Search, Filter, Star, ThumbsUp, Loader2 } from 'lucide-react';
import { useState } from 'react';

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

  const [displayedDevelopers, setDisplayedDevelopers] = useState(allDevelopers.slice(0, itemsPerPage));
  const [searchTerm, setSearchTerm] = useState('');
  const [hasMore, setHasMore] = useState(allDevelopers.length > itemsPerPage);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const nextItems = allDevelopers.slice(
        displayedDevelopers.length,
        displayedDevelopers.length + itemsPerPage
      );
      setDisplayedDevelopers([...displayedDevelopers, ...nextItems]);
      setHasMore(displayedDevelopers.length + nextItems.length < allDevelopers.length);
      setIsLoading(false);
    }, 800); // Simulate loading delay
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setDisplayedDevelopers(allDevelopers.slice(0, itemsPerPage));
      setHasMore(allDevelopers.length > itemsPerPage);
    } else {
      const filtered = allDevelopers.filter(dev => 
        dev.name.toLowerCase().includes(term) ||
        dev.role.toLowerCase().includes(term) ||
        dev.skills.some(skill => skill.toLowerCase().includes(term))
      );
      setDisplayedDevelopers(filtered.slice(0, itemsPerPage));
      setHasMore(filtered.length > itemsPerPage);
    }
  };

  return (
    <main className="min-h-screen bg-black">
      <div className="relative">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#9333EA]/10 via-[#A855F7]/5 to-transparent pointer-events-none" />

        {/* Main Content */}
        <div className="relative">
          <Navbar />

          <div className="container mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Explore Amazing Portfolios
              </h1>
              <p className="text-xl text-gray-300 mb-12">
                Discover talented developers and get inspired by their work
              </p>

              {/* Search and Filter Section */}
              <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search developers..."
                    className="w-full md:w-96 px-4 py-2 pl-10 bg-black/50 border border-[#9333EA]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9333EA] focus:border-transparent"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>
                <button className="px-6 py-2 bg-black/50 border border-[#9333EA]/20 rounded-lg text-white hover:bg-[#9333EA]/10 focus:outline-none focus:ring-2 focus:ring-[#9333EA] transition-colors duration-200">
                  <Filter className="inline-block w-5 h-5 mr-2" />
                  Filter
                </button>
              </div>

              {/* Featured Developers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedDevelopers.map((dev, index) => (
                  <motion.div
                    key={dev.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/50 border border-[#9333EA]/20 rounded-lg p-6 hover:border-[#9333EA]/40 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center">
                          <span className="text-2xl font-bold text-purple-400">
                            {dev.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{dev.name}</h3>
                          <p className="text-gray-400">{dev.role}</p>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        className="text-purple-400 hover:text-purple-300"
                        aria-label="Favorite developer"
                      >
                        <Star className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {dev.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center mt-4 space-x-4">
                      <button className="flex items-center space-x-1 text-gray-400 hover:text-purple-400 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{dev.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-400 hover:text-purple-400 transition-colors">
                        <Star className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                    </div>

                    <Link
                      href={`/profile/${dev.id}`}
                      className="mt-4 inline-block px-6 py-2 w-full text-center bg-black border-2 border-[#9333EA] rounded-full text-white hover:bg-[#9333EA]/10 focus:outline-none focus:ring-2 focus:ring-[#9333EA] transition-colors duration-200"
                    >
                      View Profile
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12">
                  {isLoading ? (
                    <button
                      disabled
                      className="mt-8 px-6 py-2 bg-black border-2 border-[#9333EA]/50 rounded-full text-white opacity-50 cursor-not-allowed"
                    >
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </button>
                  ) : (
                    <button
                      onClick={loadMore}
                      className="mt-8 px-6 py-2 bg-black border-2 border-[#9333EA] rounded-full text-white hover:bg-[#9333EA]/10 focus:outline-none focus:ring-2 focus:ring-[#9333EA] transition-colors duration-200"
                    >
                      Load More
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
