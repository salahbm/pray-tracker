import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
declare global {
  // This is the type declaration for `globalThis.prisma` to be used globally
  // to avoid TypeScript errors in the rest of your application.
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  // In development, assign the Prisma client to globalThis to ensure
  // the same client instance is used across hot reloads.
  globalThis.prisma = prisma;
}

export const DB = prisma;
