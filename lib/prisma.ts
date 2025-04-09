import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from './prisma/client';

const connectionString = process.env.EXPO_SECRET_DATABASE_URL;

if (!connectionString) {
  throw new Error('EXPO_SECRET_DATABASE_URL is not defined');
}

// Supabase has connection limits. Keep pool small for serverless.
const adapter = new PrismaPg({
  connectionString,
  max: 3, // keep this low (Supabase free plan allows 10 connections)
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000,
});

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // Avoid relying on global in Vercel's serverless production
  prisma = new PrismaClient({ adapter });
} else {
  // In development, use a global to avoid re-creating the client on every reload
  if (!global.prisma) {
    global.prisma = new PrismaClient({ adapter });
  }
  prisma = global.prisma;
}

export default prisma;
