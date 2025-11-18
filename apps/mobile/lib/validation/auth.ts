import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type TSignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
