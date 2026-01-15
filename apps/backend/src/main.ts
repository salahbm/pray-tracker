import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.main());
  // Body parser is enabled by default in NestJS

  // Enable CORS
  app.enableCors({
    origin: process.env.APP_CORS_ORIGIN?.split(',') || '*',
    credentials: true,
  });

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
