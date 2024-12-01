'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function NewProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Implement project creation
    // For now, just redirect back to projects
    router.push('/dashboard/projects');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground">New Project</h1>
        <p className="mt-2 text-muted-foreground">
          Add a new project to your portfolio
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              Project Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full rounded-lg bg-card border border-border px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              placeholder="My Awesome Project"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="mt-1 block w-full rounded-lg bg-card border border-border px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              placeholder="Describe your project..."
            />
          </div>

          <div>
            <label htmlFor="technologies" className="block text-sm font-medium text-foreground">
              Technologies
            </label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              className="mt-1 block w-full rounded-lg bg-card border border-border px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              placeholder="React, TypeScript, Node.js..."
            />
            <p className="mt-1 text-sm text-muted-foreground">
              Separate technologies with commas
            </p>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-foreground">
              Project Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="mt-1 block w-full text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent/10 file:text-accent hover:file:bg-accent/20"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg bg-card border border-border text-foreground hover:bg-muted transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
