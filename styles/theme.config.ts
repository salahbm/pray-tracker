// theme.config.ts
import { BlurTint } from 'expo-blur';
import { StatusBarStyle } from 'expo-status-bar';
import { vars } from 'nativewind';

export enum THEMES {
  light = 'light',
  dark = 'dark',
  forest_green = 'forest_green',
  ocean_breeze = 'ocean_breeze',
  sunset = 'sunset',
  royal_purple = 'royal_purple',
  sunset_orange = 'sunset_orange',
  golden_desert = 'golden_desert',
  emerald_green = 'emerald_green',
}

export type ThemesVariant = (typeof THEMES)[keyof typeof THEMES];

export type StatusBarThemeStyle = {
  [keys in ThemesVariant]: {
    style: StatusBarStyle;
    background: string;
  };
};

export type ThemeColorKeys =
  | '--background'
  | '--foreground'
  | '--muted'
  | '--muted-foreground'
  | '--popover'
  | '--popover-foreground'
  | '--card'
  | '--card-foreground'
  | '--border'
  | '--input'
  | '--primary'
  | '--primary-foreground'
  | '--secondary'
  | '--secondary-foreground'
  | '--accent'
  | '--accent-foreground'
  | '--destructive'
  | '--destructive-foreground'
  | '--ring';

export type ThemeColors = Record<ThemeColorKeys, string>;

export type AllThemes = Record<ThemesVariant, ThemeColors>;

export const THEME_COLORS: AllThemes = {
  light: {
    '--background': '#F9FAFB', // Softer white for better UX
    '--foreground': '#181818', // Darker text for strong contrast
    '--muted': '#E5E7EB', // Soft gray
    '--muted-foreground': '#4B5563', // Better readability
    '--popover': '#F3F4F6', // Slightly off-white for depth
    '--popover-foreground': '#181818',
    '--card': '#FFFFFF', // True white cards for modern look
    '--card-foreground': '#181818',
    '--border': '#D1D5DB', // Softer border
    '--input': '#E5E7EB',
    '--primary': '#3498db', // Vibrant blue
    '--primary-foreground': '#FFFFFF',
    '--secondary': '#6B7280', // Neutral gray
    '--secondary-foreground': '#FFFFFF',
    '--accent': '#FF5C5C', // More vibrant red
    '--accent-foreground': '#FFFFFF',
    '--destructive': '#E63946', // More modern danger color
    '--destructive-foreground': '#FFFFFF',
    '--ring': '#3B82F6', // Subtle yet distinct ring color
  },

  dark: {
    '--background': '#121212', // Deeper black for true dark mode
    '--foreground': '#E4E4E7', // Softer contrast than pure white
    '--muted': '#1E1E1E', // Deep muted gray
    '--muted-foreground': '#9CA3AF', // Readable gray
    '--popover': '#252525', // Slightly lighter than background
    '--popover-foreground': '#E4E4E7',
    '--card': '#1F1F1F', // Darker card for a more immersive feel
    '--card-foreground': '#E4E4E7',
    '--border': '#30363D', // Modern soft-dark border
    '--input': '#30363D',
    '--primary': '#9EF010', // Keeping your requested primary color
    '--primary-foreground': '#121212',
    '--secondary': '#282828', // Deep dark secondary
    '--secondary-foreground': '#E0E0E0',
    '--accent': '#7C83DB', // Cool modern blue accent
    '--accent-foreground': '#FFFFFF',
    '--destructive': '#FB0F50', // Strong, eye-catching red
    '--destructive-foreground': '#FFFFFF',
    '--ring': '#3B82F6', // Matches accent for consistency
  },
  forest_green: {
    '--background': '#f0f7f4',
    '--foreground': '#2d4739',
    '--muted': '#d4e7d3',
    '--muted-foreground': '#6b8f71',
    '--popover': '#e3efe8',
    '--popover-foreground': '#2d4739',
    '--card': '#d9e9d4',
    '--card-foreground': '#2d4739',
    '--border': '#b2c8a0',
    '--input': '#b2c8a0',
    '--primary': '#8ba888',
    '--primary-foreground': '#ffffff',
    '--secondary': '#c1d7be',
    '--secondary-foreground': '#2d4739',
    '--accent': '#a8c3a0',
    '--accent-foreground': '#ffffff',
    '--destructive': '#d96c6c',
    '--destructive-foreground': '#ffffff',
    '--ring': '#8ba888',
  },
  ocean_breeze: {
    '--background': '#f4f9fc',
    '--foreground': '#2a4258',
    '--muted': '#d6e6f2',
    '--muted-foreground': '#729bb7',
    '--popover': '#eaf4fc',
    '--popover-foreground': '#2a4258',
    '--card': '#dcecf8',
    '--card-foreground': '#2a4258',
    '--border': '#a6c8e5',
    '--input': '#a6c8e5',
    '--primary': '#7eaacb',
    '--primary-foreground': '#ffffff',
    '--secondary': '#b5d1e5',
    '--secondary-foreground': '#2a4258',
    '--accent': '#9cc2dc',
    '--accent-foreground': '#ffffff',
    '--destructive': '#d96c6c',
    '--destructive-foreground': '#ffffff',
    '--ring': '#7eaacb',
  },
  sunset: {
    '--background': '#fcf4f1',
    '--foreground': '#5e3d36',
    '--muted': '#f0dbd3',
    '--muted-foreground': '#c89f96',
    '--popover': '#f8e8e2',
    '--popover-foreground': '#5e3d36',
    '--card': '#f3d7cf',
    '--card-foreground': '#5e3d36',
    '--border': '#e2b4a6',
    '--input': '#e2b4a6',
    '--primary': '#d09c89',
    '--primary-foreground': '#ffffff',
    '--secondary': '#e8c3b6',
    '--secondary-foreground': '#5e3d36',
    '--accent': '#d4a99a',
    '--accent-foreground': '#ffffff',
    '--destructive': '#b35f5f',
    '--destructive-foreground': '#ffffff',
    '--ring': '#d09c89',
  },
  royal_purple: {
    '--background': '#f8f5fc',
    '--foreground': '#3c2b4a',
    '--muted': '#e6daf2',
    '--muted-foreground': '#9984b3',
    '--popover': '#efe7f7',
    '--popover-foreground': '#3c2b4a',
    '--card': '#dfcde6',
    '--card-foreground': '#3c2b4a',
    '--border': '#c1a4d0',
    '--input': '#c1a4d0',
    '--primary': '#a386b6',
    '--primary-foreground': '#ffffff',
    '--secondary': '#c7aedb',
    '--secondary-foreground': '#3c2b4a',
    '--accent': '#b39cc3',
    '--accent-foreground': '#ffffff',
    '--destructive': '#b35f5f',
    '--destructive-foreground': '#ffffff',
    '--ring': '#a386b6',
  },
  golden_desert: {
    '--background': '#fdf9f2',
    '--foreground': '#5a422f',
    '--muted': '#ede3d5',
    '--muted-foreground': '#bfa58d',
    '--popover': '#f7f1e8',
    '--popover-foreground': '#5a422f',
    '--card': '#ead8c4',
    '--card-foreground': '#5a422f',
    '--border': '#cfb599',
    '--input': '#cfb599',
    '--primary': '#b8987e',
    '--primary-foreground': '#ffffff',
    '--secondary': '#e3c9b0',
    '--secondary-foreground': '#5a422f',
    '--accent': '#d4b195',
    '--accent-foreground': '#ffffff',
    '--destructive': '#b35f5f',
    '--destructive-foreground': '#ffffff',
    '--ring': '#b8987e',
  },
  sunset_orange: {
    '--background': '#fdf5f2',
    '--foreground': '#5a2d2a',
    '--muted': '#e8cfc8',
    '--muted-foreground': '#b78679',
    '--popover': '#f6e4de',
    '--popover-foreground': '#5a2d2a',
    '--card': '#eed0c5',
    '--card-foreground': '#5a2d2a',
    '--border': '#dba797',
    '--input': '#dba797',
    '--primary': '#c98b7d',
    '--primary-foreground': '#ffffff',
    '--secondary': '#e2b3a3',
    '--secondary-foreground': '#5a2d2a',
    '--accent': '#d4a192',
    '--accent-foreground': '#ffffff',
    '--destructive': '#b35f5f',
    '--destructive-foreground': '#ffffff',
    '--ring': '#c98b7d',
  },
  emerald_green: {
    '--background': '#f2f9f4',
    '--foreground': '#2f4535',
    '--muted': '#d1e4d3',
    '--muted-foreground': '#7b9f84',
    '--popover': '#e8f3eb',
    '--popover-foreground': '#2f4535',
    '--card': '#dbe8dd',
    '--card-foreground': '#2f4535',
    '--border': '#aac4a0',
    '--input': '#aac4a0',
    '--primary': '#87a78a',
    '--primary-foreground': '#ffffff',
    '--secondary': '#b2d1b6',
    '--secondary-foreground': '#2f4535',
    '--accent': '#97c19e',
    '--accent-foreground': '#ffffff',
    '--destructive': '#b35f5f',
    '--destructive-foreground': '#ffffff',
    '--ring': '#87a78a',
  },
};

