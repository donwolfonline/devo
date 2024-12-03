'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Linkedin, Mail, Globe, MapPin, Calendar, Star, ThumbsUp, Share2 } from 'lucide-react';
import { Project } from '@/components/templates/types';
import ProjectCard from '@/components/ProjectCard';

// This would typically come from your database
const getDeveloperData = (id: string): { 
  name: string; 
  role: string; 
  location: string;
  joinedDate: string;
  bio: string;
  skills: string[];
  socialLinks: {
    github: string;
    twitter: string;
    linkedin: string;
    website: string;
  };
  projects: Project[] 
} => {
  const developers = {
    '1': {
      name: 'Sarah Chen',
      role: 'Full Stack Developer',
      location: 'San Francisco, CA',
      joinedDate: 'January 2023',
      bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Focused on creating elegant solutions to complex problems.',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker'],
      socialLinks: {
        github: 'https://github.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        website: 'https://example.com'
      },
      projects: [
        {
          id: '1',
          title: 'E-commerce Platform',
          description: 'A full-stack e-commerce solution built with Next.js and Stripe',
          technologies: ['Next.js', 'Stripe', 'MongoDB'],
          imageUrl: '/projects/ecommerce.svg',
          liveUrl: 'https://example-ecommerce.com',
          githubUrl: 'https://github.com/example/ecommerce'
        },
        {
          id: '2',
          title: 'Task Management App',
          description: 'Real-time task management application with team collaboration features',
          technologies: ['React', 'Socket.io', 'Express'],
          imageUrl: '/projects/taskapp.svg'
        }
      ]
    },
    '2': {
      name: 'Marcus Johnson',
      role: 'Frontend Engineer',
      location: 'New York, NY',
      joinedDate: 'March 2023',
      bio: 'Frontend engineer specializing in building beautiful, responsive web applications. Passionate about user experience and modern web technologies.',
      skills: ['Vue.js', 'TailwindCSS', 'JavaScript', 'React', 'Figma', 'SCSS'],
      socialLinks: {
        github: 'https://github.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        website: 'https://example.com'
      },
      projects: [
        {
          id: '1',
          title: 'Social Media Dashboard',
          description: 'Analytics dashboard for social media management',
          technologies: ['Vue.js', 'TailwindCSS', 'Chart.js'],
          imageUrl: '/projects/dashboard.jpg'
        },
        {
          id: '2',
          title: 'Portfolio Template',
          description: 'Customizable portfolio template for developers',
          technologies: ['React', 'SCSS', 'Framer Motion'],
          imageUrl: '/projects/portfolio.jpg'
        }
      ]
    },
    '3': {
      name: 'Priya Patel',
      role: 'Backend Developer',
      location: 'Seattle, WA',
      joinedDate: 'February 2023',
      bio: 'Backend developer with expertise in building scalable APIs and microservices. Passionate about system design and performance optimization.',
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'AWS', 'Redis'],
      socialLinks: {
        github: 'https://github.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        website: 'https://example.com'
      },
      projects: [
        {
          id: '1',
          title: 'API Gateway Service',
          description: 'Microservices API gateway with rate limiting and caching',
          technologies: ['Python', 'FastAPI', 'Redis'],
          imageUrl: '/projects/api.jpg'
        },
        {
          id: '2',
          title: 'Data Pipeline',
          description: 'Real-time data processing pipeline for analytics',
          technologies: ['Python', 'Apache Kafka', 'PostgreSQL'],
          imageUrl: '/projects/pipeline.jpg'
        }
      ]
    },
    '4': {
      name: 'Alex Thompson',
      role: 'Mobile Developer',
      location: 'Austin, TX',
      joinedDate: 'April 2023',
      bio: 'Mobile developer specializing in cross-platform development. Experienced in building high-performance mobile applications with modern frameworks.',
      skills: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'TypeScript', 'Redux'],
      socialLinks: {
        github: 'https://github.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        website: 'https://example.com'
      },
      projects: [
        {
          id: '1',
          title: 'Fitness Tracking App',
          description: 'Cross-platform mobile app for fitness tracking and workout planning',
          technologies: ['React Native', 'Firebase', 'Redux'],
          imageUrl: '/projects/fitness.jpg'
        },
        {
          id: '2',
          title: 'Food Delivery App',
          description: 'Native iOS and Android food delivery application',
          technologies: ['Swift', 'Kotlin', 'Google Maps API'],
          imageUrl: '/projects/food.jpg'
        }
      ]
    },
    '5': {
      name: 'Emma Wilson',
      role: 'UI/UX Developer',
      location: 'Portland, OR',
      joinedDate: 'May 2023',
      bio: 'UI/UX developer with a passion for creating beautiful and intuitive user interfaces. Focused on accessibility and user-centered design.',
      skills: ['Figma', 'React', 'TailwindCSS', 'Adobe XD', 'Sketch', 'Framer'],
      socialLinks: {
        github: 'https://github.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        website: 'https://example.com'
      },
      projects: [
        {
          id: '1',
          title: 'Design System',
          description: 'Component library and design system for enterprise applications',
          technologies: ['React', 'Storybook', 'TailwindCSS'],
          imageUrl: '/projects/design.jpg'
        },
        {
          id: '2',
          title: 'Travel App UI',
          description: 'Modern travel planning application with intuitive UX',
          technologies: ['Figma', 'React', 'Framer Motion'],
          imageUrl: '/projects/travel.jpg'
        }
      ]
    },
    '6': {
      name: 'David Kim',
      role: 'DevOps Engineer',
      location: 'Chicago, IL',
      joinedDate: 'June 2023',
      bio: 'DevOps engineer focused on automating and optimizing infrastructure. Expert in cloud technologies and continuous integration/deployment.',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins', 'GitOps'],
      socialLinks: {
        github: 'https://github.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        website: 'https://example.com'
      },
      projects: [
        {
          id: '1',
          title: 'Infrastructure as Code',
          description: 'Automated cloud infrastructure deployment using Terraform',
          technologies: ['Terraform', 'AWS', 'Python'],
          imageUrl: '/projects/infra.jpg'
        },
        {
          id: '2',
          title: 'Continuous Integration Pipeline',
          description: 'Automated deployment pipeline for microservices',
          technologies: ['Jenkins', 'Docker', 'Kubernetes'],
          imageUrl: '/projects/cicd.jpg'
        }
      ]
    },
    '7': {
      name: 'Sophie Martin',
      role: 'Frontend Developer',
      location: 'Boston, MA',
      joinedDate: 'July 2023',
      bio: 'Frontend developer specializing in Angular applications. Passionate about creating responsive and performant web applications.',
      skills: ['Angular', 'SCSS', 'TypeScript', 'RxJS', 'NgRx', 'Jest'],
      socialLinks: {
        github: 'https://github.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        website: 'https://example.com'
      },
      projects: [
        {
          id: '1',
          title: 'Enterprise Dashboard',
          description: 'Complex data visualization dashboard for enterprise clients',
          technologies: ['Angular', 'D3.js', 'NgRx'],
          imageUrl: '/projects/enterprise.jpg'
        },
        {
          id: '2',
          title: 'CRM System',
          description: 'Customer relationship management system with real-time updates',
          technologies: ['Angular', 'Firebase', 'Material UI'],
          imageUrl: '/projects/crm.jpg'
        }
      ]
    },
    '8': {
      name: 'James Wilson',
      role: 'Full Stack Developer',
      location: 'Denver, CO',
      joinedDate: 'August 2023',
      bio: 'Full stack developer with expertise in Next.js and GraphQL. Passionate about building scalable and maintainable applications.',
      skills: ['Next.js', 'MongoDB', 'GraphQL', 'TypeScript', 'Prisma', 'TailwindCSS'],
      socialLinks: {
        github: 'https://github.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        website: 'https://example.com'
      },
      projects: [
        {
          id: '1',
          title: 'Blog Platform',
          description: 'Modern blogging platform with GraphQL API',
          technologies: ['Next.js', 'GraphQL', 'MongoDB'],
          imageUrl: '/projects/blog.jpg',
          liveUrl: 'https://example-blog.com',
          githubUrl: 'https://github.com/example/blog'
        },
        {
          id: '2',
          title: 'Real Estate App',
          description: 'Property listing and management application',
          technologies: ['Next.js', 'Prisma', 'PostgreSQL'],
          imageUrl: '/placeholder-project.jpg',
          liveUrl: '', 
          githubUrl: '' 
        }
      ]
    },
    '9': {
      name: 'Lisa Anderson',
      role: 'Cloud Architect',
      location: 'Miami, FL',
      joinedDate: 'September 2023',
      bio: 'Cloud architect with extensive experience in AWS and infrastructure design. Focused on building scalable and secure cloud solutions.',
      skills: ['AWS', 'Terraform', 'Python', 'Kubernetes', 'Serverless', 'Security'],
      socialLinks: {
        github: 'https://github.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        website: 'https://example.com'
      },
      projects: [
        {
          id: '1',
          title: 'Serverless Platform',
          description: 'Serverless application platform with automatic scaling',
          technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB'],
          imageUrl: '/projects/serverless.jpg'
        },
        {
          id: '2',
          title: 'Security Framework',
          description: 'Cloud security and compliance automation framework',
          technologies: ['AWS', 'Python', 'Terraform'],
          imageUrl: '/projects/security.jpg'
        }
      ]
    }
  };

  return developers[id as keyof typeof developers];
};

