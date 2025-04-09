// lib/prisma.ts

import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from './prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.EXPO_SECRET_DATABASE_URL;

if (!connectionString) {
  throw new Error('EXPO_SECRET_DATABASE_URL is not defined');
}

// Create connection configuration
const config = {
  connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Create the pg-adapter
const adapter = new PrismaPg({
  connectionString: config.connectionString,
  max: config.max,
  idleTimeoutMillis: config.idleTimeoutMillis,
  connectionTimeoutMillis: config.connectionTimeoutMillis,
});

// Reuse the PrismaClient in dev
const prisma = global.prisma ?? new PrismaClient({ adapter });

if (process.env.EXPO_PUBLIC_APP_VARIANT === 'development') {
  global.prisma = prisma;
}

export default prisma;
