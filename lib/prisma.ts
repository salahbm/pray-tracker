// import 'dotenv/config';
// import { Pool, neonConfig } from '@neondatabase/serverless';
// import { PrismaNeon } from '@prisma/adapter-neon';
// import { PrismaClient } from '@prisma/client';
// import ws from 'ws';
// neonConfig.webSocketConstructor = ws;

// // To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
// // neonConfig.poolQueryViaFetch = true

// // Type definitions
// // declare global {
// //   var prisma: PrismaClient | undefined
// // }

// const connectionString = process.env.DATABASE_URL;

// const pool = new Pool({ connectionString });
// const adapter = new PrismaNeon(pool);
// const prisma = global.prisma || new PrismaClient({ adapter, log: ['error'] });

// if (process.env.NODE_ENV === 'development') global.prisma = prisma;

// export default prisma;
import 'dotenv/config';
import 'react-native-url-polyfill/auto';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
