'use client';

import { motion } from 'framer-motion';
import { LinkBioProfile } from '@/types/link-bio';
import { SocialIcon } from '../SocialIcon';
import Image from 'next/image';
import { ExternalLink, MapPin } from 'lucide-react';
import { useEffect } from 'react';

interface GradientTemplateProps {
  profile: LinkBioProfile;
}

const DEFAULT_AVATAR = 'https://avatars.githubusercontent.com/u/0?v=4';

export default function GradientTemplate({ profile }: GradientTemplateProps) {
  useEffect(() => {
    console.log('GradientTemplate mounted with profile:', profile);
    return () => {
      console.log('GradientTemplate unmounting');
    };
  }, [profile]);

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

  // Log any missing required data
  if (!profile.customization) {
    console.error('Missing customization in profile:', profile);
  }

  if (!profile.name) {
    console.warn('Missing name in profile:', profile);
  }

  const avatarUrl = profile.avatar || DEFAULT_AVATAR;
  console.log('Using avatar URL:', avatarUrl);

  return (
    <div 
      className="min-h-screen py-12 px-4"
      style={{
        background: `linear-gradient(135deg, ${profile.customization?.primaryColor || '#000000'}, ${profile.customization?.secondaryColor || '#000000'})`
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-lg mx-auto space-y-8"
        onAnimationStart={() => console.log('Starting container animation')}
        onAnimationComplete={() => console.log('Container animation complete')}
      >
        {/* Profile Section */}
        <motion.div variants={item} className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-32 h-32 mx-auto mb-4"
          >
            <div className="absolute inset-0 bg-white rounded-full blur-lg opacity-50" />
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <Image
                src={avatarUrl}
                alt={profile.name || 'Profile avatar'}
                fill
                className="object-cover"
                sizes="(max-width: 128px) 100vw, 128px"
                onError={(e) => {
                  console.error('Error loading avatar image:', e);
                  const img = e.target as HTMLImageElement;
                  img.src = DEFAULT_AVATAR;
                }}
              />
            </div>
          </motion.div>

          <motion.h1 
            variants={item}
            className="text-3xl font-bold mb-2 text-white"
          >
            {profile.name}
          </motion.h1>

          {profile.bio && (
            <motion.p 
              variants={item}
              className="text-white/80 mb-4"
            >
              {profile.bio}
            </motion.p>
          )}

          {profile.location && (
            <motion.div 
              variants={item}
              className="flex items-center justify-center text-white/60"
            >
              <MapPin className="w-4 h-4 mr-1" />
              <span>{profile.location}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Social Links */}
        {profile.socialLinks && profile.socialLinks.length > 0 && (
          <motion.div variants={item} className="flex justify-center space-x-4">
            {profile.socialLinks.map((link) => {
              console.log('Rendering social link:', link);
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white hover:text-white/80"
                >
                  <SocialIcon platform={link.platform} />
                </motion.a>
              );
            })}
          </motion.div>
        )}

        {/* Custom Links */}
        {profile.customLinks && profile.customLinks.length > 0 && (
          <motion.div variants={item} className="space-y-4">
            {profile.customLinks.map((link) => {
              console.log('Rendering custom link:', link);
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full p-4 bg-white/10 backdrop-blur-lg rounded-lg text-white hover:bg-white/20 transition-all"
                >
                  <div className="flex items-center">
                    {link.icon && (
                      <span className="mr-3 text-xl">{link.icon}</span>
                    )}
                    <span className="flex-1">{link.title}</span>
                    <ExternalLink className="w-4 h-4 opacity-50" />
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
