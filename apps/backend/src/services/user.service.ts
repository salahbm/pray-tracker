import type { User } from '../generated/prisma';
import { prisma } from '../lib/prisma';
import { supabase } from '../lib/supabase';
import { ApiError } from '../middleware/error-handler';

import { StatusCode, MessageCodes } from '../utils/status';

export class UserService {
  /**
   * Get top users
   * @returns  a list of top users
   */
  static async getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({
      orderBy: { totalPoints: 'desc' },
      take: 100,
    });
    return users;
  }

  /**
   * Get user by supabase id
   * @param supabaseId the supabase id of the user
   * @returns the user
   */
  static async getUserBySupabaseId(supabaseId: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { supabaseId } });

    if (!user) {
      throw new ApiError({
        message: 'User not found',
        status: StatusCode.NOT_FOUND,
        code: MessageCodes.USER_NOT_FOUND,
      });
    }

    if (user.isPro && user.proUntil && user.proUntil < new Date()) {
      await prisma.user.update({
        where: { supabaseId },
        data: { isPro: false, proUntil: null },
      });

      return prisma.user.findUnique({
        where: { supabaseId },
      }) as Promise<User>;
    }

    return user;
  }

  /**
   * Create user
   * @param data the data of the user
   * @returns the user
   */
  static async createUser(data: Partial<User>): Promise<User> {
    const { username, email, supabaseId, password } = data;

    if (!username || !email || !supabaseId || !password) {
      throw new ApiError({
        message: 'Missing required fields',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
        details: { username, email, supabaseId },
      });
    }

    return prisma.user.create({
      data: { username, email, supabaseId, password },
    });
  }

  /**
   * Upload avatar
   * @param buffer the buffer of the avatar
   * @param fileExt the ext of the avatar
   * @param oldImagePath the path of the avatar
   * @returns the path of the avatar
   */
  static async uploadAvatar(
    buffer: Buffer,
    fileExt: string,
    oldImagePath?: string
  ) {
    const path = `${Date.now()}.${fileExt}`;

    // Upload file to Supabase storage
    const { error: uploadError, data } = await supabase.storage
      .from('avatars')
      .upload(path, buffer, {
        contentType: `image/${fileExt}`,
        upsert: true,
      });

    if (uploadError) {
      throw new ApiError({ status: 500, message: uploadError.message });
    }

    if (!data?.path) {
      throw new ApiError({
        status: StatusCode.INTERNAL_ERROR,
        message: 'Failed to upload image',
        code: MessageCodes.INTERNAL_ERROR,
      });
    }

    // Get public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(data.path);

    const publicUrl = urlData?.publicUrl.replace('/avatars/', '/avatars//');

    if (!publicUrl) {
      throw new ApiError({
        status: StatusCode.INTERNAL_ERROR,
        message: 'Failed to get public URL',
        code: MessageCodes.INTERNAL_ERROR,
      });
    }

    // Delete old image if it exists
    if (oldImagePath) {
      await supabase.storage.from('avatars').remove([oldImagePath]);
    }

    return publicUrl;
  }

  /**
   * Update user
   * @param data the data of the user
   * @returns the user
   */
  static async updateUser(data: Partial<User> & { id: string }): Promise<User> {
    const { id, ...updateData } = data;

    if (!id) {
      throw new ApiError({
        message: 'Missing required ID',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
      });
    }

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError({
        message: 'User not found',
        status: StatusCode.NOT_FOUND,
        code: MessageCodes.USER_NOT_FOUND,
      });
    }

    return prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  /**
   * Delete user
   * @param id the id of the user
   * @returns the user
   */
  static async deleteUser(id: string): Promise<User> {
    if (!id) {
      throw new ApiError({
        message: 'Missing required ID',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
      });
    }

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError({
        message: 'User not found',
        status: StatusCode.NOT_FOUND,
        code: MessageCodes.USER_NOT_FOUND,
      });
    }

    return prisma.user.delete({ where: { id } });
  }
}
