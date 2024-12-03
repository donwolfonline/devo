'use client';

import { motion } from 'framer-motion';
import { LinkBioProfile } from '@/types/link-bio';
import { SocialIcon } from '../SocialIcon';
import Image from 'next/image';
import { ExternalLink, MapPin } from 'lucide-react';

interface MinimalTemplateProps {
  profile: LinkBioProfile;
}

export default function MinimalTemplate({ profile }: MinimalTemplateProps) {
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
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-lg mx-auto space-y-8"
      >
        {/* Profile Section */}
        <motion.div variants={item} className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-24 h-24 mx-auto mb-4"
          >
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              className={`object-cover ${
                profile.customization.avatarStyle === 'circle'
                  ? 'rounded-full'
                  : profile.customization.avatarStyle === 'rounded'
                  ? 'rounded-xl'
                  : ''
              }`}
            />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {profile.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{profile.bio}</p>
          
          {profile.location && (
            <motion.div
              variants={item}
              className="flex items-center justify-center mt-4 text-gray-600 dark:text-gray-400"
            >
              <MapPin className="w-4 h-4 mr-2" />
              <span>{profile.location.address}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={item}
          className="flex justify-center space-x-4"
        >
          {profile.socialLinks.map((social) => (
            <motion.a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <SocialIcon platform={social.platform} className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Custom Links */}
        <motion.div variants={item} className="space-y-4">
          {profile.customLinks.map((link) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`block w-full p-4 ${
                profile.customization.buttonStyle === 'rounded'
                  ? 'rounded-lg'
                  : profile.customization.buttonStyle === 'pill'
                  ? 'rounded-full'
                  : ''
              } bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all`}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-900 dark:text-white font-medium">
                  {link.title}
                </span>
                <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
