import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { MongoClient, GridFSBucket } from 'mongodb';
import { authOptions } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { cache } from '@/lib/cache';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

const MONGODB_URI = process.env.MONGODB_URI!;
const client = new MongoClient(MONGODB_URI);

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limiting
    try {
      await limiter.check(5, session.user.id); // 5 requests per minute per user
    } catch {
      return NextResponse.json({ error: 'Too many uploads' }, { status: 429 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Convert File to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Connect to MongoDB
    await client.connect();
    const db = client.db('devoapp');
    const bucket = new GridFSBucket(db);

    // Generate unique filename
    const filename = `${Date.now()}-${file.name}`;

    // Upload file to GridFS
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: {
        userId: session.user.id,
        originalName: file.name,
        mimeType: file.type
      }
    });

    uploadStream.write(buffer);
    uploadStream.end();

    const fileId = await new Promise((resolve, reject) => {
      uploadStream.on('finish', () => resolve(uploadStream.id));
      uploadStream.on('error', reject);
    });

    // Optional: Cache file metadata
    await cache.set(`file:${fileId}`, {
      id: fileId,
      name: filename,
      userId: session.user.id,
      uploadedAt: new Date()
    }, 86400); // Cache for 24 hours

    return NextResponse.json({ 
      message: 'File uploaded successfully', 
      fileId: fileId 
    }, { status: 200 });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  } finally {
    await client.close();
  }
}
