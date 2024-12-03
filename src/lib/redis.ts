import Redis from 'ioredis';

// Create Redis client
const redis = new Redis({
  host: 'localhost',
  port: 6379,
});

// Error handling
redis.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

// Wrapper functions to match the interface we were using with Upstash
export const redisClient = {
  get: async (key: string) => {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  },

  set: async (key: string, value: any, options?: { ex?: number }) => {
    const serializedValue = JSON.stringify(value);
    if (options?.ex) {
      await redis.setex(key, options.ex, serializedValue);
    } else {
      await redis.set(key, serializedValue);
    }
  },

  del: async (key: string) => {
    await redis.del(key);
  },

  mget: async (...keys: string[]) => {
    const values = await redis.mget(keys);
    return values.map(value => value ? JSON.parse(value) : null);
  },

  mset: async (...args: any[]) => {
    const pairs = [];
    for (let i = 0; i < args.length; i += 2) {
      pairs.push(args[i], JSON.stringify(args[i + 1]));
    }
    await redis.mset(...pairs);
  },

  incr: async (key: string) => {
    return await redis.incr(key);
  },

  expire: async (key: string, seconds: number) => {
    await redis.expire(key, seconds);
  },

  hincrby: async (key: string, field: string, increment: number) => {
    return await redis.hincrby(key, field, increment);
  },

  hgetall: async (key: string) => {
    const result = await redis.hgetall(key);
    return result;
  },

  keys: async (pattern: string) => {
    return await redis.keys(pattern);
  },

  pfadd: async (key: string, ...elements: any[]) => {
    return await redis.pfadd(key, ...elements);
  }
};

export default redisClient;
