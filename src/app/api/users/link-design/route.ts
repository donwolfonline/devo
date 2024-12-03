import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const { designId } = await request.json();

    // Validate that the design exists
    const design = await prisma.linkDesign.findUnique({
      where: { id: designId }
    });

    if (!design) {
      return NextResponse.json(
        { error: 'Invalid link design' }, 
        { status: 400 }
      );
    }

    // Update user's link design
    await prisma.user.update({
      where: { id: session.user.id },
      data: { linkDesignId: designId }
    });

    return NextResponse.json(
      { message: 'Link design updated successfully' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating link design:', error);
    return NextResponse.json(
      { error: 'Failed to update link design' }, 
      { status: 500 }
    );
  }
}
