import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const linkDesigns = await prisma.linkDesign.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        previewImage: true
      }
    });

    return NextResponse.json(linkDesigns);
  } catch (error) {
    console.error('Error fetching link designs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch link designs' }, 
      { status: 500 }
    );
  }
}
