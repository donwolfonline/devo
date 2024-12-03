import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const links = await prisma.userLink.findMany({
      where: { userId: session.user.id },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch links' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const { title, url } = await request.json();

    // Validate input
    if (!title || !url) {
      return NextResponse.json(
        { error: 'Title and URL are required' }, 
        { status: 400 }
      );
    }

    const newLink = await prisma.userLink.create({
      data: {
        title,
        url,
        userId: session.user.id,
        order: await prisma.userLink.count({ 
          where: { userId: session.user.id } 
        })
      }
    });

    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error('Error creating link:', error);
    return NextResponse.json(
      { error: 'Failed to create link' }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const { links } = await request.json();

    // Validate input
    if (!Array.isArray(links)) {
      return NextResponse.json(
        { error: 'Invalid links format' }, 
        { status: 400 }
      );
    }

    // Update links with their new order
    const updatePromises = links.map((link, index) => 
      prisma.userLink.update({
        where: { 
          id: link.id,
          userId: session.user.id 
        },
        data: { order: index }
      })
    );

    await Promise.all(updatePromises);

    return NextResponse.json(
      { message: 'Links updated successfully' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating links:', error);
    return NextResponse.json(
      { error: 'Failed to update links' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const { id } = await request.json();

    // Validate input
    if (!id) {
      return NextResponse.json(
        { error: 'Link ID is required' }, 
        { status: 400 }
      );
    }

    await prisma.userLink.delete({
      where: { 
        id,
        userId: session.user.id 
      }
    });

    return NextResponse.json(
      { message: 'Link deleted successfully' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting link:', error);
    return NextResponse.json(
      { error: 'Failed to delete link' }, 
      { status: 500 }
    );
  }
}
