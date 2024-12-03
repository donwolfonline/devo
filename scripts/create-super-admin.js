import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
    validate: {
      validator: (value) => /^[a-zA-Z0-9_-]+$/.test(value),
      message: 'Username can only contain letters, numbers, underscores, and hyphens',
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please provide a valid email address',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
    minlength: [8, 'Password must be at least 8 characters long'],
    validate: {
      validator: (value) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(value);
      },
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  },
  name: {
    type: String,
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  role: {
    type: String,
    enum: {
      values: ['USER', 'ADMIN', 'SUPER_ADMIN'],
      message: '{VALUE} is not a valid role',
    },
    default: 'USER',
    required: true,
  },
  lastLogin: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  failedLoginAttempts: {
    type: Number,
    default: 0,
    max: [5, 'Too many login attempts'],
  },
  lockUntil: {
    type: Date,
  },
  passwordChangedAt: {
    type: Date,
  },
}, {
  timestamps: true,
  collection: 'users',
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createSuperAdmin() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/devoapp';
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if super admin already exists
    const existingSuperAdmin = await User.findOne({ 
      $or: [
        { role: 'SUPER_ADMIN' },
        { username: 'superadmin' },
        { email: 'admin@devoapp.com' }
      ]
    });

    if (existingSuperAdmin) {
      console.log('Super admin already exists');
      console.log('Existing Super Admin Details:', {
        username: existingSuperAdmin.username,
        email: existingSuperAdmin.email,
        role: existingSuperAdmin.role
      });
      process.exit(0);
    }

    // Create super admin user
    const password = 'DevoAdmin2024!@#';
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const superAdmin = await User.create({
      username: 'superadmin',
      email: 'admin@devoapp.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
      isActive: true,
      failedLoginAttempts: 0,
    });

    console.log('Super admin created successfully:', {
      username: superAdmin.username,
      email: superAdmin.email,
      role: superAdmin.role,
    });

    console.log('Login Credentials:');
    console.log('Username: superadmin');
    console.log('Password: DevoAdmin2024!@#');

    process.exit(0);
  } catch (error) {
    console.error('Error creating super admin:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

createSuperAdmin();
