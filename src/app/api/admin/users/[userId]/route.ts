import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

type RouteContext = {
  params: {
    userId: string;
  }
};

export async function DELETE(
  request: NextRequest, 
  context: RouteContext
) {
  try {
    // Check if user is authenticated and has admin privileges
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json(
        { error: 'Unauthorized: Insufficient permissions' }, 
        { status: 403 }
      );
    }

    // Prevent deleting the last super admin
    const superAdminCount = await prisma.user.count({
      where: { role: 'SUPER_ADMIN' }
    });

    const userToDelete = await prisma.user.findUnique({
      where: { id: context.params.userId }
    });

    if (!userToDelete) {
      return NextResponse.json(
        { error: 'User not found' }, 
        { status: 404 }
      );
    }

    if (userToDelete.role === 'SUPER_ADMIN' && superAdminCount <= 1) {
      return NextResponse.json(
        { error: 'Cannot delete the last super admin' }, 
        { status: 400 }
      );
    }

    // Delete user and associated records
    await prisma.user.delete({
      where: { id: context.params.userId }
    });

    return NextResponse.json(
      { message: 'User successfully deleted' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(
  request: NextRequest, 
  context: RouteContext
) {
  try {
    // Check if user is authenticated and has admin privileges
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json(
        { error: 'Unauthorized: Insufficient permissions' }, 
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validate input
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: 'No update data provided' }, 
        { status: 400 }
      );
    }

    // Prevent role changes for the last super admin
    const userToUpdate = await prisma.user.findUnique({
      where: { id: context.params.userId }
    });

    if (!userToUpdate) {
      return NextResponse.json(
        { error: 'User not found' }, 
        { status: 404 }
      );
    }

    // Prevent last super admin from losing super admin status
    if (body.role && body.role !== 'SUPER_ADMIN') {
      const superAdminCount = await prisma.user.count({
        where: { role: 'SUPER_ADMIN' }
      });

      if (userToUpdate.role === 'SUPER_ADMIN' && superAdminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot modify the last super admin\'s role' }, 
          { status: 400 }
        );
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: context.params.userId },
      data: body
    });

    return NextResponse.json(
      { message: 'User successfully updated', user: updatedUser }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
