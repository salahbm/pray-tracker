import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from 'generated/prisma';
import { env } from '@/config/env.config';
import { ALLOWED_ORIGINS } from '@/config/cors.configt';

const prisma = new PrismaClient();

export const auth = betterAuth({
  url: env.BETTER_AUTH_URL, // Used to build callback URLs & cookies
  secret: env.BETTER_AUTH_SECRET,
  // Where requests will be routed (keep default for now → /api/auth/*)
  basePath: '/api/auth',
  appName: 'Pray Tracker',

  trustedOrigins: ALLOWED_ORIGINS,

  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  // Enable simple email+password to start. (We'll add OAuth/Passkeys later.)
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 20,
  },
});
