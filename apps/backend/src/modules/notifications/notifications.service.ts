import { Injectable, Logger } from '@nestjs/common';
import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';
import { PrismaService } from '../../db/prisma.service';
import { getLocalizedNotification, Locale } from '@/common/i18n';

export type NotificationType =
  | 'FRIEND_REQUEST'
  | 'FRIEND_REQUEST_ACCEPTED'
  | 'ADDED_TO_GROUP';

interface NotificationData {
  type: NotificationType;
  [key: string]: any;
}

@Injectable()
export class NotificationsService {
  private expo: Expo;
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private prisma: PrismaService) {
    this.expo = new Expo();
  }

  /**
   * Send a push notification to a user
   */
  async sendPushNotification(
    userId: string,
    title: string,
    body: string,
    data?: NotificationData,
  ): Promise<void> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { pushToken: true, locale: true },
      });

      if (!user?.pushToken) {
        this.logger.warn(`No push token found for user ${userId}`);
        return;
      }

      // Check that the push token is valid
      if (!Expo.isExpoPushToken(user.pushToken)) {
        this.logger.warn(`Invalid Expo push token for user ${userId}`);
        return;
      }

      const message: ExpoPushMessage = {
        to: user.pushToken,
        sound: 'default',
        title,
        body,
        data: data || {},
        priority: 'high',
      };

      const chunks = this.expo.chunkPushNotifications([message]);
      const tickets: ExpoPushTicket[] = [];

      for (const chunk of chunks) {
        try {
          const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          this.logger.error(`Error sending push notification chunk: ${error}`);
        }
      }

      // Check for errors in tickets
      for (const ticket of tickets) {
        if (ticket.status === 'error') {
          const errorMessage = ticket.message || 'Unknown error';

          // Check if it's an APNs credentials error
          if (errorMessage.includes('APNs credentials')) {
            this.logger.warn(
              `APNs credentials not configured. This is expected in development. ` +
                `Run 'eas credentials' to configure push notification credentials for production.`,
            );
          } else if (errorMessage.includes('DeviceNotRegistered')) {
            this.logger.warn(
              `Device token is no longer valid for user ${userId}. Token may have expired.`,
            );
            // Optionally: Clear the invalid token from database
            await this.prisma.user.update({
              where: { id: userId },
              data: { pushToken: null },
            });
          } else {
            this.logger.error(
              `Error in push notification ticket: ${errorMessage}`,
            );
          }
        }
      }

      if (tickets.some((t) => t.status === 'ok')) {
        this.logger.log(
          `Push notification sent successfully to user ${userId}`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Failed to send push notification to user ${userId}: ${error}`,
      );
    }
  }

  /**
   * Send friend request notification
   */
  async sendFriendRequestNotification(
    recipientId: string,
    senderName: string,
    senderEmail: string,
    locale: Locale = 'en',
  ): Promise<void> {
    const title = getLocalizedNotification('FRIEND_REQUEST_TITLE', locale);
    const body = getLocalizedNotification('FRIEND_REQUEST_BODY', locale, {
      senderName,
      senderEmail,
    });

    await this.sendPushNotification(recipientId, title, body, {
      type: 'FRIEND_REQUEST',
      senderName,
      senderEmail,
    });
  }

  /**
   * Send friend request accepted notification
   */
  async sendFriendRequestAcceptedNotification(
    recipientId: string,
    accepterName: string,
    locale: Locale = 'en',
  ): Promise<void> {
    const title = getLocalizedNotification(
      'FRIEND_REQUEST_ACCEPTED_TITLE',
      locale,
    );
    const body = getLocalizedNotification(
      'FRIEND_REQUEST_ACCEPTED_BODY',
      locale,
      { accepterName },
    );

    await this.sendPushNotification(recipientId, title, body, {
      type: 'FRIEND_REQUEST_ACCEPTED',
      accepterName,
    });
  }

  /**
   * Send added to group notification
   */
  async sendAddedToGroupNotification(
    recipientId: string,
    groupName: string,
    adderName: string,
    locale: Locale = 'en',
  ): Promise<void> {
    const title = getLocalizedNotification('ADDED_TO_GROUP_TITLE', locale);
    const body = getLocalizedNotification('ADDED_TO_GROUP_BODY', locale, {
      adderName,
      groupName,
    });

    await this.sendPushNotification(recipientId, title, body, {
      type: 'ADDED_TO_GROUP',
      groupName,
      adderName,
    });
  }
}
