const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function resetSuperAdminPassword() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/devoapp';
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // New password that meets all validation requirements
    const newPassword = 'DevoAdmin2024!@#';
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Find and update the super admin
    const result = await User.updateOne(
      { role: 'SUPER_ADMIN' }, 
      { 
        password: hashedPassword,
        username: 'superadmin',
        email: 'admin@devoapp.com'
      },
      { upsert: true }
    );

    console.log('Super admin password reset result:', result);
    console.log('New Login Credentials:');
    console.log('Username: superadmin');
    console.log('Password: DevoAdmin2024!@#');

  } catch (error) {
    console.error('Error resetting super admin password:', error);
  } finally {
    await mongoose.disconnect();
  }
}

resetSuperAdminPassword();
