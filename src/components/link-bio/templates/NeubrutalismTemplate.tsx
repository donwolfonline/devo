'use client';

import { motion } from 'framer-motion';
import { LinkBioProfile } from '@/types/link-bio';
import { SocialIcon } from '../SocialIcon';
import Image from 'next/image';
import { ExternalLink, MapPin } from 'lucide-react';

interface NeubrutalismTemplateProps {
  profile: LinkBioProfile;
}

export default function NeubrutalismTemplate({ profile }: NeubrutalismTemplateProps) {
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
    <div className="min-h-screen bg-[#F5F5F5] py-12 px-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-2xl mx-auto space-y-8"
      >
        {/* Profile Section */}
        <motion.div variants={item} className="text-center">
          <motion.div
            whileHover={{ scale: 1.02, rotate: -2 }}
            className="relative w-40 h-40 mx-auto mb-8"
          >
            <div className="absolute inset-0 bg-black transform translate-x-2 translate-y-2 rounded-xl" />
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              className="object-cover rounded-xl border-4 border-black relative bg-white"
            />
          </motion.div>
          
          <h1 className="text-4xl font-black text-black mb-4 relative inline-block">
            <span className="relative z-10">{profile.name}</span>
            <div className="absolute bottom-0 left-0 w-full h-4 bg-yellow-300 -z-10 transform -rotate-2" />
          </h1>
          
          <p className="text-lg text-gray-700 max-w-md mx-auto font-mono">
            {profile.bio}
          </p>
          
          {profile.location && (
            <motion.div
              variants={item}
              className="flex items-center justify-center mt-4 text-gray-600"
            >
              <MapPin className="w-5 h-5 mr-2" />
              <span className="font-mono">{profile.location.address}</span>
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
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                         hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
                         hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              <SocialIcon platform={social.platform} className="w-6 h-6" />
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
              whileHover={{ scale: 1.02, rotate: -1 }}
              whileTap={{ scale: 0.98 }}
              className="block w-full p-4 bg-white border-4 border-black 
                         shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                         hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                         transition-all duration-200
                         hover:translate-x-[-2px] hover:translate-y-[-2px]
                         relative group"
            >
              <div className="absolute inset-0 bg-yellow-300 transform -rotate-1 
                             group-hover:rotate-0 transition-transform duration-200 -z-10" />
              <div className="flex items-center justify-between font-mono">
                <span className="text-lg font-bold">
                  {link.title}
                </span>
                <ExternalLink className="w-5 h-5" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div variants={item} className="pt-8">
          <div className="inline-block bg-black text-white px-4 py-2 font-mono transform -rotate-1">
            © {new Date().getFullYear()} {profile.name}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
