import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from '@/lib/auth';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/user.module';
import { PrayersModule } from './modules/prayers/prayers.module';

@Module({
  imports: [
    BetterAuthModule.forRoot({ auth }),
    AuthModule,
    UsersModule,
    PrayersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
