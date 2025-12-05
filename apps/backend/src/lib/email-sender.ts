import nodemailer from 'nodemailer';
import * as pug from 'pug';
import { env } from '@/config/env.config';
import path from 'path';
// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST, // smtp.gmail.com for Gmail
  port: parseInt(env.EMAIL_PORT),
  secure: false, // true for 465, false for other ports like 587
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS, // Use App Password for Gmail
  },
});

export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string,
  token?: string,
): Promise<void> {
  try {
    // Extract token from URL if not provided
    let resetToken = token;
    if (!resetToken && resetUrl) {
      const urlObj = new URL(resetUrl);
      resetToken = urlObj.searchParams.get('token') || '';
    }

    // Create mobile deep link - Expo Router format with (auth) group
    const mobileResetUrl = `mobile://(auth)/reset-pwd?token=${resetToken}`;

    // Template path - works in both dev (ts-node) and prod (compiled)
    // In dev: __dirname = /path/to/apps/backend/src/lib
    // In prod: __dirname = /path/to/apps/backend/dist/lib
    const templatePath = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'templates',
      'reset-password.pug',
    );

    // Send the email
    const info = await transporter.sendMail({
      from: `Noor Pray Tracker <${env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset Your Password - Noor Pray Tracker',
      html: pug.renderFile(templatePath, {
        email,
        resetUrl: mobileResetUrl,
      }),
    });

    console.log('Password reset email sent:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}
