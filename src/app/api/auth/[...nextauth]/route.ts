import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        type: { label: "Type", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.log('Missing credentials');
          throw new Error('Please enter username and password');
        }

        try {
          console.log('Connecting to DB...');
          await connectDB();
          
          const username = credentials.username.toLowerCase();
          const isSuperAdmin = credentials.type === 'superadmin';
          
          console.log('Finding user:', { username, type: credentials.type });

          // Find user with password field
          const user = await User.findOne({ 
            username,
            role: isSuperAdmin ? 'SUPER_ADMIN' : { $ne: 'SUPER_ADMIN' }
          }).select('+password');

          if (!user) {
            console.log('User not found');
            throw new Error('Invalid username or password');
          }

          console.log('User found:', {
            id: user._id,
            username: user.username,
            role: user.role,
            hasPasswordField: !!user.password,
            passwordStartsWithBcrypt: user.password?.startsWith('$2')
          });

          // Compare passwords using bcrypt directly
          console.log('Comparing passwords...');
          const isValid = await bcrypt.compare(credentials.password, user.password);
          
          console.log('Password comparison:', {
            isValid,
            passwordStartsWithBcrypt: user.password.startsWith('$2')
          });

          if (!isValid) {
            console.log('Invalid password');
            throw new Error('Invalid username or password');
          }

          console.log('Authentication successful');
          return {
            id: user._id.toString(),
            name: user.name || '',
            email: user.email,
            username: user.username,
            role: user.role,
            isActive: true // Always return true for isActive
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
        token.isActive = true; // Always set isActive to true in token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.username = token.username as string;
        session.user.isActive = true; // Always set isActive to true in session
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Handle superadmin routes
      if (url.startsWith('/superadmin')) {
        return url;
      }

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
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 // 24 hours
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
