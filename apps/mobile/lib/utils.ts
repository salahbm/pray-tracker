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

/**
 * @description
 * Formats large numbers:
 * 1_000        → 1k
 * 1_000_000    → 1m
 * 1_000_000_000 → 1b
 *
 * @param points number
 * @returns string
 */
export const formatNumber = (points?: number): string => {
  if (points == null) return '0';

  const abs = Math.abs(points);

  if (abs >= 1_000_000_000) {
    return `${(points / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}b`;
  }

  if (abs >= 1_000_000) {
    return `${(points / 1_000_000).toFixed(1).replace(/\.0$/, '')}m`;
  }

  if (abs >= 1_000) {
    return `${(points / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
  }

  return points.toString();
};
