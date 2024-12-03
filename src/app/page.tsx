'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { ArrowRight, Rocket, Star, Globe, Database, Palette, Github, Twitter, Mail, MessageSquare } from 'lucide-react';
import AnimatedLogo from '@/components/shared/AnimatedLogo';
import AnimatedIcon from '@/components/shared/AnimatedIcon';
import SocialIcon from '@/components/shared/SocialIcon';
import FooterIcon from '@/components/shared/FooterIcon';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#" 
              className="bg-black text-white px-8 py-4 rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-900 transition-all"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div>
                <div className="text-xs">Download on the</div>
                <div className="text-xl font-semibold">App Store</div>
              </div>
            </a>
            <a 
              href="#" 
              className="bg-black text-white px-8 py-4 rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-900 transition-all"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div>
                <div className="text-xs">GET IT ON</div>
                <div className="text-xl font-semibold">Google Play</div>
              </div>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer with Social Icons */}
      <footer className="absolute bottom-0 left-0 right-0 py-8 bg-[#0A0118]/80 backdrop-blur-sm border-t border-purple-900/30">
        <div className="container mx-auto px-6">
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
        </div>
      </footer>
    </div>
  );
}
