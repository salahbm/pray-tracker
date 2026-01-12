import { registerAs } from '@nestjs/config';
import { CloudflareConfig } from './cloudflare.type';

export default registerAs(
  'cloudflare',
  (): CloudflareConfig => ({
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID || '',
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY || '',
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID || '',
    R2_BUCKET: process.env.R2_BUCKET || '',
  }),
);
