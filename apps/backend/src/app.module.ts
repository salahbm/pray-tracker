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

import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/common/guards/auth.guard';

@Module({
  imports: [
    BetterAuthModule.forRoot({ auth, global: false, disableGlobalAuthGuard: true }),
    AuthModule,
    UsersModule,
    PrayersModule,
    FriendsModule,
    LeaderboardModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
