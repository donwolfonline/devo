import dotenv from 'dotenv';

// Load environment variables from .env.local and .env
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

console.log('🔍 Environment Variables Debug:');
console.log('----------------------------');
console.log('Node Environment:', process.env.NODE_ENV);
console.log('');

console.log('🗝️  Database Variables:');
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('DATABASE_URL:', process.env.DATABASE_URL);

console.log('');
console.log('🔐 Authentication Variables:');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '[REDACTED]' : 'NOT SET');

console.log('');
console.log('📋 Full Environment:');
console.log(JSON.stringify(process.env, null, 2));
