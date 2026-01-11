import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from '@/lib/auth';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/user.module';
import { PrayersModule } from './modules/prayers/prayers.module';
import { FriendsModule } from './modules/friends/friends.module';
import { LeaderboardModule } from './modules/leaderboard/leaderboard.module';
import { FilesModule } from './modules/files/files.module';
import { InquiriesModule } from './modules/inquiries/inquiries.module';

import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/common/guards/auth.guard';
import { PrismaService } from '@/db/prisma.service';
import { PrismaModule } from './db/prisma.module';

@Module({
  imports: [
    BetterAuthModule.forRoot({
      auth,
      global: false,
      disableGlobalAuthGuard: true,
    }),
    AuthModule,
    UsersModule,
    PrayersModule,
    FriendsModule,
    LeaderboardModule,
    FilesModule,
    PrismaModule,
    InquiriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
