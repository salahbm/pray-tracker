import { registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import process from 'node:process';

/**
 * Allowed environment values.
 */
export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

/**
 * This class defines what env variables we expect and validates them.
 */
class EnvValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV?: Environment;

  @IsString()
  @IsNotEmpty()
  APP_NAME!: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  APP_URL?: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  APP_PORT!: number;

  @IsString()
  @IsOptional()
  APP_FALLBACK_LANGUAGE?: string;

  @IsOptional()
  APP_CORS_ORIGIN?: string[];
}

/**
 * The shape of config used inside the app.
 */
export interface AppConfig {
  nodeEnv: Environment;
  name: string;
  url: string;
  port: number;
  fallbackLanguage: string;
  corsOrigin: string[];
}

/**
 * Validates process.env using EnvValidator.
 * Throws if something is invalid so app doesn't start with bad config.
 */
function validateEnv() {
  const instance = plainToInstance(EnvValidator, process.env, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(instance, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(
      'Invalid environment variables:\n' +
        errors.map((e) => JSON.stringify(e.constraints)).join('\n'),
    );
  }
}

/**
 * Converts raw env strings into typed config.
 */
function loadConfig(): AppConfig {
  const port = Number(process.env.APP_PORT);

  return {
    nodeEnv: (process.env.NODE_ENV as Environment) || Environment.Development,
    name: process.env.APP_NAME!,
    url: process.env.APP_URL || `http://localhost:${port}`,
    port,
    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
    corsOrigin: parseCors(process.env.APP_CORS_ORIGIN),
  };
}

/**
 * Parses CORS env variable into usable format.
 */
function parseCors(value?: string): string[] {
  if (!value || value === 'false') return [];
  if (value === 'true') return [];
  if (value === '*') return [];
  return value.split(',').map((v) => v.trim());
}

/**
 * Registers the config and runs validation before returning it.
 */
export default registerAs<AppConfig>('app', () => {
  validateEnv();
  return loadConfig();
});
