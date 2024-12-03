import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Load environment variables
config({ path: join(rootDir, '.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/devoapp';

// Define User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minLength: [3, 'Username must be at least 3 characters long'],
    maxLength: [20, 'Username cannot be more than 20 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
  name: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN', 'SUPER_ADMIN'],
    default: 'USER',
  },
}, {
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const password = 'DevoAdmin2024!@#';
    const hashedPassword = await bcrypt.hash(password, 12);
    const now = new Date();

    const superAdmin = await User.findOneAndUpdate(
      { email: 'admin@devoapp.com' },
      {
        email: 'admin@devoapp.com',
        name: 'Super Admin',
        username: 'superadmin',
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        createdAt: now,
        updatedAt: now
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      }
    );

    console.log('Super admin created:', superAdmin);
  } catch (error) {
    console.error('Error creating super admin:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

main();
