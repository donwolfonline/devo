import mongoose from 'mongoose';
import User from '../src/models/User';
import { config } from 'dotenv';

// Load environment variables
config();

async function runUserSecurityTests() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/devoapp';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Test 1: Create user with valid data
    console.log('\n🧪 Test 1: User Creation and Basic Validation');
    const testUser = {
      username: 'securitytestuser',
      email: 'security-test@example.com',
      password: 'SecurePass2024!@#',
      name: 'Security Test User',
      role: 'USER' as const,
    };

    const user = new User(testUser);
    await user.save();
    console.log('✅ User created successfully:', {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    // Test 2: Password Validation and Comparison
    console.log('\n🧪 Test 2: Password Validation');
    const correctPasswordCheck = await user.comparePassword('SecurePass2024!@#');
    console.log('✅ Correct password validation:', correctPasswordCheck);

    const incorrectPasswordCheck = await user.comparePassword('WrongPassword123!');
    console.log('✅ Incorrect password validation:', !incorrectPasswordCheck);

    // Test 3: Login Attempt Mechanism
    console.log('\n🧪 Test 3: Login Attempt Tracking');
    
    // Simulate multiple failed login attempts
    for (let i = 0; i < 6; i++) {
      await user.incrementLoginAttempts();
      console.log(`Failed login attempt ${i + 1}`);
    }

    // Check if user is locked out
    const userAfterLockout = await User.findById(user._id);
    console.log('✅ Account locked after max attempts:', userAfterLockout?.isLockedOut);

    // Test 4: Account Unlocking
    console.log('\n🧪 Test 4: Account Unlocking');
    await user.resetLoginAttempts();
    const userAfterReset = await User.findById(user._id);
    console.log('✅ Login attempts reset:', 
      userAfterReset?.failedLoginAttempts === 0 && !userAfterReset?.lockUntil
    );

    // Test 5: Duplicate User Prevention
    console.log('\n🧪 Test 5: Duplicate User Prevention');
    try {
      const duplicateUser = new User(testUser);
      await duplicateUser.save();
      console.error('❌ Duplicate user creation should have failed');
    } catch (error) {
      console.log('✅ Prevented duplicate user creation');
    }

    // Test 6: Invalid Data Validation
    console.log('\n🧪 Test 6: Invalid Data Validation');
    const invalidTestCases = [
      {
        username: 'a', // Too short
        email: 'invalid-email',
        password: 'weak',
        role: 'INVALID_ROLE',
      },
      {
        username: 'validusername',
        email: 'valid@email.com',
        password: 'NoSpecialChar123', // Missing special character
        role: 'USER',
      }
    ];

    for (const invalidUser of invalidTestCases) {
      try {
        const invalidUserInstance = new User(invalidUser);
        await invalidUserInstance.save();
        console.error('❌ Invalid user data should have failed validation');
      } catch (error: any) {
        console.log('✅ Caught invalid user data:', error.message);
      }
    }

    // Clean up
    console.log('\n🧹 Cleaning up test data');
    await User.deleteOne({ _id: user._id });
    console.log('✅ Test user cleaned up');

  } catch (error) {
    console.error('❌ Test Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  }
}

// Run the tests
console.log('🚀 Starting User Security Tests...\n');
runUserSecurityTests();
