import { AppConfig } from './app/app-config.type';
import { AuthConfig } from './auth/auth-config.type';
import { DatabaseConfig } from './database/database.type';
import { MailConfig } from './mail/mail.type';
import { CloudflareConfig } from './cloudflare/cloudflare.type';

export type GlobalConfig = {
  app: AppConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
  mail: MailConfig;
  cloudflare: CloudflareConfig;
};
