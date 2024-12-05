'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { ArrowRight, Rocket, Star, Globe, Database, Palette, Github, Twitter, Mail, MessageSquare } from 'lucide-react';
import AnimatedLogo from '@/components/shared/AnimatedLogo';
import AnimatedIcon from '@/components/shared/AnimatedIcon';
import SocialIcon from '@/components/shared/SocialIcon';
import FooterIcon from '@/components/shared/FooterIcon';
import SuperAdminToggle from '@/components/shared/SuperAdminToggle';
import { MouseFollower, FloatingDots } from '@/components/BackgroundElements';
import { SpaceBackground } from '@/components/SpaceBackground';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen relative bg-black">
      <SpaceBackground />
      <main className="flex min-h-screen flex-col items-center justify-between relative overflow-hidden">
        <MouseFollower />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingDots />
        </div>

        {/* Left side decorative elements - only visible on larger screens */}
        <div className="hidden lg:block absolute left-0 top-0 w-96 h-screen pointer-events-none mix-blend-screen">
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, 10, 0],
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute left-10 top-20 w-32 h-32 rounded-full bg-gradient-to-r from-purple-600/10 to-purple-500/20 blur-2xl"
          />
          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, -15, 0],
              opacity: [0.5, 0.7, 0.5],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute left-20 top-60 w-40 h-40 rounded-xl bg-gradient-to-r from-purple-800/10 to-purple-600/20 blur-2xl"
          />
          <motion.div
            animate={{
              y: [0, 25, 0],
              x: [0, 20, 0],
              opacity: [0.4, 0.6, 0.4],
              rotateZ: [0, 10, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute left-0 top-[28rem] w-48 h-48 rounded-full bg-gradient-to-r from-purple-700/10 to-purple-500/20 blur-2xl"
          />
        </div>

        {/* Right side decorative elements - only visible on larger screens */}
        <div className="hidden lg:block absolute right-0 top-0 w-96 h-screen pointer-events-none mix-blend-screen">
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, -10, 0],
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute right-10 top-40 w-36 h-36 rounded-full bg-gradient-to-l from-purple-600/10 to-purple-500/20 blur-2xl"
          />
          <motion.div
            animate={{
              y: [0, 30, 0],
              x: [0, 15, 0],
              opacity: [0.5, 0.7, 0.5],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute right-20 top-80 w-44 h-44 rounded-xl bg-gradient-to-l from-purple-800/10 to-purple-600/20 blur-2xl"
          />
          <motion.div
            animate={{
              y: [0, -25, 0],
              x: [0, -20, 0],
              opacity: [0.4, 0.6, 0.4],
              rotateZ: [0, -10, 0]
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute right-0 top-[32rem] w-52 h-52 rounded-full bg-gradient-to-l from-purple-700/10 to-purple-500/20 blur-2xl"
          />
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-white"
          >
            <div className="mb-6">
              <AnimatedLogo />
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              Create a stunning portfolio that tells your unique story and highlights your skills
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Link 
                href="/auth/sign-in"
                className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full
                         text-white bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950
                         transition-all duration-300 transform hover:scale-105 overflow-hidden
                         shadow-[0_0_20px_rgba(88,28,135,0.6)] hover:shadow-[0_0_35px_rgba(147,51,234,0.8)]
                         border border-purple-700/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-purple-600/50 to-purple-900/50 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                <span className="relative flex items-center">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full
                         text-purple-300 bg-black/20 backdrop-blur-sm
                         border border-purple-500/20 hover:border-purple-400/40
                         transition-all duration-300 transform hover:scale-105
                         shadow-[0_0_15px_rgba(147,51,234,0.2)] hover:shadow-[0_0_25px_rgba(147,51,234,0.4)]"
              >
                View Demo <Rocket className="ml-2 w-5 h-5" />
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 mb-8 sm:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-900/60 p-4 sm:p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40
                           backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.02]
                           shadow-[0_0_15px_rgba(147,51,234,0.2)] hover:shadow-[0_0_25px_rgba(147,51,234,0.4)]"
              >
                <div className="text-purple-400 mb-3 sm:mb-4">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Professional Portfolio</h3>
                <p className="text-sm sm:text-base text-gray-300">
                  Create a stunning portfolio that showcases your work with beautiful layouts and animations
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900/60 p-4 sm:p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40
                           backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.02]
                           shadow-[0_0_15px_rgba(147,51,234,0.2)] hover:shadow-[0_0_25px_rgba(147,51,234,0.4)]"
              >
                <div className="text-purple-400 mb-3 sm:mb-4">
                  <Globe className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Global Reach</h3>
                <p className="text-sm sm:text-base text-gray-300">
                  Share your portfolio worldwide with custom domains and SEO optimization
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-900/60 p-4 sm:p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40
                           backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.02]
                           shadow-[0_0_15px_rgba(147,51,234,0.2)] hover:shadow-[0_0_25px_rgba(147,51,234,0.4)]
                           sm:col-span-2 lg:col-span-1 mx-auto w-full sm:max-w-md lg:max-w-none"
              >
                <div className="text-purple-400 mb-3 sm:mb-4">
                  <Palette className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Customizable Design</h3>
                <p className="text-sm sm:text-base text-gray-300">
                  Personalize your space with themes, colors, and layouts that match your style
                </p>
              </motion.div>
            </div>

            {/* Feature Icons Grid */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-12">
              <motion.div 
                className="bg-gray-900/60 p-4 rounded-xl hover:bg-gray-900/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatedIcon icon={ArrowRight} />
              </motion.div>
              <motion.div 
                className="bg-gray-900/60 p-4 rounded-xl hover:bg-gray-900/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatedIcon icon={Rocket} />
              </motion.div>
              <motion.div 
                className="bg-gray-900/60 p-4 rounded-xl hover:bg-gray-900/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatedIcon icon={Star} />
              </motion.div>
              <motion.div 
                className="bg-gray-900/60 p-4 rounded-xl hover:bg-gray-900/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatedIcon icon={Globe} />
              </motion.div>
              <motion.div 
                className="bg-gray-900/60 p-4 rounded-xl hover:bg-gray-900/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatedIcon icon={Database} />
              </motion.div>
              <motion.div 
                className="bg-gray-900/60 p-4 rounded-xl hover:bg-gray-900/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatedIcon icon={Palette} />
              </motion.div>
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href="#"
                className="group relative inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-br from-purple-900/40 via-purple-800/30 to-purple-900/40 hover:from-purple-800/50 hover:via-purple-700/40 hover:to-purple-800/50 border border-purple-500/20 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
              >
                <div className="mr-3">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-300/80">Download on the</div>
                  <div className="text-sm font-semibold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">App Store</div>
                </div>
              </Link>
              <Link
                href="#"
                className="group relative inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-br from-purple-900/40 via-purple-800/30 to-purple-900/40 hover:from-purple-800/50 hover:via-purple-700/40 hover:to-purple-800/50 border border-purple-500/20 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
              >
                <div className="mr-3">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-300/80">Get it on</div>
                  <div className="text-sm font-semibold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">Google Play</div>
                </div>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="w-full py-8 backdrop-blur-sm border-t border-purple-900/30 bg-black/40 z-20">
          <div className="container mx-auto px-6 relative">
            <div className="flex justify-center items-center space-x-8">
              <FooterIcon 
                Icon={Github}
                href="https://github.com"
                label="GitHub"
              />
              <FooterIcon 
                Icon={MessageSquare}
                href="https://discord.com"
                label="Discord"
              />
              <FooterIcon 
                Icon={Twitter}
                href="https://twitter.com"
                label="Twitter"
              />
              <FooterIcon 
                Icon={Mail}
                href="mailto:contact@devoshowcase.com"
                label="Email"
              />
            </div>
            <SuperAdminToggle />
          </div>
        </footer>
      </main>
    </div>
  );
}
