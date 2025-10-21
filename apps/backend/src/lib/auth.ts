import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from 'generated/prisma';
import { env } from '@/config/env.config';
import { ALLOWED_ORIGINS } from '@/config/cors.configt';
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { getLocaleFromRequest } from '@/common/utils/response.utils';
import { getLocalizedMessage } from '@/common/i18n/error-messages';
import { mapBetterAuthErrorToKey } from './better-auth-codes';

const prisma = new PrismaClient();

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL, // Used to build callback URLs & cookies
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

  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const response = ctx.context.returned as APIError;
      const code = response.body?.code;

      if (!code) return;

      const locale = getLocaleFromRequest(
        ctx.headers as unknown as Record<string, unknown>,
      );
      const key = mapBetterAuthErrorToKey(code);
      const localized = getLocalizedMessage(key, locale);

      throw new APIError('BAD_REQUEST', {
        ...response.body,
        message: localized,
      });
    }),
  },
});
