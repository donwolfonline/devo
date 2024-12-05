import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from './mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// Extend the default session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      username: string;
    }
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: string;
    username: string;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        type: { label: "Type", type: "text" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error('Username and password are required');
          }

          await connectDB();

          const user = await User.findOne({
            $or: [
              { email: credentials.username.toLowerCase() },
              { username: credentials.username.toLowerCase() }
            ]
          }).select('+password');

          if (!user) {
            throw new Error('Invalid credentials');
          }

          // Check for superadmin authentication
          if (credentials.type === 'superadmin' && user.role !== 'SUPER_ADMIN') {
            throw new Error('Invalid superadmin credentials');
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) {
            throw new Error('Invalid credentials');
          }

          return {
            id: user._id.toString(),
            name: user.name || null,
            email: user.email || null,
            image: user.image || null,
            role: user.role,
            username: user.username
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.username = token.username as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always allow URLs starting with base URL
      if (url.startsWith(baseUrl)) return url;

      // Handle relative URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }

      // Default to base URL
      return baseUrl;
    }
  },
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/sign-in?error=true'
  }
};
