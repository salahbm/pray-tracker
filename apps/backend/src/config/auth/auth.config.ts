import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';
import { AuthConfig } from './auth-config.type';
import validateConfig from '@/utils/config/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  BETTER_AUTH_SECRET: string;
}

export function auth(): AuthConfig {
  return {
    authSecret: process.env.BETTER_AUTH_SECRET,
  };
}

export default registerAs<AuthConfig>('auth', () => {
  console.info(`Registering AuthConfig from environment variables`);
  validateConfig(process.env, EnvironmentVariablesValidator);
  return auth();
});
