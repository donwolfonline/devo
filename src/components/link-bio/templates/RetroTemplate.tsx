'use client';

import { motion } from 'framer-motion';
import { LinkBioProfile } from '@/types/link-bio';
import { SocialIcon } from '../SocialIcon';
import Image from 'next/image';
import { ExternalLink, MapPin } from 'lucide-react';

interface RetroTemplateProps {
  profile: LinkBioProfile;
}

export default function RetroTemplate({ profile }: RetroTemplateProps) {
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

  const scanlineAnimation = {
    animate: {
      y: ['0%', '100%'],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  return (
    <div 
      className="min-h-screen py-12 px-4 bg-[#2d132c] relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(0deg, #2d132c 0%, #801336 100%)',
      }}
    >
      {/* Scanlines Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)',
          backgroundSize: '100% 4px',
        }}
        {...scanlineAnimation}
      />

      {/* CRT Screen Border */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             boxShadow: 'inset 0 0 100px rgba(0,0,0,0.9)',
           }} />

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
            className="relative w-32 h-32 mx-auto mb-6"
          >
            <div className="absolute inset-0 bg-[#ee4540] rounded-lg transform rotate-3" />
            <div className="absolute inset-0 bg-[#c72c41] rounded-lg transform -rotate-3" />
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              className="object-cover relative rounded-lg border-4 border-[#ee4540] transform rotate-0"
            />
          </motion.div>
          <h1 className="text-4xl font-bold text-[#ee4540] mb-2 retro-text-shadow">
            {profile.name}
          </h1>
          <p className="text-[#ffb8b8] font-mono">{profile.bio}</p>
          
          {profile.location && (
            <motion.div
              variants={item}
              className="flex items-center justify-center mt-4 text-[#ffb8b8] font-mono"
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
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-lg bg-[#2d132c] border-2 border-[#ee4540] text-[#ee4540] hover:bg-[#ee4540] hover:text-[#2d132c] transition-colors relative overflow-hidden group"
            >
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
              whileHover={{ scale: 1.02, x: 10 }}
              whileTap={{ scale: 0.98 }}
              className="block w-full p-4 bg-[#2d132c] border-2 border-[#ee4540] text-[#ee4540] hover:bg-[#ee4540] hover:text-[#2d132c] transition-colors relative group overflow-hidden rounded-lg font-mono"
            >
              <div className="absolute inset-0 bg-[#ee4540] transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <div className="flex items-center justify-between relative z-10">
                <span className="font-medium">
                  {link.title}
                </span>
                <ExternalLink className="w-4 h-4 opacity-75" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Retro Decorations */}
        <div className="absolute bottom-4 left-4 text-[#ee4540] font-mono text-sm opacity-50">
          SYSTEM.BIO.1337
        </div>
        <div className="absolute top-4 right-4 text-[#ee4540] font-mono text-sm opacity-50">
          {new Date().toLocaleTimeString()}
        </div>
      </motion.div>

      <style jsx global>{`
        .retro-text-shadow {
          text-shadow: 2px 2px 0px #c72c41,
                       4px 4px 0px #801336;
        }
      `}</style>
    </div>
  );
}
