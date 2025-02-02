import 'react-native-url-polyfill/auto';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

// Load database connection from environment variables
const connectionString = process.env.DATABASE_URL;

// Create a connection pool for efficient database management
const pool = new Pool({
  connectionString,
  max: 10, // Limit the number of connections (adjust based on needs)
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Timeout for acquiring a connection
});

// Use PrismaPg adapter to integrate Prisma with the connection pool
const adapter = new PrismaPg(pool);
const prisma = global.prisma || new PrismaClient({ adapter, log: ['error'] });

// Prevent multiple Prisma clients in development
if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
