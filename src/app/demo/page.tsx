'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MouseFollower, FloatingDots } from '@/components/BackgroundElements';
import { SpaceBackground } from '@/components/SpaceBackground';

export default function DemoPage() {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-black via-purple-950/5 to-black">
      <SpaceBackground />
      <main className="relative overflow-hidden">
        <MouseFollower />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingDots />
        </div>

        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-black to-purple-950/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/10 via-transparent to-transparent pointer-events-none mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-800/5 via-transparent to-transparent pointer-events-none mix-blend-screen" />

        <div className="container mx-auto px-4 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-8">
              Demo
            </h1>

            {/* Interactive Demo Section */}
            <div className="space-y-8">
              {/* Profile Preview */}
              <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <h2 className="text-2xl font-semibold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-4">Profile Preview</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 mx-auto md:mx-0" />
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-semibold text-white">John Developer</h3>
                      <p className="text-gray-400">Full Stack Engineer</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300">
                      Passionate developer with 5+ years of experience in building scalable web applications.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-purple-900/30 text-purple-300 text-sm">React</span>
                      <span className="px-3 py-1 rounded-full bg-purple-900/30 text-purple-300 text-sm">TypeScript</span>
                      <span className="px-3 py-1 rounded-full bg-purple-900/30 text-purple-300 text-sm">Node.js</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Project Showcase */}
              <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <h2 className="text-2xl font-semibold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-4">Featured Projects</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group relative overflow-hidden rounded-lg bg-white/5 p-4 transition-all hover:scale-[1.02] border border-purple-500/10">
                    <div className="h-48 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">E-Commerce Platform</h3>
                    <p className="text-gray-400 text-sm">A modern e-commerce solution built with Next.js and Stripe integration.</p>
                  </div>
                  <div className="group relative overflow-hidden rounded-lg bg-white/5 p-4 transition-all hover:scale-[1.02] border border-purple-500/10">
                    <div className="h-48 rounded-lg bg-gradient-to-br from-purple-600/20 to-purple-500/20 mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">AI Chat Application</h3>
                    <p className="text-gray-400 text-sm">Real-time chat application powered by OpenAI's GPT-4 API.</p>
                  </div>
                </div>
              </section>

              {/* Interactive Features */}
              <section className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <h2 className="text-2xl font-semibold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-4">Interactive Features</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-purple-500/10">
                    <h3 className="text-lg font-semibold text-white mb-2">Live Preview</h3>
                    <p className="text-gray-400 text-sm">See your changes in real-time as you edit your portfolio.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-purple-500/10">
                    <h3 className="text-lg font-semibold text-white mb-2">Custom Themes</h3>
                    <p className="text-gray-400 text-sm">Choose from various themes or create your own custom design.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-purple-500/10">
                    <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
                    <p className="text-gray-400 text-sm">Track visitor engagement and portfolio performance.</p>
                  </div>
                </div>
              </section>

              {/* Call to Action */}
              <section className="text-center">
                <Link href="/auth/sign-up">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-900/90 to-purple-800/90 text-white font-medium
                             hover:from-purple-800/90 hover:to-purple-700/90 transition-all duration-200
                             focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
