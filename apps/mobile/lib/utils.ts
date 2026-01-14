import { ThemeColors } from '@/styles/theme.config';
import { type ClassValue, clsx } from 'clsx';
import { processColor } from 'react-native';
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

export const rgb = (value: string) => {
  const [r, g, b] = value.split(' ').map(Number);
  return `rgb(${r}, ${g}, ${b})`;
};

export const rgba = (value: string, alpha: number) => {
  if (!value) return `rgba(0,0,0,${alpha})`;

  // If already rgb/rgba → just override alpha
  if (value.startsWith('rgb')) {
    const nums = value.match(/\d+(\.\d+)?/g)?.map(Number) ?? [];
    const [r = 0, g = 0, b = 0] = nums;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // If "R G B"
  const parts = value.split(' ').map(Number);
  if (parts.length === 3 && parts.every(n => !Number.isNaN(n))) {
    const [r, g, b] = parts;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Fallback
  return value;
};

export const animatedColor = (value: string, alpha = 1) => {
  const [r, g, b] = value.split(' ').map(Number);
  return processColor(`rgba(${r}, ${g}, ${b}, ${alpha})`);
};

// styles/theme.mapper.ts

export const mapThemeToRNColors = (theme: Record<string, string>): ThemeColors => {
  const out: Record<string, string> = {};

  for (const key in theme) {
    const value = theme[key];

    // If already rgb/rgba, leave it
    if (value.startsWith('rgb')) {
      out[key] = value;
      continue;
    }

    // Convert "R G B" → "rgba(R,G,B,1)"
    const parts = value.split(' ').map(Number);
    if (parts.length === 3 && parts.every(n => !Number.isNaN(n))) {
      const [r, g, b] = parts;
      out[key] = `rgba(${r}, ${g}, ${b}, 1)`;
    } else {
      out[key] = value; // fallback safe
    }
  }

  return out as ThemeColors;
};
