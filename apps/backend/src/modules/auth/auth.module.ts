import {
  Global,
  Inject,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DiscoveryModule } from '@nestjs/core';
import { AuthGuard } from '@/common/guards/auth.guard';
import { betterAuth } from 'better-auth';
import { PrismaService } from '@/db/prisma.service';
import { createAuthConfig } from '@/lib/auth';
import type { Auth } from 'better-auth';
import { AUTH_INSTANCE } from '@/common/constants/auth.constants';

@Global()
@Module({
  imports: [DiscoveryModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGuard,
    PrismaService,
    {
      provide: AUTH_INSTANCE,
      useFactory: (prisma: PrismaService): Auth => {
        const config = createAuthConfig(prisma);
        return betterAuth(config);
      },
      inject: [PrismaService],
    },
  ],
  exports: [AuthService, AuthGuard, AUTH_INSTANCE],
})
export class AuthModule implements NestModule, OnModuleInit {
  private readonly logger = new Logger(AuthModule.name);

  constructor(@Inject(AUTH_INSTANCE) private readonly auth: Auth) {}

  onModuleInit() {
    this.logger.log('Auth module initialized');
  }

  configure(consumer: MiddlewareConsumer) {
    const basePath = '/api/auth';

    consumer
      .apply(async (req: any, res: any, next: any) => {
        try {
          // Construct full URL
          const protocol = req.protocol || 'http';
          const host = req.get('host');
          const url = `${protocol}://${host}${req.originalUrl}`;

          // Convert Express request to Web Request
          const headers = new Headers();
          Object.entries(req.headers).forEach(([key, value]) => {
            if (value) {
              headers.append(
                key,
                Array.isArray(value) ? value[0] : String(value as string),
              );
            }
          });

          // Handle body
          let body: string | undefined;
          if (req.body && Object.keys(req.body).length > 0) {
            body = JSON.stringify(req.body);
          }

          const webRequest = new Request(url, {
            method: req.method,
            headers,
            body:
              body && req.method !== 'GET' && req.method !== 'HEAD'
                ? body
                : undefined,
          });

          // Call Better Auth handler
          const authResponse = await this.auth.handler(webRequest);

          // Set status
          res.status(authResponse.status);

          // Set headers
          authResponse.headers.forEach((value, key) => {
            res.setHeader(key, value);
          });

          // Send response
          const contentType = authResponse.headers.get('content-type') ?? '';
          if (contentType.includes('application/json')) {
            res.json(await authResponse.json());
          } else {
            res.send(await authResponse.text());
          }
        } catch (error) {
          this.logger.error('Auth handler error:', error);
          next(error);
        }
      })
      .forRoutes(`${basePath}/*`);

    this.logger.log(`Better Auth mounted at ${basePath}/*`);
  }
}
