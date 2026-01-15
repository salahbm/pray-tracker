import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { PrismaService } from '@/db/prisma.service';

const hasDatabase = Boolean(process.env.DATABASE_URL);
const describeWithDatabase = hasDatabase ? describe : describe.skip;

describeWithDatabase('Auth (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let testEmail: string;
  let authToken: string;
  let userId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule.main()],
    }).compile();

    app = moduleRef.createNestApplication();
    // Body parser is enabled by default
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

  describe('Sign Up', () => {
    it('should create a new user and return token', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/sign-up/email')
        .send({
          email: testEmail,
          password: 'Password123!',
          name: 'E2E Test User',
        })
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          token: expect.any(String),
          user: expect.objectContaining({
            email: testEmail,
            name: 'E2E Test User',
            id: expect.any(String),
          }),
        }),
      );

      authToken = response.body.token;
      userId = response.body.user.id;
    });

    it('should fail with duplicate email', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/sign-up/email')
        .send({
          email: testEmail,
          password: 'Password123!',
          name: 'Duplicate User',
        })
        .expect(400);
    });

    it('should fail with invalid email', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/sign-up/email')
        .send({
          email: 'invalid-email',
          password: 'Password123!',
          name: 'Test User',
        })
        .expect(400);
    });

    it('should fail with short password', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/sign-up/email')
        .send({
          email: 'new@example.com',
          password: 'short',
          name: 'Test User',
        })
        .expect(400);
    });
  });

  describe('Sign In', () => {
    it('should sign in and return token', async () => {
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

      authToken = response.body.token;
    });

    it('should fail with wrong password', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/sign-in/email')
        .send({
          email: testEmail,
          password: 'WrongPassword123!',
        })
        .expect(400);
    });

    it('should fail with non-existent email', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/sign-in/email')
        .send({
          email: 'nonexistent@example.com',
          password: 'Password123!',
        })
        .expect(400);
    });
  });

  describe('Get Current User', () => {
    it('should return current user with valid token', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          user: expect.objectContaining({
            email: testEmail,
            id: userId,
          }),
          session: expect.any(Object),
        }),
      );
    });

    it('should fail without token', async () => {
      await request(app.getHttpServer()).get('/auth/me').expect(401);
    });

    it('should fail with invalid token', async () => {
      await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });

  describe('Sign Out', () => {
    it('should sign out successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signout')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          success: true,
          message: expect.any(String),
        }),
      );
    });

    it('should fail without token', async () => {
      await request(app.getHttpServer()).post('/auth/signout').expect(401);
    });
  });

  describe('Change Password', () => {
    let newAuthToken: string;

    beforeAll(async () => {
      // Sign in again to get a fresh token
      const response = await request(app.getHttpServer())
        .post('/api/auth/sign-in/email')
        .send({
          email: testEmail,
          password: 'Password123!',
        });
      newAuthToken = response.body.token;
    });

    it('should change password successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/change-password')
        .set('Authorization', `Bearer ${newAuthToken}`)
        .send({
          currentPassword: 'Password123!',
          newPassword: 'NewPassword123!',
          revokeOtherSessions: true,
        })
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          success: true,
        }),
      );
    });

    it('should sign in with new password', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/sign-in/email')
        .send({
          email: testEmail,
          password: 'NewPassword123!',
        })
        .expect(200);

      expect(response.body.token).toBeDefined();
      authToken = response.body.token;
    });

    it('should fail with wrong current password', async () => {
      await request(app.getHttpServer())
        .post('/auth/change-password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: 'WrongPassword123!',
          newPassword: 'AnotherPassword123!',
        })
        .expect(400);
    });
  });

  describe('Forgot Password', () => {
    it('should send password reset email', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/forget-password')
        .send({
          email: testEmail,
          redirectTo: 'mobile://reset-pwd',
        })
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('should not reveal if email exists (security)', async () => {
      // Should return 200 even for non-existent email
      await request(app.getHttpServer())
        .post('/api/auth/forget-password')
        .send({
          email: 'nonexistent@example.com',
          redirectTo: 'mobile://reset-pwd',
        })
        .expect(200);
    });
  });

  describe('List Sessions', () => {
    it('should list active sessions', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/sessions')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should fail without token', async () => {
      await request(app.getHttpServer()).get('/auth/sessions').expect(401);
    });
  });
});
