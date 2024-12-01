'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PortfolioEditor() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // TODO: Implement actual save logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setMessage('Portfolio updated successfully!');
    } catch (error) {
      setMessage('Failed to update portfolio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground">Edit Portfolio</h1>
        <p className="mt-2 text-muted-foreground">
          Customize your portfolio appearance and content
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes('success')
              ? 'bg-green-500/10 border border-green-500/20 text-green-500'
              : 'bg-red-500/10 border border-red-500/20 text-red-500'
          }`}>
            {message}
          </div>
        )}

        {/* Basic Information */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-medium text-foreground mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                Display Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                defaultValue="John Doe"
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
                Professional Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                defaultValue="Full Stack Developer"
              />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-foreground mb-1">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                defaultValue="A passionate developer with experience in building modern web applications..."
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-medium text-foreground mb-4">Social Links</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="github" className="block text-sm font-medium text-foreground mb-1">
                GitHub Profile
              </label>
              <input
                type="url"
                id="github"
                name="github"
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-foreground mb-1">
                LinkedIn Profile
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder="https://linkedin.com/in/yourusername"
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-medium text-foreground mb-4">Skills</h2>
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-foreground mb-1">
              Technical Skills
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              placeholder="React, TypeScript, Node.js..."
            />
            <p className="mt-1 text-sm text-muted-foreground">
              Separate skills with commas
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