export default function ProfilePage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const developer = getDeveloperData(id as string);

  if (!developer) {
    return (
      <main className="min-h-screen bg-[#0A0118]">
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Developer Not Found</h1>
          <p className="text-gray-400 mb-8">The developer profile you're looking for doesn't exist.</p>
          <Link
            href="/explore"
            className="px-6 py-3 rounded-full border border-purple-600 text-white hover:bg-purple-600/10 transition-colors"
          >
            Back to Explore
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0118]">
      <div className="relative">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent" />

        {/* Main Content */}
        <div className="relative">
          <Navbar />

          <div className="container mx-auto px-6 py-20">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/60 rounded-xl p-8 border border-purple-500/20 mb-8"
            >
              <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Profile Image */}
                <div className="w-32 h-32 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl font-bold text-purple-400">
                    {developer.name.charAt(0)}
                  </span>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">{developer.name}</h1>
                      <p className="text-gray-400">{developer.role}</p>
                    </div>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                      <button 
                        type="button" 
                        aria-label="Like profile" 
                        className="px-4 py-2 rounded-full border border-purple-600 text-white hover:bg-purple-600/10 transition-colors"
                      >
                        <ThumbsUp className="w-5 h-5" />
                      </button>
                      <button 
                        type="button" 
                        aria-label="Favorite profile" 
                        className="px-4 py-2 rounded-full border border-purple-600 text-white hover:bg-purple-600/10 transition-colors"
                      >
                        <Star className="w-5 h-5" />
                      </button>
                      <button 
                        type="button" 
                        aria-label="Share profile" 
                        className="px-4 py-2 rounded-full border border-purple-600 text-white hover:bg-purple-600/10 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-gray-400 mb-6">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {developer.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Joined {developer.joinedDate}
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">{developer.bio}</p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {developer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <Link
                      href={developer.socialLinks.github}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                      target="_blank"
                    >
                      <Github className="w-6 h-6" />
                    </Link>
                    <Link
                      href={developer.socialLinks.twitter}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                      target="_blank"
                    >
                      <Twitter className="w-6 h-6" />
                    </Link>
                    <Link
                      href={developer.socialLinks.linkedin}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                      target="_blank"
                    >
                      <Linkedin className="w-6 h-6" />
                    </Link>
                    <Link
                      href={developer.socialLinks.website}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                      target="_blank"
                    >
                      <Globe className="w-6 h-6" />
                    </Link>
                    <Link
                      href={`mailto:contact@${developer.name.toLowerCase().replace(' ', '')}.com`}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <Mail className="w-6 h-6" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Projects Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {developer.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
