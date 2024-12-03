import mongoose from 'mongoose';
import { UserSchema } from './schemas/UserSchema';

// Only initialize models on the server side
const isServer = typeof window === 'undefined';

// Singleton pattern for model initialization
export function getModel<T extends mongoose.Model<any>>(
  modelName: string, 
  schema: mongoose.Schema
): T {
  if (!isServer) {
    throw new Error('Cannot access Mongoose models on the client side');
  }

  // Check if the model already exists
  if (mongoose.models[modelName]) {
    return mongoose.models[modelName] as T;
  }

  // Create a new model
  return mongoose.model(modelName, schema) as T;
}

// Initialize User model (only on server)
export const User = isServer ? getModel('User', UserSchema) : null;

// Ensure models are initialized on server
export function initializeModels() {
  if (!isServer) return;
  
  // Initialize models
  getModel('User', UserSchema);
}
