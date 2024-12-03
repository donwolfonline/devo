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

async function loginTest() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/devoapp';
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    console.log('🔍 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Test login credentials
    const testCredentials = [
      { username: 'superadmin', password: 'DevoAdmin2024!@#' },
      { username: 'admin@devoapp.com', password: 'DevoAdmin2024!@#' }
    ];

    for (const cred of testCredentials) {
      console.log(`\n🧪 Testing Login: ${cred.username}`);
      
      // Find user
      const user = await User.findOne({
        $or: [
          { email: cred.username.toLowerCase() },
          { username: cred.username.toLowerCase() }
        ]
      }).select('+password');

      if (!user) {
        console.error(`❌ User not found: ${cred.username}`);
        continue;
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(cred.password, user.password);
      
      console.log('User Details:', {
        username: user.username,
        email: user.email,
        role: user.role
      });

      console.log('Password Verification:', isValidPassword ? '✅ VALID' : '❌ INVALID');
      
      if (isValidPassword && user.role !== 'SUPER_ADMIN') {
        console.error('❌ User is not a Super Admin');
      }
    }

  } catch (error) {
    console.error('🚨 Login Test Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

loginTest();
