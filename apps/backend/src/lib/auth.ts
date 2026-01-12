import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { getLocalizedMessage } from '@/common/i18n/error-messages';
import { mapBetterAuthErrorToKey } from './better-auth-codes';
import { getLocaleFromRequest } from '@/common/utils/headers';
import { sendPasswordResetEmail } from './email-sender';
import { PrismaService } from '@/db/prisma.service';

const prisma = new PrismaService();

// Use environment variables directly since this file is loaded before NestJS context
const appUrl =
  process.env.BETTER_AUTH_URL || process.env.APP_URL || 'http://localhost:4000';
const authSecret = process.env.BETTER_AUTH_SECRET;
const allowedOrigins = process.env.APP_CORS_ORIGIN
  ? process.env.APP_CORS_ORIGIN.split(',')
  : ['http://localhost:4000'];

if (!authSecret) {
  throw new Error('BETTER_AUTH_SECRET is required in environment variables');
}

export const auth = betterAuth({
  baseURL: appUrl, // Used to build callback URLs & cookies
  secret: authSecret,
  // Where requests will be routed (keep default for now → /auth/*)
  basePath: '/auth',
  appName: 'Noor Pray Tracker',

  trustedOrigins: allowedOrigins,

  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 20,
    sendResetPassword: async ({ user, url, token }) =>
      await sendPasswordResetEmail(user.email, url, token),
  },

  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const response = ctx.context.returned;
      // Localize errors
      if (
        response &&
        typeof response === 'object' &&
        'body' in response &&
        response.body
      ) {
        const apiError = response as APIError;
        const code = apiError.body?.code;

        if (code) {
          const locale = getLocaleFromRequest(
            ctx.headers as unknown as Record<string, unknown>,
          );
          const key = mapBetterAuthErrorToKey(code);
          const localized = getLocalizedMessage(key, locale);

          throw new APIError('BAD_REQUEST', {
            ...apiError.body,
            message: localized,
          });
        }
      }

      return response;
    }),
  },
});
