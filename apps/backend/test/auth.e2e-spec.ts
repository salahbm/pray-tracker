import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import request from 'supertest';
import { toNodeHandler } from 'better-auth/node';

import { AppModule } from '@/app.module';
import { auth } from '@/lib/auth';
import { PrismaService } from '@/db/prisma.service';

const hasDatabase = Boolean(process.env.DATABASE_URL);
const describeWithDatabase = hasDatabase ? describe : describe.skip;

describeWithDatabase('Auth (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let testEmail: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule.main()],
    }).compile();

    app = moduleRef.createNestApplication({ bodyParser: false });
    app.use('/api/auth', toNodeHandler(auth));
    app.use(json({ limit: '10mb' }));
    app.use(urlencoded({ extended: true, limit: '10mb' }));
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

    await app.init();
    prisma = app.get(PrismaService);

    testEmail = `e2e-${Date.now()}@example.com`;
  });

  afterAll(async () => {
    if (prisma && testEmail) {
      await prisma.user.deleteMany({ where: { email: testEmail } });
    }
    await app.close();
  });

  it('returns a token on sign-up', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/sign-up/email')
      .send({
        email: testEmail,
        password: 'Password123!',
        name: 'E2E User',
      })
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({ email: testEmail }),
      }),
    );
  });

  it('returns a token on sign-in', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/sign-in/email')
      .send({
        email: testEmail,
        password: 'Password123!',
      })
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({ email: testEmail }),
      }),
    );
  });
});
