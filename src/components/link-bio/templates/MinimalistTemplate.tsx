'use client';

import { motion } from 'framer-motion';
import { LinkBioProfile } from '@/types/link-bio';
import { SocialIcon } from '../SocialIcon';
import Image from 'next/image';
import { ExternalLink, MapPin } from 'lucide-react';

interface MinimalistTemplateProps {
  profile: LinkBioProfile;
}

export default function MinimalistTemplate({ profile }: MinimalistTemplateProps) {
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
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12 px-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-lg mx-auto space-y-12"
      >
        {/* Profile Section */}
        <motion.div variants={item} className="text-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative w-24 h-24 mx-auto mb-8"
          >
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              className="object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
          <h1 className="text-2xl font-light tracking-wide text-gray-900 dark:text-gray-100 mb-3">
            {profile.name}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
            {profile.bio}
          </p>
          
          {profile.location && (
            <motion.div
              variants={item}
              className="flex items-center justify-center mt-4 text-gray-600 dark:text-gray-400"
            >
              <MapPin className="w-3 h-3 mr-1" />
              <span className="text-sm">{profile.location.address}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={item}
          className="flex justify-center space-x-6"
        >
          {profile.socialLinks.map((social) => (
            <motion.a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <SocialIcon platform={social.platform} className="w-4 h-4" />
            </motion.a>
          ))}
        </motion.div>

        {/* Custom Links */}
        <motion.div variants={item} className="space-y-3">
          {profile.customLinks.map((link) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 2 }}
              className="flex items-center justify-between py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors border-b border-gray-100 dark:border-gray-800"
            >
              <span className="text-sm">
                {link.title}
              </span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div variants={item} className="pt-8 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
