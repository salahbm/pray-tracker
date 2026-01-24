import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';

import appConfig from '@/config/app/app.config';
import authConfig from './config/auth/auth.config';
import databaseConfig from './config/database/database.config';
import mailConfig from './config/mail/mail.config';
import clouflareConfig from './config/cloudflare/clouflare.config';
import { PrismaModule } from './db/prisma.module';
import { UsersModule } from './modules/users/user.module';
import { PrayersModule } from './modules/prayers/prayers.module';
import { FriendsModule } from './modules/friends/friends.module';
import { FilesModule } from './modules/files/files.module';
import { InquiriesModule } from './modules/inquiries/inquiries.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { HttpExceptionFilter } from './common/filters';
import { AuthModule } from './modules/auth/auth.module';
import useI18nFactory from './i18n/i18n.factory';
import { OnboardingModule } from './modules/onboarding/onboarding.module';
import { FastingModule } from './modules/fasting/fasting.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({})
export class AppModule {
  /**
   * Shared infrastructure between API and worker processes.
   * This prevents duplication and ensures consistent config/logging/auth.
   */
  private static common(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        // Loads env + app config once globally
        ConfigModule.forRoot({
          isGlobal: true,
          load: [
            appConfig,
            authConfig,
            databaseConfig,
            mailConfig,
            clouflareConfig,
          ],
          envFilePath: ['.env'],
        }),

        // Structured JSON logging with runtime config
        // LoggerModule.forRootAsync({
        //   imports: [ConfigModule],
        //   inject: [ConfigService],
        //   useFactory: useLoggerFactory,
        // }),

        // Global Prisma database module
        PrismaModule,

        // Auth module with Better Auth integration
        AuthModule,

        // User module for profile management
        UsersModule,

        // Prayers module for prayer management
        PrayersModule,

        // Friends module for friend management
        FriendsModule,

        // Files module for file management
        FilesModule,

        // Inquiries module for inquiries management
        InquiriesModule,

        // Notifications module for notifications management
        NotificationsModule,

        // Onboarding module for onboarding preferences
        OnboardingModule,

        // Fasting module for fasting history management
        FastingModule,

        // Admin module for admin dashboard
        AdminModule,
      ],
    };
  }

  /**
   * Main HTTP API process.
   * Adds i18n because only the API needs request-based language resolution.
   */
  static main(): DynamicModule {
    const common = this.common();

    return {
      module: AppModule,
      imports: [
        ...(common.imports ?? []),

        // i18n only in API process
        I18nModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: useI18nFactory,

          // Language resolution order:
          // 1) x-language custom header (highest priority)
          // 2) ?lang= query
          // 3) Accept-Language header
          // 4) fallback language from factory
          resolvers: [
            new HeaderResolver(['x-language']),
            new AcceptLanguageResolver(),
            { use: QueryResolver, options: ['lang'] },
          ],
        }),
      ],
      providers: [
        // Global response interceptor for consistent API responses
        // {
        //   provide: APP_INTERCEPTOR,
        //   useClass: ResponseInterceptor,
        // },
        // Global exception filters with i18n support
        {
          provide: APP_FILTER,
          useClass: HttpExceptionFilter,
        },
      ],
    };
  }

  /**
   * Worker process (queues, cron jobs, async processing).
   * Does NOT load i18n or HTTP-only modules.
   */
  static worker(): DynamicModule {
    const common = this.common();

    return {
      module: AppModule,
      imports: [...(common.imports ?? [])],
    };
  }
}
