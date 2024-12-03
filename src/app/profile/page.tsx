'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { LinkDesignSelector } from '@/components/LinkDesignSelector';
import { LinksManager } from '@/components/LinksManager';
import Image from 'next/image';
import { cache } from '@/lib/cache';

// Define a type for the user with projects
type UserWithProjects = Awaited<ReturnType<typeof prisma.user.findUnique>>;

export default async function ProfilePage() {
  const session = await getServerSession(authOptions) as { user: { id: string, name?: string | null, email?: string | null, image?: string | null, role: string, username: string } | null };
  
  if (!session?.user) {
    redirect('/login');
  }

  // Cache duration: 1 minute in development, 1 hour in production
  const CACHE_DURATION = process.env.NODE_ENV === 'development' ? 60 : 3600;
  const cacheKey = `user-profile-${session.user.id}`;

  // Try to get data from cache first
  let userWithProjects = await cache.get(cacheKey) as UserWithProjects | null;

  if (!userWithProjects) {
    // If not in cache, fetch from database
    userWithProjects = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        projects: {
          select: {
            id: true,
            title: true,
            description: true,
            demoUrl: true,
            githubUrl: true,
          }
        }
      }
    }) as UserWithProjects;

    // Store in cache if data exists
    if (userWithProjects) {
      await cache.set(cacheKey, userWithProjects, CACHE_DURATION);
    }
  }

  if (!userWithProjects) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="mr-6">
            <Image 
              src={userWithProjects.image || '/default-avatar.png'} 
              alt={`${userWithProjects.name || 'User'}'s avatar`} 
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{userWithProjects.name || 'User'}</h1>
            <p className="text-muted-foreground">{userWithProjects.email}</p>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          {userWithProjects.projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userWithProjects.projects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-card p-6 rounded-xl border border-border"
                >
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No projects added yet. Start showcasing your work!
            </p>
          )}
        </section>

        <section className="mt-8">
          <LinksManager />
        </section>

        <section className="mt-8">
          <LinkDesignSelector />
        </section>
      </div>
    </div>
  );
}
