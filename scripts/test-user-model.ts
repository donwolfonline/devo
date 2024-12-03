const mongoose = require('mongoose');
const { config } = require('dotenv');
const User = require('../src/models/User').default;

// Load environment variables
config();

async function testUserModel() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/devoapp';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Test 1: Create user with valid data
    console.log('\n🧪 Test 1: Creating user with valid data');
    const testUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'TestUser2024!@#',
      name: 'Test User',
      role: 'USER',
    };

    const user = new User(testUser);
    await user.save();
    console.log('✅ User created successfully:', {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    // Test 2: Password validation
    console.log('\n🧪 Test 2: Password validation');
    const isPasswordValid = await user.comparePassword('TestUser2024!@#');
    console.log('✅ Correct password validation:', isPasswordValid);
    const isInvalidPasswordValid = await user.comparePassword('wrongpassword');
    console.log('✅ Invalid password validation:', isInvalidPasswordValid);

    // Test 3: Account locking
    console.log('\n🧪 Test 3: Testing account locking');
    user.failedLoginAttempts = 3;
    user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // Lock for 15 minutes
    await user.save();
    console.log('✅ Account locked status:', user.isLocked());

    // Test 4: Duplicate username/email
    console.log('\n🧪 Test 4: Testing duplicate user creation');
    try {
      const duplicateUser = new User(testUser);
      await duplicateUser.save();
    } catch (error) {
      console.log('✅ Successfully prevented duplicate user creation');
    }

    // Test 5: Invalid data validation
    console.log('\n🧪 Test 5: Testing invalid data validation');
    try {
      const invalidUser = new User({
        username: 'a', // Too short
        email: 'invalid-email', // Invalid email
        password: 'weak', // Weak password
        role: 'INVALID_ROLE', // Invalid role
      });
      await invalidUser.save();
    } catch (error) {
      console.log('✅ Validation errors caught successfully:', error.message);
    }

    // Test 6: Password hashing
    console.log('\n🧪 Test 6: Testing password hashing');
    const userWithPassword = await User.findById(user._id).select('+password');
    console.log('✅ Password is hashed:', userWithPassword?.password !== testUser.password);

    // Clean up
    console.log('\n🧹 Cleaning up test data');
    await User.deleteOne({ _id: user._id });
    console.log('✅ Test user cleaned up');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  }
}

// Run the test
console.log('🚀 Starting User Model Tests...\n');
testUserModel();
