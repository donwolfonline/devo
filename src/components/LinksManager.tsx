'use client';

import { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Plus, Trash2, Grip } from 'lucide-react';

interface UserLink {
  id: string;
  title: string;
  url: string;
  order: number;
}

export function LinksManager() {
  const [links, setLinks] = useState<UserLink[]>([]);
  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await fetch('/api/users/links');
      if (!response.ok) {
        throw new Error('Failed to fetch links');
      }
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };

  const handleAddLink = async () => {
    if (!newLink.title || !newLink.url) return;

    try {
      const response = await fetch('/api/users/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLink),
      });

      if (!response.ok) {
        throw new Error('Failed to add link');
      }

      const addedLink = await response.json();
      setLinks([...links, addedLink]);
      setNewLink({ title: '', url: '' });
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding link:', error);
    }
  };

  const handleDeleteLink = async (id: string) => {
    try {
      const response = await fetch('/api/users/links', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete link');
      }

      setLinks(links.filter(link => link.id !== id));
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  const handleReorderLinks = async (newOrder: UserLink[]) => {
    try {
      await fetch('/api/users/links', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ links: newOrder }),
      });

      setLinks(newOrder);
    } catch (error) {
      console.error('Error reordering links:', error);
    }
  };

  return (
    <div className="bg-card p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Manage Links
        </h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {isAdding && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input 
            type="text"
            placeholder="Link Title (e.g., GitHub)"
            value={newLink.title}
            onChange={(e) => setNewLink({...newLink, title: e.target.value})}
            className="w-full p-2 border border-border rounded-md"
          />
          <input 
            type="url"
            placeholder="Link URL (e.g., https://github.com/username)"
            value={newLink.url}
            onChange={(e) => setNewLink({...newLink, url: e.target.value})}
            className="w-full p-2 border border-border rounded-md"
          />
          <div className="col-span-full flex justify-end gap-4">
            <button 
              onClick={() => setIsAdding(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddLink}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
            >
              Add Link
            </button>
          </div>
        </motion.div>
      )}

      {links.length === 0 ? (
        <p className="text-muted-foreground text-center py-6">
          No links added yet. Click the + button to get started!
        </p>
      ) : (
        <Reorder.Group 
          values={links} 
          onReorder={handleReorderLinks}
          className="space-y-4"
        >
          {links.map((link) => (
            <Reorder.Item 
              key={link.id} 
              value={link}
              className="flex items-center bg-background border border-border rounded-lg p-4 group"
            >
              <Grip className="w-5 h-5 mr-4 text-muted-foreground cursor-grab" />
              <div className="flex-grow">
                <h3 className="font-semibold text-foreground">{link.title}</h3>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground text-sm hover:text-primary truncate block max-w-[300px]"
                >
                  {link.url}
                </a>
              </div>
              <button 
                onClick={() => handleDeleteLink(link.id)}
                className="text-destructive hover:bg-destructive/10 p-2 rounded-full transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </div>
  );
}
