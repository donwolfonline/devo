import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function verifySuperAdmin() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/devoapp';
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find super admin user
    const superAdmin = await User.findOne({ 
      role: 'SUPER_ADMIN' 
    }).select('+password');

    if (!superAdmin) {
      console.error('No super admin user found');
      return;
    }

    console.log('Super Admin User Details:');
    console.log('Username:', superAdmin.username);
    console.log('Email:', superAdmin.email);
    console.log('Role:', superAdmin.role);
    console.log('Password Hash Length:', superAdmin.password?.length);
    console.log('Last Login:', superAdmin.lastLogin);

    // Verify password hash
    const testPassword = 'DevoAdmin2024!@#';
    const isPasswordValid = await bcrypt.compare(testPassword, superAdmin.password);
    
    console.log('Test Password Validation:', isPasswordValid);

  } catch (error) {
    console.error('Error verifying super admin:', error);
  } finally {
    await mongoose.disconnect();
  }
}

verifySuperAdmin();
