import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';
import { AuthConfig } from './auth-config.type';
import validateConfig from '@/utils/config/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  BETTER_AUTH_URL: string;

  @IsString()
  @IsNotEmpty()
  SESSION_EXPIRES_IN: string;
}

export function auth(): AuthConfig {
  return {
    authSecret: process.env.BETTER_AUTH_URL,
    sessionExpiresIn: parseInt(process.env.SESSION_EXPIRES_IN || '60', 10),
  };
}

export default registerAs<AuthConfig>('auth', () => {
  console.info(`Registering AuthConfig from environment variables`);
  validateConfig(process.env, EnvironmentVariablesValidator);
  return auth();
});
