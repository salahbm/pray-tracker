import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { PrismaService } from '@/db/prisma.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
  imports: [NotificationsModule],
  controllers: [FriendsController],
  providers: [FriendsService, PrismaService, NotificationsService],
  exports: [FriendsService],
})
export class FriendsModule {}
