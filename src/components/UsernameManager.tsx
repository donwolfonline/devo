'use client';

import { useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';

interface UsernameManagerProps {
  currentUsername?: string;
  onUsernameChange?: (username: string) => Promise<void>;
}

export function UsernameManager({ currentUsername, onUsernameChange }: UsernameManagerProps) {
  const [username, setUsername] = useState(currentUsername || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const profileUrl = `${baseUrl}/@${username}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUsernameChange) return;

    setIsLoading(true);
    try {
      await onUsernameChange(username);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update username:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-4 rounded-lg border border-border p-4 bg-card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">Profile URL</h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-primary hover:underline"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{baseUrl}/@</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 rounded-md border border-border bg-background px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="username"
              pattern="^[a-zA-Z0-9_-]+$"
              title="Only letters, numbers, underscores, and hyphens are allowed"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-md px-3 py-1 text-sm hover:bg-accent text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 p-2 rounded-md bg-muted">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
            >
              <span className="font-mono text-sm">{profileUrl}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              onClick={copyToClipboard}
              className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Copy profile URL"
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            Share this URL with others to let them view your portfolio.
          </p>
        </div>
      )}
    </div>
  );
}
