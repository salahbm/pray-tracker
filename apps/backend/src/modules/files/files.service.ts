import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
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
      region: env.R2_REGION,
      endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env.R2_ACCESS_KEY_ID,
        secretAccessKey: env.R2_SECRET_ACCESS_KEY,
      },
    });
  }

  private buildFileKey(userId: string, fileName: string) {
    return `users/${userId}/${Date.now()}-${fileName}`;
  }

  private buildPublicUrl(key: string) {
    const baseUrl = env.R2_PUBLIC_BASE_URL.replace(/\/$/, '');
    return `${baseUrl}/${key}`;
  }

  private extractKeyFromUrl(path?: string) {
    if (!path) return undefined;

    const sanitizedBase = env.R2_PUBLIC_BASE_URL.replace(/\/$/, '');
    const normalized = path.replace(`${sanitizedBase}/`, '');

    return normalized.startsWith('http')
      ? normalized.split('/').slice(3).join('/')
      : normalized;
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
        expiresIn: 300,
      });
      return {
        uploadUrl,
        fileKey: key,
        publicUrl: this.buildPublicUrl(key),
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
    const publicUrl = this.buildPublicUrl(fileKey);

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
