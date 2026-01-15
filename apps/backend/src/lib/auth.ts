import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { getLocalizedMessage } from '@/common/i18n/error-messages';
import { mapBetterAuthErrorToKey } from './better-auth-codes';
import { getLocaleFromRequest } from '@/common/utils/headers';
import { sendPasswordResetEmail } from './email-sender';
import { PrismaService } from '@/db/prisma.service';

// Read directly from env
const appName = process.env.APP_NAME!;
const appUrl = process.env.APP_URL!;
const authSecret = process.env.BETTER_AUTH_SECRET!;
const allowedOrigins = process.env.APP_CORS_ORIGIN?.split(',') ?? [];

if (!authSecret) {
  throw new Error('BETTER_AUTH_SECRET is required');
}
if (!appName) {
  throw new Error('APP_NAME is required');
}
if (!appUrl) {
  throw new Error('APP_URL is required');
}

const prisma = new PrismaService();
const isSecureOrigin = appUrl.startsWith('https://');

export const auth = betterAuth({
  baseURL: appUrl, // Used to build callback URLs & cookies
  secret: authSecret,
  // Where requests will be routed (keep default for now → /auth/*)
  basePath: '/api/auth',
  appName,

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
  advanced: {
    useSecureCookies: isSecureOrigin,
    defaultCookieAttributes: {
      sameSite: isSecureOrigin ? 'none' : 'lax',
      secure: isSecureOrigin,
    },
  },

  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const response = ctx.context.returned;

      console.log(`STRINGIFIED AFTER 👉:`, JSON.stringify(response, null, 2));
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
