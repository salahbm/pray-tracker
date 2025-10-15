import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { toNodeHandler as createNodeHandler } from 'better-call/node';
import type { RequestHandler } from 'express';
import { prisma } from '@prayer/db';

export type AuthMiddlewareOptions = {
  /**
   * Path prefix that Better Auth is mounted under. Defaults to `/api/auth`.
   */
  basePath?: string;
};

export const auth = betterAuth({
  appName: 'pray-tracker',
  trustedOrigins: [],
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  user: {
    modelName: 'user',
  },
  account: {
    modelName: 'account',
  },
  session: {
    modelName: 'session',
  },
  verification: {
    modelName: 'verification',
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 20,
  },
});

export const createAuthRequestHandler = () => createNodeHandler(auth.handler);

export const createAuthMiddleware = (
  options: AuthMiddlewareOptions = {},
): RequestHandler => {
  const handler = createAuthRequestHandler();
  const basePath = options.basePath ?? '/api/auth';

  return async (req, res, next) => {
    if (!req.originalUrl.startsWith(basePath)) {
      return next();
    }

    const originalUrl = req.url;

    try {
      req.url = req.originalUrl;
      await handler(req, res);
      if (!res.headersSent) {
        next();
      }
    } catch (error) {
      next(error);
    } finally {
      req.url = originalUrl;
    }
  };
};
