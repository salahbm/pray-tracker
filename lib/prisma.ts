import { PrismaClient } from './prisma/client';

const connectionString = process.env.EXPO_SECRET_DATABASE_URL;

if (!connectionString) {
  throw new Error('EXPO_SECRET_DATABASE_URL is not defined');
}

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
