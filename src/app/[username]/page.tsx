import React from 'react';
import { notFound } from 'next/navigation';
import { 
  MapPin, 
  Github, 
  Briefcase, 
  Globe 
} from 'lucide-react';

import { getTheme } from '@/themes';
import { prisma } from '@/lib/prisma';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { getCurrentUserTheme } from '@/lib/actions/user-actions';

interface UserProfile {
  name: string;
  username: string;
  bio: string;
  location?: string;
  company?: string;
  website?: string;
  github?: string;
  twitter?: string;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    featured: boolean;
  }>;
}

async function fetchUserProfile(username: string): Promise<UserProfile | null> {
  try {
    // Remove the @ symbol if present and decode URI component
    const cleanUsername = decodeURIComponent(username.replace('@', ''));

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: cleanUsername },
          { email: cleanUsername }
        ]
      },
      select: {
        name: true,
        username: true,
        bio: true,
        location: true,
        company: true,
        website: true,
        github: true,
        twitter: true,
        projects: {
          where: {
            featured: true,
          },
          select: {
            id: true,
            title: true,
            description: true,
            technologies: true,
            featured: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) return null;

    return {
      name: user.name || '',
      username: user.username || '',
      bio: user.bio || '',
      location: user.location || undefined,
      company: user.company || undefined,
      website: user.website || undefined,
      github: user.github || undefined,
      twitter: user.twitter || undefined,
      projects: user.projects || [],
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

function ProfileContent({ profile }: { profile: UserProfile }) {
  return (
    <div 
      className="min-h-screen p-8"
      style={{
        backgroundColor: getTheme().background,
        color: getTheme().text,
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div 
          className="text-center mb-12"
          style={{ color: getTheme().accent }}
        >
          <h1 className="text-5xl font-bold mb-4">{profile.name}</h1>
          <p className="text-xl">@{profile.username}</p>
        </div>

        {/* Profile Details */}
        <div
          className="bg-opacity-10 p-8 rounded-xl"
          style={{ 
            backgroundColor: getTheme().cardBackground,
            border: `2px solid ${getTheme().accent}` 
          }}
        >
          {/* Bio Section */}
          <div className="mb-8">
            <h2 
              className="text-2xl font-semibold mb-4"
              style={{ color: getTheme().accent }}
            >
              About
            </h2>
            <p 
              className="text-lg"
              style={{ color: getTheme().text }}
            >
              {profile.bio || 'No bio available'}
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-4">
            {profile.location && (
              <div className="flex items-center">
                <MapPin 
                  className="mr-3" 
                  style={{ color: getTheme().accent }}
                />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.company && (
              <div className="flex items-center">
                <Briefcase 
                  className="mr-3" 
                  style={{ color: getTheme().accent }}
                />
                <span>{profile.company}</span>
              </div>
            )}
            {profile.website && (
              <div className="flex items-center">
                <Globe 
                  className="mr-3" 
                  style={{ color: getTheme().accent }}
                />
                <a 
                  href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {profile.website}
                </a>
              </div>
            )}
            {profile.github && (
              <div className="flex items-center">
                <Github 
                  className="mr-3" 
                  style={{ color: getTheme().accent }}
                />
                <a 
                  href={`https://github.com/${profile.github}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {profile.github}
                </a>
              </div>
            )}
          </div>

          {/* Projects Section */}
          {profile.projects && profile.projects.length > 0 && (
            <div className="mt-12">
              <h2 
                className="text-2xl font-semibold mb-6"
                style={{ color: getTheme().accent }}
              >
                Projects
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {profile.projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-6 rounded-xl"
                    style={{ 
                      backgroundColor: getTheme().cardBackground,
                      border: `2px solid ${getTheme().accent}` 
                    }}
                  >
                    <h3 
                      className="text-xl font-bold mb-3"
                      style={{ color: getTheme().accent }}
                    >
                      {project.title}
                    </h3>
                    <p className="mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ 
                            backgroundColor: getTheme().accent,
                            color: getTheme().background 
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function UserProfilePage({ 
  params 
}: { 
  params: { username: string } 
}) {
  const profile = await fetchUserProfile(params.username);
  const currentTheme = await getCurrentUserTheme();

  if (!profile) {
    notFound();
  }

  return (
    <>
      <div className="absolute top-4 right-4 z-10">
        <ThemeSwitcher currentTheme={currentTheme} />
      </div>
      <ProfileContent profile={profile} />
    </>
  );
}
