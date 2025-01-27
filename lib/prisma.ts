import 'react-native-url-polyfill/auto';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);
const prisma = global.prisma || new PrismaClient({ adapter, log: ['error'] });

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
