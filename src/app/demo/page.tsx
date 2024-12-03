'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2a] to-[#2a2a3a] text-gray-200">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Demo
          </h1>

          {/* Interactive Demo Section */}
          <div className="space-y-8">
            {/* Profile Preview */}
            <section className="bg-[#1a1a2a]/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-900/30">
              <h2 className="text-2xl font-semibold text-white mb-4">Profile Preview</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mx-auto md:mx-0" />
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
                    <span className="px-3 py-1 rounded-full bg-indigo-900/30 text-indigo-300 text-sm">React</span>
                    <span className="px-3 py-1 rounded-full bg-indigo-900/30 text-indigo-300 text-sm">TypeScript</span>
                    <span className="px-3 py-1 rounded-full bg-indigo-900/30 text-indigo-300 text-sm">Node.js</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Project Showcase */}
            <section className="bg-[#1a1a2a]/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-900/30">
              <h2 className="text-2xl font-semibold text-white mb-4">Featured Projects</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group relative overflow-hidden rounded-lg bg-[#2a2a3a] p-4 transition-all hover:scale-[1.02]">
                  <div className="h-48 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">E-Commerce Platform</h3>
                  <p className="text-gray-400 text-sm">A modern e-commerce solution built with Next.js and Stripe integration.</p>
                </div>
                <div className="group relative overflow-hidden rounded-lg bg-[#2a2a3a] p-4 transition-all hover:scale-[1.02]">
                  <div className="h-48 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">AI Chat Application</h3>
                  <p className="text-gray-400 text-sm">Real-time chat application powered by OpenAI's GPT-4 API.</p>
                </div>
              </div>
            </section>

            {/* Interactive Features */}
            <section className="bg-[#1a1a2a]/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-900/30">
              <h2 className="text-2xl font-semibold text-white mb-4">Interactive Features</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-[#2a2a3a] hover:bg-[#3a3a4a] transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-2">Live Preview</h3>
                  <p className="text-gray-400 text-sm">See your changes in real-time as you edit your portfolio.</p>
                </div>
                <div className="p-4 rounded-lg bg-[#2a2a3a] hover:bg-[#3a3a4a] transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-2">Custom Themes</h3>
                  <p className="text-gray-400 text-sm">Choose from various themes or create your own custom design.</p>
                </div>
                <div className="p-4 rounded-lg bg-[#2a2a3a] hover:bg-[#3a3a4a] transition-colors">
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
                  className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-xl
                           text-white bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950
                           transition-all duration-300 transform hover:scale-105 overflow-hidden
                           shadow-[0_0_20px_rgba(88,28,135,0.6)] hover:shadow-[0_0_35px_rgba(147,51,234,0.8)]
                           border border-purple-700/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-purple-600/50 to-purple-900/50 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                  <span className="relative">
                    Start Building Your Portfolio
                  </span>
                </motion.button>
              </Link>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
