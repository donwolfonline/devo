import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Backup {
  id: string;
  timestamp: string;
  size: number;
  type: 'manual' | 'automated';
  status: 'completed' | 'failed';
}

interface BackupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRestore: (backupId: string) => void;
}

export default function BackupDialog({ isOpen, onClose, onRestore }: BackupDialogProps) {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBackup, setSelectedBackup] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadBackups();
    }
  }, [isOpen]);

  const loadBackups = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/backups');
      if (!response.ok) {
        throw new Error('Failed to load backups');
      }
      const data = await response.json();
      setBackups(data);
    } catch (error) {
      console.error('Error loading backups:', error);
      setError('Failed to load backups');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a27] rounded-lg p-6 max-w-2xl w-full mx-4 relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close backup restore dialog"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-200 mb-4">Select Backup to Restore</h2>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading backups...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400">{error}</p>
            <button
              type="button"
              onClick={loadBackups}
              className="mt-2 text-purple-400 hover:text-purple-300"
            >
              Try Again
            </button>
          </div>
        ) : backups.length === 0 ? (
          <p className="text-center py-8 text-gray-400">No backups available</p>
        ) : (
          <div className="space-y-4">
            <div className="max-h-96 overflow-y-auto">
              {backups.map((backup) => (
                <div
                  key={backup.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedBackup === backup.id
                      ? 'bg-purple-600/20 border border-purple-500/50'
                      : 'bg-[#1e1e2d] border border-transparent hover:border-purple-500/30'
                  }`}
                  onClick={() => setSelectedBackup(backup.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-200 font-medium">
                        {formatDate(backup.timestamp)}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Type: {backup.type.charAt(0).toUpperCase() + backup.type.slice(1)}
                      </p>
                    </div>
                    <span className="text-gray-400 text-sm">
                      {formatSize(backup.size)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-400 hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => selectedBackup && onRestore(selectedBackup)}
                disabled={!selectedBackup}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedBackup
                    ? 'bg-purple-600 text-white hover:bg-purple-500'
                    : 'bg-purple-600/20 text-purple-400 cursor-not-allowed'
                }`}
              >
                Restore Selected Backup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