export const Themes = {
  light: vars(THEME_COLORS.light),
  dark: vars(THEME_COLORS.dark),
  forest_green: vars(THEME_COLORS.forest_green),
  ocean_breeze: vars(THEME_COLORS.ocean_breeze),
  sunset: vars(THEME_COLORS.sunset),
  royal_purple: vars(THEME_COLORS.royal_purple),
  golden_desert: vars(THEME_COLORS.golden_desert),
  emerald_green: vars(THEME_COLORS.emerald_green),
  sunset_orange: vars(THEME_COLORS.sunset_orange),
};

export const StatusBarTheme: StatusBarThemeStyle = {
  light: {
    style: 'dark',
    background: '#fff',
  },
  dark: {
    style: 'light',
    background: '#000',
  },
  forest_green: {
    style: 'dark',
    background: '#1b2e23',
  },
  ocean_breeze: {
    style: 'dark',
    background: '#1b2e23',
  },
  sunset: {
    style: 'dark',
    background: '#2e1a1a',
  },
  royal_purple: {
    style: 'dark',
    background: '#1a0e2a',
  },
  golden_desert: {
    style: 'dark',
    background: '#3e2f1b',
  },
  emerald_green: {
    style: 'dark',
    background: '#1b2e23',
  },
  sunset_orange: {
    style: 'dark',
    background: '#2e1a1a',
  },
};

export const TabTints: Record<THEMES, BlurTint> = {
  // Light Themes
  light: 'light',

  // Regular Themes
  forest_green: 'regular',

  // Darker Themes
  dark: 'default',
  ocean_breeze: 'dark',
  sunset: 'dark',
  royal_purple: 'dark',
  golden_desert: 'dark',
  emerald_green: 'dark',
  sunset_orange: 'dark',
} as const;
