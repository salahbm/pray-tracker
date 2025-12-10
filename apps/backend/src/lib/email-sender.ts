import { Resend } from 'resend';
import * as pug from 'pug';
import path from 'path';
import { env } from '@/config/env.config';

const resend = new Resend(env.RESEND_API_KEY);

export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string,
  token?: string,
): Promise<void> {
  try {
    let resetToken = token;
    if (!resetToken && resetUrl) {
      const urlObj = new URL(resetUrl);
      resetToken = urlObj.searchParams.get('token') || '';
    }

    const mobileResetUrl = `noor://(auth)/reset-pwd?token=${resetToken}`;

    const templatePath = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'templates',
      'reset-password.pug',
    );

    const html = pug.renderFile(templatePath, {
      email,
      resetUrl: mobileResetUrl,
    });

    await resend.emails.send({
      from: 'Noor App <onboarding@resend.dev>',
      to: email,
      subject: 'Reset Your Password - Noor App',
      html,
    });
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}
