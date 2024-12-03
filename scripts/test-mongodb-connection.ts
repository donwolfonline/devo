import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

async function testMongoDBConnection() {
  try {
    console.log('🔍 Testing MongoDB Connection');
    console.log('📍 Connection URI:', process.env.MONGODB_URI?.replace(/\/\/.*:.*@/, '//[REDACTED]:***@'));

    // Connect to MongoDB
    const connection = await mongoose.connect(process.env.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check connection
    console.log('✅ MongoDB Connection Successful!');
    console.log('📊 Connection Details:');
    console.log('   - Host:', connection.connection.host);
    console.log('   - Port:', connection.connection.port);
    console.log('   - Database:', connection.connection.db.databaseName);

    // List collections
    const collections = await connection.connection.db.listCollections().toArray();
    console.log('📋 Existing Collections:');
    collections.forEach((collection, index) => {
      console.log(`   ${index + 1}. ${collection.name}`);
    });

    // Close the connection
    await mongoose.disconnect();
    console.log('🔌 MongoDB Connection Closed');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error);
    process.exit(1);
  }
}

testMongoDBConnection();
