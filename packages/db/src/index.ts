import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import type { PoolConfig } from '@neondatabase/serverless';

const connectionString =
  process.env.DATABASE_URL ??
  process.env.DIRECT_URL ??
  process.env.DATABASE_DIRECT_URL;

if (!connectionString) {
  throw new Error(
    'DATABASE_URL (or DIRECT_URL / DATABASE_DIRECT_URL) must be set to initialise Prisma. ' +
      'Ensure your Neon connection string is available before importing @prayer/db.',
  );
}

const poolConfig: PoolConfig = {
  connectionString,
  allowExitOnIdle: true,
};

const adapter = new PrismaNeon(poolConfig);

type GlobalWithPrisma = typeof globalThis & {
  __prayerPrisma?: PrismaClient;
};

const globalForPrisma = globalThis as GlobalWithPrisma;

const createClient = () =>
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error']
        : ['error'],
  });

export const prisma = globalForPrisma.__prayerPrisma ?? createClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__prayerPrisma = prisma;
}

export const createPrismaClient = () => createClient();

export * from '@prisma/client';

export { FriendStatus } from './types';
export type {
  User,
  Pro,
  Friend,
  Prays,
  Award,
  Customer,
  Subscription,
  PrayerStats,
  Session,
  Account,
  Verification,
} from './types';
