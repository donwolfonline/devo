import mongoose from 'mongoose';

// Extend the global type to include mongoose
declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/devoapp';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return {
      conn: cached.conn,
      db: cached.conn.connection.db
    };
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    const mongoose = await cached.promise;
    cached.conn = mongoose.connection;
    
    return {
      conn: cached.conn,
      db: cached.conn.db
    };
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

export async function disconnect() {
  if (cached.conn) {
    await cached.conn.close();
    cached.conn = null;
    cached.promise = null;
  }
}

// Edge runtime doesn't support process events, so we'll handle cleanup differently
if (typeof process !== 'undefined' && process.on) {
  ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(signal => {
    process.on(signal, () => disconnect());
  });
}

export default dbConnect;
