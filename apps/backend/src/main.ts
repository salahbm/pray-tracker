import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { env } from '@config/env.config';
import { ALLOWED_ORIGINS } from '@/config/cors.config';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const port: number = Number(env.PUBLIC_API_PORT) || 4000;

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

  await app.listen(port);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
