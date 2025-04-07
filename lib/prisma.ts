import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

import { DATABASE_URL } from '@/constants/config';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

// Setup a shared Prisma instance using a connection pool
const pool = new Pool({ connectionString: DATABASE_URL });
const adapter = new PrismaPg(pool);

// Reuse Prisma client in dev to avoid too many instances
const prisma = global.prisma ?? new PrismaClient({ adapter, log: ['error'] });

if (process.env.APP_VARIANT === 'development') {
  global.prisma = prisma;
}

export default prisma;
