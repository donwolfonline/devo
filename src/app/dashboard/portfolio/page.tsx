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

        {/* Basic Information Section */}
        <div className="bg-background border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block mb-2">Full Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full p-2 border rounded-md" 
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="title" className="block mb-2">Professional Title</label>
              <input 
                type="text" 
                id="title" 
                className="w-full p-2 border rounded-md" 
                placeholder="Software Engineer"
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-background border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full p-2 border rounded-md" 
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2">Phone</label>
              <input 
                type="tel" 
                id="phone" 
                className="w-full p-2 border rounded-md" 
                placeholder="+1 (123) 456-7890"
              />
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="bg-background border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Social Links</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="github" className="w-1/4">GitHub</label>
              <input 
                type="url" 
                id="github" 
                className="flex-1 p-2 border rounded-md" 
                placeholder="https://github.com/username"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="linkedin" className="w-1/4">LinkedIn</label>
              <input 
                type="url" 
                id="linkedin" 
                className="flex-1 p-2 border rounded-md" 
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={isLoading}
            className="
              bg-primary text-white 
              px-6 py-2 rounded-md 
              hover:bg-primary-dark 
              transition-colors
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {isLoading ? 'Saving...' : 'Save Portfolio'}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
