import { NestFactory } from '@nestjs/core';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ALLOWED_ORIGINS } from '@/config/cors.config';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import express, { Request, Response } from 'express';

const expressApp = express();
let cachedApp: INestApplication | null = null;

async function createApp(): Promise<INestApplication> {
  if (cachedApp) {
    return cachedApp;
  }

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    {
      bodyParser: false,
      logger: ['error', 'warn'],
    },
  );

  // Enable global exception filter for localized error handling
  app.useGlobalFilters(new HttpExceptionFilter());

  // Enable global validation pipe for DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
  });

  await app.init();
  cachedApp = app;
  return app;
}

export default async (req: Request, res: Response): Promise<void> => {
  await createApp();
  expressApp(req, res);
};
