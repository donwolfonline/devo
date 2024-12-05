import { LogLevel, LogCategory, LogEntry } from './logger';

interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  category: LogCategory;
  message: string;
  details?: any;
  userId?: string;
}

export async function log(
  level: LogLevel,
  category: LogCategory,
  message: string,
  details?: any,
  userId?: string
) {
  try {
    const response = await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        level,
        category,
        message,
        details,
        userId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to write log');
    }

    // If it's an error, also console.error for easier debugging
    if (level === 'error') {
      console.error(`[${category}] ${message}`, details);
    }

    // If storage is running low, send notification
    if (category === 'storage' && level === 'warning') {
      const settings = await fetch('/api/settings');
      if (settings.ok) {
        const settingsJson = await settings.json();
        if (settingsJson.notifications?.emailNotifications) {
          // Import dynamically to avoid circular dependencies
          const { sendEmail } = await import('./emailTemplates');
          await sendEmail('storage_warning', details, [settingsJson.email.senderEmail]);
        }
      }
    }
  } catch (error) {
    console.error('Error writing to log:', error);
  }
}

export async function getLogs(
  category?: LogCategory,
  level?: LogLevel,
  startDate?: Date,
  endDate?: Date,
  limit = 100
) {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (level) params.append('level', level);
    if (startDate) params.append('startDate', startDate.toISOString());
    if (endDate) params.append('endDate', endDate.toISOString());
    params.append('limit', limit.toString());

    const response = await fetch(`/api/logs?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch logs');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching logs:', error);
    return [];
  }
}

export async function clearOldLogs(daysToKeep = 30) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const response = await fetch('/api/logs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: { $lt: cutoffDate }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to clear old logs');
    }
  } catch (error) {
    console.error('Error clearing old logs:', error);
  }
}
