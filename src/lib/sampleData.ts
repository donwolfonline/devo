import { PortfolioData } from '@/components/templates/types';

export const templates = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and minimalist design focused on content',
    image: '/templates/minimal-preview.svg',
    features: ['Clean Typography', 'Whitespace Focus', 'Subtle Animations'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    type: 'minimal'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with bold elements',
    image: '/templates/modern-preview.svg',
    features: ['Bold Layout', 'Dynamic Sections', 'Modern UI'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    type: 'modern'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Unique and artistic portfolio template',
    image: '/templates/creative-preview.svg',
    features: ['Creative Animations', 'Unique Layout', 'Artistic Elements'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js'],
    type: 'creative'
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Tech-focused template with code elements',
    image: '/templates/developer-preview.svg',
    features: ['Code Snippets', 'Terminal Style', 'Tech Stack Focus'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Prism.js'],
    type: 'developer'
  },
  {
    id: 'portfolioplus',
    name: 'Portfolio Plus',
    description: 'Premium template with advanced features',
    image: '/templates/portfolioplus-preview.svg',
    features: ['Advanced Layout', '3D Elements', 'Interactive Sections'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'GSAP'],
    type: 'portfolioplus'
  }
];

export const sampleData: PortfolioData = {
  name: "John Doe",
  title: "Full Stack Developer",
  bio: "Passionate developer with 5+ years of experience in building modern web applications",
  location: "San Francisco, CA",
  email: "john@example.com",
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  twitter: "https://twitter.com/johndoe",
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "PostgreSQL",
    "AWS",
    "Docker"
  ],
  experience: [
    {
      title: "Senior Developer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      startDate: "2020-01",
      endDate: "Present",
      description: "Lead developer for enterprise web applications"
    },
    {
      title: "Full Stack Developer",
      company: "Startup Inc",
      location: "San Francisco, CA",
      startDate: "2018-03",
      endDate: "2019-12",
      description: "Full stack development using React and Node.js"
    }
  ],
  projects: [
    {
      title: "E-commerce Platform",
      description: "Modern e-commerce platform built with Next.js",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
      link: "https://example.com/project1",
      github: "https://github.com/johndoe/project1"
    },
    {
      title: "Task Management App",
      description: "Real-time task management application",
      technologies: ["React", "Firebase", "Material-UI"],
      link: "https://example.com/project2",
      github: "https://github.com/johndoe/project2"
    }
  ],
  education: [
    {
      degree: "BS in Computer Science",
      school: "University of Technology",
      location: "San Francisco, CA",
      startDate: "2014-09",
      endDate: "2018-05"
    }
  ]
};
