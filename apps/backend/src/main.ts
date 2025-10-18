import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ORIGINS } from '@/constants/origins';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const port = process.env.PUBLIC_API_PORT ?? 3333;
  app.enableCors({
    origin: ORIGINS as string[],
    credentials: true,
  });
  await app.listen(port);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
