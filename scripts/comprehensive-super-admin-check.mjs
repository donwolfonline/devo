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

async function comprehensiveSuperAdminCheck() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/devoapp';
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    console.log('🔍 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find ALL users
    const allUsers = await User.find({}).select('+password');
    console.log('🔢 Total Users:', allUsers.length);

    // Find super admin users
    const superAdmins = allUsers.filter(user => user.role === 'SUPER_ADMIN');
    console.log('👑 Super Admin Users:', superAdmins.length);

    if (superAdmins.length === 0) {
      console.error('❌ No Super Admin Users Found!');
      return;
    }

    // Detailed checks for each super admin
    for (const admin of superAdmins) {
      console.log('\n🕵️ Super Admin User Details:');
      console.log('Username:', admin.username);
      console.log('Email:', admin.email);
      console.log('Role:', admin.role);
      console.log('Password Hash Length:', admin.password?.length);

      // Verify password
      const testPasswords = [
        'DevoAdmin2024!@#',  // Original password
        'superadmin',         // Simple password
        'admin123',           // Another common password
      ];

      console.log('🔐 Password Verification Tests:');
      for (const testPass of testPasswords) {
        try {
          const isValidPassword = await bcrypt.compare(testPass, admin.password);
          console.log(`Test Password "${testPass}":`, isValidPassword ? '✅ MATCH' : '❌ NO MATCH');
        } catch (compareError) {
          console.error(`Error comparing password "${testPass}":`, compareError);
        }
      }
    }

    console.log('\n🏁 Comprehensive Check Complete');

  } catch (error) {
    console.error('🚨 Comprehensive Check Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

comprehensiveSuperAdminCheck();
