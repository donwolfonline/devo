'use client';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Project {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
}

interface UserProfile {
  id?: string;
  name?: string;
  username?: string;
  bio?: string;
  location?: string;
  company?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  image?: string;
  projects?: Project[];
  portfolioStats?: {
    portfolioViews: number;
    profileVisits: number;
  };
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user) {
        try {
          const response = await fetch('/api/users');
          if (!response.ok) {
            throw new Error('Failed to fetch profile');
          }
          const data = await response.json();
          setProfile(data);
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session?.user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-32 h-32">
              {profile.image ? (
                <Image
                  src={profile.image}
                  alt={profile.name || 'Profile'}
                  fill
                  className="rounded-full object-cover border-4 border-background"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-4xl font-bold text-muted-foreground">
                  {profile.name?.[0] || '?'}
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {profile.name || 'Anonymous Developer'}
              </h1>
              <p className="text-muted-foreground mb-4">{profile.bio}</p>
              <div className="flex flex-wrap gap-4">
                {profile.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.company && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{profile.company}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            {profile.github && (
              <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            )}
            {profile.linkedin && (
              <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            )}
            {profile.twitter && (
              <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            )}
            {profile.website && (
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </a>
            )}
          </div>
        </motion.div>

        {/* Projects Section */}
        {profile.projects && profile.projects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {profile.projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline"
                    >
                      Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/20 rounded-xl">
            <p className="text-muted-foreground">
              No projects added yet. Start showcasing your work!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}