'use client';

import { motion } from 'framer-motion';
import { Code, Palette, Layout, Share2, Shield, Zap } from 'lucide-react';

const features = [
  {
    title: 'Custom Domain Support',
    description: 'Connect your own domain to your portfolio for a professional presence.',
    icon: Share2,
  },
  {
    title: 'Modern Templates',
    description: 'Choose from a variety of professionally designed templates to showcase your work.',
    icon: Layout,
  },
  {
    title: 'Code Highlighting',
    description: 'Share your code snippets with syntax highlighting for better readability.',
    icon: Code,
  },
  {
    title: 'Theme Customization',
    description: 'Personalize your portfolio with custom colors and themes.',
    icon: Palette,
  },
  {
    title: 'Fast Performance',
    description: 'Built with Next.js for optimal loading speed and SEO.',
    icon: Zap,
  },
  {
    title: 'Secure Authentication',
    description: 'Your portfolio is protected with industry-standard security.',
    icon: Shield,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl mb-6">
            Powerful Features for Developers
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create a stunning portfolio and showcase your work to the world.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200" />
              <div className="relative p-6 bg-card rounded-lg border border-border">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Ready to create your portfolio?
          </h2>
          <a
            href="/templates"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get Started
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
