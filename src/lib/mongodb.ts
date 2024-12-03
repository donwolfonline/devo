import mongoose from 'mongoose';
import { initializeModels } from '@/models/init';

// Only run on server side
const isServer = typeof window === 'undefined';

if (!isServer) {
  throw new Error('MongoDB connection can only be established on the server side');
}

// Ensure we have a valid MONGODB_URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/devoapp';

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your environment variables');
}

declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (!isServer) {
    throw new Error('Cannot connect to MongoDB from the client side');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      initializeModels();
      return mongoose;
    });
  }

  try {
    cached.conn = (await cached.promise).connection;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

export async function disconnect() {
  if (!isServer) return;
  
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
}

// Debug mode only on server side
if (process.env.NODE_ENV === 'development' && isServer) {
  mongoose.set('debug', true);
}

export function getConnection() {
  if (!isServer) {
    throw new Error('Cannot get MongoDB connection from client side');
  }
  return cached.conn;
}
