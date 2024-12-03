'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  CodeIcon, 
  RocketIcon, 
  StarIcon,
  GlobeIcon,
  DatabaseIcon,
  PaletteIcon,
  UsersIcon,
  LogInIcon,
  LogOutIcon,
} from 'lucide-react';
import { signIn, signOut } from 'next-auth/react';
import { SessionProvider, useSession } from 'next-auth/react';
import { Session } from 'next-auth';

interface HomePageProps {
  initialSession: Session | null;
}

function HomePageContent() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2a] to-[#2a2a3a] text-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)] opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Left Column - Hero Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-blue-500">Dev</span>
            <span className="text-white">Showcase</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-xl">
            Transform your developer portfolio into a stunning, interactive digital experience. Showcase your projects, skills, and creativity with a professional, customizable platform.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {!session ? (
              <>
                <Link 
                  href="/auth/sign-in"
                  className="flex items-center space-x-2 px-6 py-3 rounded-full border border-purple-600 text-white hover:bg-purple-600/10 transition-colors"
                >
                  <LogInIcon className="w-5 h-5" />
                  <span>Get Started</span>
                </Link>
                <Link 
                  href="/templates" 
                  className="flex items-center space-x-2 px-6 py-3 rounded-full border border-purple-600 text-white hover:bg-purple-600/10 transition-colors"
                >
                  <RocketIcon className="w-5 h-5" />
                  <span>Explore Templates</span>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/dashboard"
                  className="flex items-center space-x-2 px-6 py-3 rounded-full border border-purple-600 text-white hover:bg-purple-600/10 transition-colors"
                >
                  <UsersIcon className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 px-6 py-3 rounded-full border border-red-600 text-white hover:bg-red-600/10 transition-colors"
                >
                  <LogOutIcon className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Right Column - Hero Illustration */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="bg-[#2a2a3a] rounded-2xl p-8 shadow-2xl border border-indigo-900/30">
            <div className="grid grid-cols-3 gap-4">
              {[CodeIcon, RocketIcon, StarIcon, GlobeIcon, DatabaseIcon, PaletteIcon].map((Icon, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-[#1a1a2a] p-4 rounded-xl flex items-center justify-center"
                >
                  <Icon className="w-10 h-10 text-indigo-400 opacity-80" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
            Why DevShowcase?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Elevate your professional presence with a cutting-edge portfolio platform designed specifically for developers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: CodeIcon, 
              title: "Project Showcase", 
              description: "Highlight your best work with interactive, customizable project displays." 
            },
            { 
              icon: UsersIcon, 
              title: "Professional Networking", 
              description: "Connect with peers, recruiters, and potential collaborators." 
            },
            { 
              icon: StarIcon, 
              title: "Skill Visualization", 
              description: "Create dynamic skill charts and technology timelines." 
            }
          ].map(({ icon: Icon, title, description }, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-[#1a1a2a] p-8 rounded-2xl border border-indigo-900/30 hover:border-indigo-600/50 transition-all"
            >
              <div className="mb-6 flex items-center justify-center w-16 h-16 bg-indigo-600/20 rounded-full">
                <Icon className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
              <p className="text-gray-300">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12"
        >
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Showcase Your Developer Journey?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Join DevShowcase and transform your professional portfolio into an interactive, memorable experience.
          </p>
          <div className="flex justify-center space-x-4">
            {!session ? (
              <>
                <Link 
                  href="/auth/sign-in"
                  className="flex items-center space-x-2 px-8 py-4 rounded-full border border-purple-600 text-white hover:bg-purple-600/10 transition-colors"
                >
                  <LogInIcon className="w-6 h-6" />
                  <span>Get Started</span>
                </Link>
                <Link 
                  href="/templates" 
                  className="flex items-center space-x-2 px-8 py-4 rounded-full border border-purple-600 text-white hover:bg-purple-600/10 transition-colors"
                >
                  <RocketIcon className="w-6 h-6" />
                  <span>Explore Templates</span>
                </Link>
              </>
            ) : (
              <Link 
                href="/dashboard" 
                className="flex items-center space-x-2 px-8 py-4 rounded-full border border-purple-600 text-white hover:bg-purple-600/10 transition-colors"
              >
                <UsersIcon className="w-6 h-6" />
                <span>Go to Dashboard</span>
              </Link>
            )}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a2a] py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            2024 DevShowcase. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function HomePage({ initialSession }: HomePageProps) {
  return (
    <SessionProvider session={initialSession}>
      <HomePageContent />
    </SessionProvider>
  );
}
