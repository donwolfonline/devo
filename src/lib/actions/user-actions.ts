'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ThemeName, getAllThemeNames } from '@/themes';
import { revalidatePath } from 'next/cache';

export async function updateUserTheme(theme: ThemeName) {
  try {
    // Validate theme input
    const validThemes = getAllThemeNames();
    if (!validThemes.includes(theme)) {
      throw new Error(`Invalid theme. Must be one of: ${validThemes.join(', ')}`);
    }

    // Get the current user session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      throw new Error('User not authenticated');
    }

    // Update user's theme in the database
    await prisma.user.update({
      where: { 
        id: session.user.id 
      },
      data: { 
        theme: theme 
      }
    });

    // Revalidate the current path to reflect changes
    revalidatePath('/');

    return { success: true, theme };
  } catch (error) {
    console.error('Failed to update theme:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

export async function getCurrentUserTheme(): Promise<ThemeName> {
  try {
    // Get the current user session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return 'cyberpunk'; // Default theme
    }

    // Fetch user's current theme
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { 
        theme: true,
        id: true // Always include id to satisfy Prisma
      }
    });

    return (user?.theme as ThemeName) || 'cyberpunk';
  } catch (error) {
    console.error('Failed to fetch user theme:', error);
    return 'cyberpunk'; // Fallback to default theme
  }
}
