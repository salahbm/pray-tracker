import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { TUser } from '@/types/user';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isProUser(user: TUser): boolean {
  const subs = user.customer?.subscriptions ?? [];
  return subs.some((sub) => sub.status === 'active');
}
