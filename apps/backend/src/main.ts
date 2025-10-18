import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from '@config/env.config';
import { ALLOWED_ORIGINS } from '@/config/cors.configt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const port: number = Number(env.PUBLIC_API_PORT) || 4000;
  app.enableCors({
    origin: ALLOWED_ORIGINS as string[],
    credentials: true,
  });

  await app.listen(port);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
