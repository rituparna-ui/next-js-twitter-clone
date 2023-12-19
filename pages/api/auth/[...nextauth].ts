import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '@/lib/prismadb';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'text' },
      },
      async authorize(credentials) {
        if (credentials?.email || credentials?.password) {
          throw new Error('Invalid email or password');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials!.email,
          },
        });

        if (!user || !user.password) {
          throw new Error('Invalid email or password');
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error('Invalid email or password');
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: 'qwer1234',
  },
  secret: 'qwer1234',
});
