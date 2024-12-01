export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  stats?: {
    stars?: number;
    forks?: number;
    commits?: number;
  };
}

export interface Skill {
  name: string;
  category: string;
  level: number; // 1-5
  icon?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  stackoverflow?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  location?: string;
  email?: string;
  avatar?: string;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  socialLinks: SocialLinks;
}
