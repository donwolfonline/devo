'use client';

import { motion } from 'framer-motion';
import { LinkBioProfile } from '@/types/link-bio';
import { SocialIcon } from '../SocialIcon';
import Image from 'next/image';
import { ExternalLink, MapPin } from 'lucide-react';

interface GlassTemplateProps {
  profile: LinkBioProfile;
}

export default function GlassTemplate({ profile }: GlassTemplateProps) {
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
    <div 
      className="min-h-screen py-12 px-4 relative overflow-hidden"
      style={{
        backgroundColor: profile.customization.backgroundColor
      }}
    >
      {/* Gradient Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-lg mx-auto space-y-8"
      >
        {/* Glass Card */}
        <motion.div
          variants={item}
          className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-xl border border-white/20"
        >
          {/* Profile Section */}
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-32 h-32 mx-auto mb-6"
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
                } border-4 border-white/20`}
              />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {profile.name}
            </h1>
            <p className="text-white/80">{profile.bio}</p>
            
            {profile.location && (
              <motion.div
                variants={item}
                className="flex items-center justify-center mt-4 text-white/80"
              >
                <MapPin className="w-4 h-4 mr-2" />
                <span>{profile.location.address}</span>
              </motion.div>
            )}
          </div>

          {/* Social Links */}
          <motion.div
            variants={item}
            className="flex justify-center space-x-4 mt-6"
          >
            {profile.socialLinks.map((social) => (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              >
                <SocialIcon platform={social.platform} className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Custom Links */}
        <motion.div variants={item} className="space-y-4">
          {profile.customLinks.map((link) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              whileTap={{ scale: 0.98 }}
              className={`block w-full p-4 ${
                profile.customization.buttonStyle === 'rounded'
                  ? 'rounded-lg'
                  : profile.customization.buttonStyle === 'pill'
                  ? 'rounded-full'
                  : ''
              } backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all`}
            >
              <div className="flex items-center justify-between text-white">
                <span className="font-medium">
                  {link.title}
                </span>
                <ExternalLink className="w-4 h-4 opacity-75" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
