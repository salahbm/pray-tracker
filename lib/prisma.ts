import 'react-native-url-polyfill/auto';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionString,
    },
  },
  log: ['error'],
});

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
