import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Globe, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface SocialLink {
  platform: string;
  url: string;
  icon: any;
  color: string;
}

interface LinkInBioProps {
  links: SocialLink[];
  customLinks?: {
    title: string;
    url: string;
    description?: string;
  }[];
}

const defaultSocialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    url: '#',
    icon: Github,
    color: 'hover:bg-gray-800'
  },
  {
    platform: 'Twitter',
    url: '#',
    icon: Twitter,
    color: 'hover:bg-blue-600'
  },
  {
    platform: 'LinkedIn',
    url: '#',
    icon: Linkedin,
    color: 'hover:bg-blue-700'
  },
  {
    platform: 'Website',
    url: '#',
    icon: Globe,
    color: 'hover:bg-green-600'
  },
  {
    platform: 'Email',
    url: 'mailto:example@email.com',
    icon: Mail,
    color: 'hover:bg-red-600'
  }
];

export default function LinkInBio({ links = defaultSocialLinks, customLinks = [] }: LinkInBioProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-12 px-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto space-y-8"
      >
        {/* Social Links */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-5 gap-4"
          variants={container}
        >
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-purple-500/10 ${link.color} transition-all duration-300`}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Custom Links */}
        {customLinks.length > 0 && (
          <motion.div 
            className="space-y-4"
            variants={container}
          >
            {customLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={item}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/20 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200">
                      {link.title}
                    </h3>
                    {link.description && (
                      <p className="text-sm text-gray-400 mt-1">
                        {link.description}
                      </p>
                    )}
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
