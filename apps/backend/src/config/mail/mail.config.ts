import { registerAs } from '@nestjs/config';
import { MailConfig } from './mail.type';

export default registerAs(
  'mail',
  (): MailConfig => ({
    RESEND_API_KEY: process.env.RESEND_API_KEY || '',
  }),
);
