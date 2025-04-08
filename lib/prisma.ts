import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Setup a shared Prisma instance using a connection pool
const pool = new Pool({
  connectionString: process.env.EXPO_SECRET_DATABASE_URL,
});

const adapter = new PrismaPg(pool);

// Reuse Prisma client in dev to avoid too many instances
const prisma = global.prisma ?? new PrismaClient({ adapter, log: ['error'] });

if (process.env.EXPO_PUBLIC_APP_VARIANT === 'development') {
  global.prisma = prisma;
}

export default prisma;

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient({
//   log: ['error'],
// });

// export default prisma;
