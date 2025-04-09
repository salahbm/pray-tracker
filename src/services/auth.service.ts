// src/services/auth.service.ts
import { ApiError } from '../middleware/error-handler';
import {
  DEFAULT_MESSAGE_CODE,
  MessageCodes,
  StatusCode,
  SupabaseErrorMap,
} from '../utils/status';
import { supabase } from '../lib/supabase';

export class AuthService {
  static async register() {}

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
}
