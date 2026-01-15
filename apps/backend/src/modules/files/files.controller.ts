import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@/common/guards/auth.guard';
import { FilesService } from './files.service';
import { CreateAvatarPresignDto } from './dto/create-avatar-presign.dto';
import { ConfirmAvatarUploadDto } from './dto/confirm-avatar-upload.dto';

@Controller('files')
@UseGuards(AuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('avatar/presign')
  async createAvatarPresign(
    @Body() createAvatarPresignDto: CreateAvatarPresignDto,
    @Req() request: Request,
  ) {
    const userId = request.user?.id;
    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }
    return this.filesService.createAvatarPresignedUrl(
      userId,
      createAvatarPresignDto.fileName,
      createAvatarPresignDto.contentType,
    );
  }

  @Post('avatar/confirm')
  async confirmAvatar(
    @Body() confirmAvatarUploadDto: ConfirmAvatarUploadDto,
    @Req() request: Request,
  ) {
    const userId = request.user?.id;
    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }
    return this.filesService.confirmAvatarUpload(
      userId,
      confirmAvatarUploadDto.fileKey,
      confirmAvatarUploadDto.oldFileKey,
    );
  }
}
