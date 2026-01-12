import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './database.type';

export default registerAs(
  'database',
  (): DatabaseConfig => ({
    DATABASE_URL: process.env.DATABASE_URL || '',
  }),
);
