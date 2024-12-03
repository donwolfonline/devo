import { redisClient } from './redis';
import { LRUCache } from 'lru-cache';

// Initialize LRU Cache
const lruCache = new LRUCache({
  max: 500, // Maximum number of items
  ttl: 1000 * 60 * 5, // 5 minutes
});

// Cache layers with different strategies
export class EnhancedCache {
  private static instance: EnhancedCache;
  
  private constructor() {}

  static getInstance(): EnhancedCache {
    if (!EnhancedCache.instance) {
      EnhancedCache.instance = new EnhancedCache();
    }
    return EnhancedCache.instance;
  }

  // Multi-layer get operation
  async get(key: string): Promise<any> {
    try {
      // Try memory cache first
      const memoryResult = lruCache.get(key);
      if (memoryResult) {
        return memoryResult;
      }

      // Try Redis next
      const redisResult = await redisClient.get(key);
      if (redisResult) {
        // Update memory cache
        lruCache.set(key, redisResult);
        return redisResult;
      }

      return null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  // Set value across all cache layers
  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      // Update memory cache
      lruCache.set(key, value, ttl ? { ttl: ttl * 1000 } : undefined);

      // Update Redis with TTL if provided
      if (ttl) {
        await redisClient.set(key, value, { ex: ttl });
      } else {
        await redisClient.set(key, value);
      }
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  // Invalidate cache across all layers
  async invalidate(key: string): Promise<void> {
    try {
      lruCache.delete(key);
      await redisClient.del(key);
    } catch (error) {
      console.error('Cache del error:', error);
    }
  }

  // Invalidate by pattern (only works with Redis)
  async invalidatePattern(pattern: string): Promise<void> {
    try {
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        // Clear from LRU cache
        keys.forEach(key => lruCache.delete(key));
        // Clear from Redis
        await Promise.all(keys.map(key => redisClient.del(key)));
      }
    } catch (error) {
      console.error('Cache invalidatePattern error:', error);
    }
  }

  // Batch get operation
  async mget(keys: string[]): Promise<any[]> {
    try {
      const results = new Map();
      const missedKeys: string[] = [];

      // Check LRU cache first
      keys.forEach(key => {
        const value = lruCache.get(key);
        if (value !== undefined) {
          results.set(key, value);
        } else {
          missedKeys.push(key);
        }
      });

      if (missedKeys.length > 0) {
        // Get missed keys from Redis
        const redisResults = await redisClient.mget(...missedKeys);
        redisResults.forEach((result, i) => {
          if (result !== null) {
            const key = missedKeys[i];
            results.set(key, result);
            // Update LRU cache
            lruCache.set(key, result);
          }
        });
      }

      return keys.map(key => results.get(key) ?? null);
    } catch (error) {
      console.error('Cache mget error:', error);
      return keys.map(() => null);
    }
  }

  // Batch set operation
  async mset(entries: [string, any][], ttl?: number): Promise<void> {
    try {
      // Update LRU cache
      entries.forEach(([key, value]) => {
        lruCache.set(key, value, ttl ? { ttl: ttl * 1000 } : undefined);
      });

      // Update Redis
      const redisEntries = entries.flatMap(([key, value]) => [key, value]);
      await redisClient.mset(...redisEntries);

      // Set TTL if provided
      if (ttl) {
        await Promise.all(
          entries.map(([key]) => redisClient.expire(key, ttl))
        );
      }
    } catch (error) {
      console.error('Cache mset error:', error);
    }
  }

  // Get cache stats
  getStats() {
    return {
      memorySize: lruCache.size,
      memoryMaxSize: lruCache.max,
      memoryLoadRatio: lruCache.size / (lruCache.max as number),
    };
  }
}

// Export singleton instance
export const enhancedCache = EnhancedCache.getInstance();
