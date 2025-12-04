import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '@/config/env.config';
import { PrismaService } from '@/db/prisma.service';

@Injectable()
export class FilesService {
  private readonly s3Client: S3Client;
  private readonly logger = new Logger(FilesService.name);

  constructor(private readonly prisma: PrismaService) {
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      forcePathStyle: true,
      credentials: {
        accessKeyId: env.R2_ACCESS_KEY_ID,
        secretAccessKey: env.R2_SECRET_ACCESS_KEY,
      },
    });
  }

  private buildFileKey(userId: string, fileName: string) {
    return `users/${userId}/${Date.now()}-${fileName}`;
  }

  private async buildPublicUrl(key: string) {
    // Generate a presigned URL with 7 days expiration for viewing
    const command = new GetObjectCommand({
      Bucket: env.R2_BUCKET,
      Key: key,
    });

    try {
      const presignedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: 604800, // 7 days in seconds
      });
      return presignedUrl;
    } catch (error) {
      this.logger.error(
        'Failed to create presigned URL for viewing',
        error as Error,
      );
      throw new InternalServerErrorException('Failed to create view URL');
    }
  }

  private extractKeyFromUrl(path?: string) {
    if (!path) return undefined;

    try {
      // If it's a presigned URL, extract the key from the URL path
      if (path.includes('r2.cloudflarestorage.com')) {
        const url = new URL(path);
        // The pathname starts with '/', so remove it
        const key = url.pathname.substring(1);
        return key;
      }

      // If it's already a key (not a URL), return as is
      return path;
    } catch {
      this.logger.warn(`Failed to extract key from URL: ${path}`);
      return undefined;
    }
  }

  async createAvatarPresignedUrl(
    userId: string,
    fileName: string,
    contentType: string,
  ) {
    const key = this.buildFileKey(userId, fileName);
    const command = new PutObjectCommand({
      Bucket: env.R2_BUCKET,
      Key: key,
      ContentType: contentType,
    });

    try {
      const uploadUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: 604800, // 7 days for upload
      });

      return {
        uploadUrl,
        fileKey: key,
        publicUrl: '', // Will be generated after upload confirmation
      };
    } catch (error) {
      this.logger.error('Failed to create presigned URL', error as Error);
      throw new InternalServerErrorException('Failed to create upload URL');
    }
  }

  async confirmAvatarUpload(
    userId: string,
    fileKey: string,
    oldFileKey?: string,
  ) {
    // Generate presigned URL for viewing (7 days expiration)
    const publicUrl = await this.buildPublicUrl(fileKey);

    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: { image: publicUrl },
      });

      if (oldFileKey) {
        const normalizedOldKey = this.extractKeyFromUrl(oldFileKey);

        if (normalizedOldKey) {
          const deleteCommand = new DeleteObjectCommand({
            Bucket: env.R2_BUCKET,
            Key: normalizedOldKey,
          });

          try {
            await this.s3Client.send(deleteCommand);
          } catch (deleteError) {
            this.logger.warn(
              `Failed to delete old avatar ${normalizedOldKey}: ${(deleteError as Error).message}`,
            );
          }
        }
      }

      return { image: publicUrl, user };
    } catch (error) {
      this.logger.error('Failed to confirm avatar upload', error as Error);
      throw new InternalServerErrorException('Failed to confirm upload');
    }
  }
}
