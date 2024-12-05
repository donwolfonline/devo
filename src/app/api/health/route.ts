import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET() {
  try {
    // Check database connection
    await connectDB();
    
    // Add more health checks here as needed
    // e.g., Redis connection, external API dependencies, etc.
    
    return NextResponse.json({ status: 'healthy' });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { status: 'unhealthy', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 503 }
    );
  }
}
