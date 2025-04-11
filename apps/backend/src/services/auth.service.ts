// src/services/auth.service.ts
import { ApiError } from '../middleware/error-handler';
import {
  DEFAULT_MESSAGE_CODE,
  MessageCodes,
  StatusCode,
  SupabaseErrorMap,
} from '../utils/status';
import { supabase } from '../lib/supabase';
import type {
  IUserDelete,
  IUserRegistrationParams,
  IVerifyOtpParams,
} from '../types/auth';
import { UserService } from './user.service';

export class AuthService {
  static async register(params: IUserRegistrationParams) {
    const { email, password, username } = params;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (error) {
      throw new ApiError({
        message: error.message,
        status: StatusCode.BAD_REQUEST,
        code: error.code as unknown as MessageCodes,
        details: error,
      });
    }

    return data;
  }

  static async login(email: string, password: string) {
    if (!email || !password) {
      throw new ApiError({
        message: 'Missing email or password',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
        details: { email, password },
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Get the message code from the error map, default to UNKNOWN_ERROR if not found
      const messageCode =
        SupabaseErrorMap[error?.code ?? 'unexpected_failure'] ||
        DEFAULT_MESSAGE_CODE;
      throw new ApiError({
        message: error?.message,
        status: StatusCode.INTERNAL_ERROR,
        code: messageCode,
        details: error,
      });
    }

    return {
      user: data.user,
      session: data.session,
    };
  }

  static async verifyOtp(params: IVerifyOtpParams) {
    const { email, token, type } = params;

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type,
    });

    if (error) {
      throw new ApiError({
        message: error.message,
        status: StatusCode.BAD_REQUEST,
        code: error.code as unknown as MessageCodes,
        details: error,
      });
    }

    return data;
  }

  static async updatePassword(email: string, password: string) {
    if (!email || !password) {
      throw new ApiError({
        message: 'Missing email or password',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.MISSING_REQUIRED_FIELDS,
        details: { email, password },
      });
    }

    const { error } = await supabase.auth.updateUser({
      email,
      password,
    });

    if (error) {
      throw new ApiError({
        message: error?.message,
        status: StatusCode.INTERNAL_ERROR,
        code: error.code as unknown as MessageCodes,
        details: error,
      });
    }

    return { updated: true };
  }

  static async requestPasswordReset(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      throw new ApiError({
        message: error?.message,
        status: StatusCode.INTERNAL_ERROR,
        code: error.code as unknown as MessageCodes,
        details: error,
      });
    }

    return data;
  }

  static async refreshSession(refresh_token: string) {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token,
    });

    if (error) {
      throw new ApiError({
        message: error?.message,
        status: StatusCode.INTERNAL_ERROR,
        code: error.code as unknown as MessageCodes,
        details: error,
      });
    }

    return data;
  }

  static async deleteUser(params: IUserDelete) {
    const { id, supabaseId } = params;

    // Delete user from Supabase
    const { error } = await supabase.auth.admin.deleteUser(supabaseId);

    if (error && error.code !== 'user_not_found') {
      throw new ApiError({
        message: error.message,
        status: StatusCode.INTERNAL_ERROR,
        code: error.code as unknown as MessageCodes,
        details: error,
      });
    }

    // Delete user from our database
    await UserService.deleteUser(id);

    return { success: true };
  }
}
