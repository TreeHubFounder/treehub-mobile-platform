
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Get user
          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase() },
            include: {
              professional: true,
              company: true,
            }
          });

          if (!user) {
            return null;
          }

          // Get password hash
          const result = await prisma.$queryRaw<Array<{ password_hash: string }>>`
            SELECT password_hash FROM user_credentials WHERE user_id = ${user.id}
          `;

          if (!result || result.length === 0) {
            return null;
          }

          const passwordHash = result[0].password_hash;

          // Verify password
          const isValid = await bcrypt.compare(credentials.password, passwordHash);

          if (!isValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name || undefined,
            userType: user.userType,
            verified: user.verified,
            professional: user.professional,
            company: user.company,
          };

        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userType = user.userType;
        token.verified = user.verified;
        token.professional = user.professional;
        token.company = user.company;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.userType = token.userType as string;
        session.user.verified = token.verified as boolean;
        session.user.professional = token.professional as any;
        session.user.company = token.company as any;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  debug: process.env.NODE_ENV === 'development',
};
