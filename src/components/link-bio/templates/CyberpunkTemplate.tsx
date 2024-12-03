'use client';

import { motion } from 'framer-motion';
import { LinkBioProfile } from '@/types/link-bio';
import { SocialIcon } from '../SocialIcon';
import Image from 'next/image';
import { ExternalLink, MapPin } from 'lucide-react';

interface CyberpunkTemplateProps {
  profile: LinkBioProfile;
}

export default function CyberpunkTemplate({ profile }: CyberpunkTemplateProps) {
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

  const glitchAnimation = {
    initial: { clipPath: 'inset(0 0 0 0)' },
    animate: {
      clipPath: [
        'inset(0 0 0 0)',
        'inset(100% 0 0 0)',
        'inset(50% 0 50% 0)',
        'inset(0 0 0 0)',
      ],
      transition: {
        duration: 1,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10" />
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-lg mx-auto space-y-8 relative"
      >
        {/* Profile Section */}
        <motion.div variants={item} className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-32 h-32 mx-auto mb-6"
          >
            {/* Glitch Effect Layers */}
            <motion.div
              className="absolute inset-0 bg-red-500/50"
              style={{ transform: 'translate(-2px, 2px)' }}
              variants={glitchAnimation}
              animate="animate"
              initial="initial"
            />
            <motion.div
              className="absolute inset-0 bg-blue-500/50"
              style={{ transform: 'translate(2px, -2px)' }}
              variants={glitchAnimation}
              animate="animate"
              initial="initial"
            />
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              className={`object-cover relative ${
                profile.customization.avatarStyle === 'circle'
                  ? 'rounded-full'
                  : profile.customization.avatarStyle === 'rounded'
                  ? 'rounded-xl'
                  : ''
              } border-4 border-neon-${profile.customization.primaryColor}`}
              style={{
                boxShadow: `0 0 20px ${profile.customization.primaryColor}`,
              }}
            />
          </motion.div>
          <div className="relative">
            <h1 className="text-4xl font-bold text-white mb-2 cyberpunk-text"
                style={{
                  textShadow: `0 0 10px ${profile.customization.primaryColor}, 0 0 20px ${profile.customization.secondaryColor}`,
                }}>
              {profile.name}
            </h1>
            <p className="text-white/80 font-mono">{profile.bio}</p>
          </div>
          
          {profile.location && (
            <motion.div
              variants={item}
              className="flex items-center justify-center mt-4 text-white/80 font-mono"
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
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-lg bg-black border-2 text-white relative overflow-hidden group"
              style={{
                borderColor: profile.customization.primaryColor,
                boxShadow: `0 0 10px ${profile.customization.primaryColor}`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-300" />
              <SocialIcon platform={social.platform} className="w-5 h-5 relative z-10" />
            </motion.a>
          ))}
        </motion.div>

        {/* Custom Links */}
        <motion.div variants={item} className="space-y-4">
          {profile.customLinks.map((link, index) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`block w-full p-4 bg-black border-2 relative group overflow-hidden ${
                profile.customization.buttonStyle === 'rounded'
                  ? 'rounded-lg'
                  : profile.customization.buttonStyle === 'pill'
                  ? 'rounded-full'
                  : ''
              }`}
              style={{
                borderColor: profile.customization.primaryColor,
                boxShadow: `0 0 10px ${profile.customization.primaryColor}`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-300" />
              <div className="flex items-center justify-between text-white relative z-10">
                <span className="font-mono font-medium">
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
