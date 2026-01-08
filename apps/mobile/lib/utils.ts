import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

/**
 * @description Hides up to 4 characters in the middle of an email address
 * @param email - The email address to hide
 * @returns The hidden email address
 */
export const gibberishEmail = (email?: string): string => {
  if (!email) return '';

  const [local, domain] = email.split('@');
  if (!domain) return email; // invalid email safeguard

  // If local part is too short, fully mask it
  if (local.length <= 2) {
    return `${'*'.repeat(local.length)}@${domain}`;
  }

  const hideCount = Math.min(4, local.length - 2);
  const start = Math.floor((local.length - hideCount) / 2);

  const maskedLocal =
    local.slice(0, start) + '*'.repeat(hideCount) + local.slice(start + hideCount);

  return `${maskedLocal}@${domain}`;
};
