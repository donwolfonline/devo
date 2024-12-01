import { notFound } from 'next/navigation';
import MinimalistTemplate from '@/components/templates/MinimalistTemplate';
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';
import ModernTemplate from '@/components/templates/ModernTemplate';
import DeveloperTemplate from '@/components/templates/DeveloperTemplate';
import { PortfolioData } from '@/components/templates/types';

// Sample data for preview
const sampleData: PortfolioData = {
  name: "Alex Developer",
  title: "Full Stack Software Engineer",
  bio: "Passionate software engineer with expertise in building scalable web applications and microservices. I love solving complex problems and creating elegant solutions.",
  email: "alex@example.com",
  location: "San Francisco, CA",
  avatar: "/images/templates/sample-avatar.jpg",
  projects: [
    {
      id: "1",
      title: "E-commerce Platform",
      description: "Built a modern e-commerce platform using Next.js and Node.js, supporting 100k+ monthly active users.",
      technologies: ["Next.js", "Node.js", "MongoDB", "Redis"],
      imageUrl: "/images/templates/sample-project-1.jpg",
      githubUrl: "https://github.com/example/ecommerce",
      liveUrl: "https://example.com",
      stats: {
        stars: 245,
        forks: 57,
        commits: 834
      }
    },
    {
      id: "2",
      title: "AI Chat Application",
      description: "Developed a real-time chat application with AI-powered responses and multilingual support.",
      technologies: ["React", "Python", "TensorFlow", "WebSocket"],
      imageUrl: "/images/templates/sample-project-2.jpg",
      githubUrl: "https://github.com/example/ai-chat",
      liveUrl: "https://example.com/chat"
    }
  ],
  skills: [
    {
      name: "JavaScript",
      category: "Frontend",
      level: 5,
      icon: "🟨"
    },
    {
      name: "React",
      category: "Frontend",
      level: 5,
      icon: "⚛️"
    },
    {
      name: "Node.js",
      category: "Backend",
      level: 4,
      icon: "🟩"
    },
    {
      name: "Python",
      category: "Backend",
      level: 4,
      icon: "🐍"
    },
    {
      name: "AWS",
      category: "DevOps",
      level: 3,
      icon: "☁️"
    }
  ],
  experience: [
    {
      company: "Tech Corp",
      position: "Senior Software Engineer",
      startDate: "2020",
      endDate: "Present",
      description: "Leading a team of 5 engineers, developing and maintaining cloud-native applications serving millions of users.",
      technologies: ["React", "Node.js", "AWS", "Kubernetes"]
    },
    {
      company: "StartupCo",
      position: "Full Stack Developer",
      startDate: "2018",
      endDate: "2020",
      description: "Developed and launched multiple web applications from scratch, focusing on performance and user experience.",
      technologies: ["Vue.js", "Python", "Docker", "PostgreSQL"]
    }
  ],
  education: [
    {
      institution: "Tech University",
      degree: "Master's",
      field: "Computer Science",
      startDate: "2016",
      endDate: "2018"
    },
    {
      institution: "Code College",
      degree: "Bachelor's",
      field: "Software Engineering",
      startDate: "2012",
      endDate: "2016"
    }
  ],
  certifications: [
    {
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2021",
      url: "https://example.com/cert"
    },
    {
      name: "Google Cloud Professional",
      issuer: "Google",
      date: "2020",
      url: "https://example.com/cert"
    }
  ],
  socialLinks: {
    github: "https://github.com/example",
    linkedin: "https://linkedin.com/in/example",
    twitter: "https://twitter.com/example",
    website: "https://example.com"
  }
};

export default function TemplatePreviewPage({
  params,
}: {
  params: { id: string };
}) {
  // Select the appropriate template based on the ID
  const getTemplate = () => {
    switch (params.id) {
      case 'minimalist':
        return <MinimalistTemplate data={sampleData} />;
      case 'professional':
        return <ProfessionalTemplate data={sampleData} />;
      case 'creative':
        return <CreativeTemplate data={sampleData} />;
      case 'modern':
        return <ModernTemplate data={sampleData} />;
      case 'developer':
        return <DeveloperTemplate data={sampleData} />;
      default:
        notFound();
    }
  };

  return (
    <div className="relative">
      {/* Preview Bar */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white z-50 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm font-mono">
            Preview Mode: {params.id.charAt(0).toUpperCase() + params.id.slice(1)} Template
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
          >
            Back to Templates
          </button>
          <a
            href={`/templates/${params.id}/select`}
            className="px-4 py-1 text-sm bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors"
          >
            Use This Template
          </a>
        </div>
      </div>

      {/* Template Preview */}
      <div className="pt-12">
        {getTemplate()}
      </div>
    </div>
  );
}
