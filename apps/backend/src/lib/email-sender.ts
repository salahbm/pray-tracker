import { Resend } from 'resend';
import * as pug from 'pug';
import path from 'path';
import { env } from '@/config/env.config';
import { Locale } from '@/common/utils/response.utils';
import { getLocalizedMessage } from '@/common/i18n/email-messages';
import { getLocalizedMessage as getErrorLocalizedMessage } from '@/common/i18n/error-messages';
import { APIError } from 'better-auth';
import { mapBetterAuthErrorToKey } from './better-auth-codes';

const resend = new Resend(env.RESEND_API_KEY);

export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string,
  token?: string,
  locale: Locale = 'en',
): Promise<void> {
  try {
    let resetToken = token;
    if (!resetToken && resetUrl) {
      const urlObj = new URL(resetUrl);
      resetToken = urlObj.searchParams.get('token') || '';
    }

    // Use web app redirect page for better email client compatibility
    // The page will automatically redirect to the mobile app deep link
    const webRedirectUrl = `https://pray-tracker.vercel.app/reset?token=${resetToken}`;

    const templatePath = path.join(
      process.cwd(),
      'src',
      'templates',
      'reset-password.pug',
    );

    const html = pug.renderFile(templatePath, {
      email,
      resetUrl: webRedirectUrl,
    });

    const res = await resend.emails.send({
      from: 'Noor App <no-reply@noor.salahm.uz>',
      to: email,
      subject: getLocalizedMessage('EMAIL_PASSWORD_RESET_TITLE', locale),
      html,
    });

    console.log(`Email is sent to 👉:`, JSON.stringify(res, null, 2));
  } catch (error: any) {
    console.error('Failed to send password reset email:', error);

    if (!error?.response) {
      throw error; // rethrow non-Resend errors
    }

    const key = mapBetterAuthErrorToKey(error.response.body?.code);
    const localized = getErrorLocalizedMessage(key, locale);

    throw new APIError('BAD_REQUEST', {
      ...error.response.body,
      message: localized,
    });
  }
}
