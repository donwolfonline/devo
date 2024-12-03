'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code, Palette, Layout, Smartphone, Share, Globe } from 'lucide-react';
import Link from 'next/link';
import { MouseFollower, FloatingDots } from '@/components/BackgroundElements';
import { SpaceBackground } from '@/components/SpaceBackground';

const templates = [
  {
    id: 1,
    name: "Developer Classic",
    description: "Clean and professional template perfect for developers",
    image: "/templates/dev-classic.png",
    features: ["Custom colors", "Social links", "Project showcase", "Skills section"],
    category: "Professional"
  },
  {
    id: 2,
    name: "Portfolio Plus",
    description: "Modern and interactive portfolio with animations",
    image: "/templates/portfolio-plus.png",
    features: ["Animations", "Dark/Light mode", "Blog section", "Contact form"],
    category: "Creative"
  },
  {
    id: 3,
    name: "Minimal Dev",
    description: "Minimalist design focusing on content",
    image: "/templates/minimal-dev.png",
    features: ["Minimalist UI", "Fast loading", "SEO optimized", "Mobile first"],
    category: "Minimal"
  }
];

const features = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "Custom Code",
    description: "Add your own custom code and styling"
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Themes",
    description: "Choose from multiple themes or create your own"
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Layouts",
    description: "Flexible layouts to showcase your content"
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile First",
    description: "Optimized for all devices and screen sizes"
  },
  {
    icon: <Share className="w-6 h-6" />,
    title: "Social Integration",
    description: "Connect all your social media profiles"
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Custom Domain",
    description: "Use your own domain name"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function LinkInBio() {
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
          {/* Hero Section */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300 mb-6">
                Link in Bio Templates
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300/90 mb-8">
                Create a stunning link in bio page that matches your style and showcases your work.
              </p>
              <Link 
                href="/templates"
                className="inline-flex items-center px-8 py-3 rounded-full border border-purple-500/20 text-white hover:bg-purple-500/10 transition-colors text-lg"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </section>

          {/* Templates Grid */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  variants={itemVariants}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-colors border border-purple-500/10"
                >
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-purple-700/20" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white/90 mb-2">{template.name}</h3>
                    <p className="text-gray-300/80 mb-4">{template.description}</p>
                    <div className="space-y-2">
                      {template.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-300/80">
                          <ArrowRight className="w-4 h-4 mr-2 text-purple-400/90" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <span className="inline-block px-3 py-1 text-sm bg-purple-500/10 text-purple-300/90 rounded-full border border-purple-500/20">
                        {template.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Features Grid */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12">
              Powerful Features
            </h2>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  <div className="text-purple-500 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                Ready to Create Your Link in Bio?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Choose from our beautiful templates and start customizing your page today.
              </p>
              <Link 
                href="/templates"
                className="inline-flex items-center px-8 py-3 rounded-full border border-purple-500/20 text-white hover:bg-purple-500/10 transition-colors text-lg"
              >
                Browse Templates <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
}
