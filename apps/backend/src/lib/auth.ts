// src/lib/auth.ts
import { ORIGINS } from '@/constants/origins';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const auth = betterAuth({
  url: process.env.BETTER_AUTH_URL, // Used to build callback URLs & cookies
  secret: process.env.BETTER_AUTH_SECRET,
  // Where requests will be routed (keep default for now → /api/auth/*)
  // basePath: "/api/auth",
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  // Enable simple email+password to start. (We'll add OAuth/Passkeys later.)
  emailAndPassword: { enabled: true },
  trustedOrigins: ORIGINS,
});
