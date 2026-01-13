import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { auth } from './lib/auth';
import { toNodeHandler } from 'better-auth/node';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.main(), {
    bodyParser: false, // We'll configure it manually
  });

  // Enable CORS
  app.enableCors({
    origin: process.env.APP_CORS_ORIGIN?.split(',') || '*',
    credentials: true,
  });

  // Register Better Auth handler FIRST (needs raw body)
  const betterAuthHandler = toNodeHandler(auth);
  app.use('/api/auth', betterAuthHandler);

  // Enable body parsing for all other routes
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  // Enable validation pipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 4000, process.env.HOST ?? '0.0.0.0');
}
bootstrap().catch((error) => {
  console.error('Failed to start the application:', error);
});
