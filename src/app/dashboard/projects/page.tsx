'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const sampleProjects = [
  {
    id: 1,
    name: 'E-commerce Dashboard',
    description: 'A modern dashboard for managing online stores',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    image: '/placeholder.jpg',
    status: 'published',
  },
  {
    id: 2,
    name: 'Task Management App',
    description: 'A collaborative task management application',
    technologies: ['Next.js', 'Node.js', 'MongoDB'],
    image: '/placeholder.jpg',
    status: 'draft',
  },
];

export default function Projects() {
  const [projects, setProjects] = useState(sampleProjects);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      // TODO: Implement actual delete logic
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="mt-2 text-muted-foreground">
            Manage and showcase your development projects
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/dashboard/projects/new"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-medium transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Project
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
            className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent/20 transition-colors duration-200"
          >
            <div className="aspect-video bg-muted">
              {/* Project thumbnail would go here */}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  project.status === 'published'
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {project.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-end gap-2">
                <Link
                  href={`/dashboard/projects/${project.id}/edit`}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
