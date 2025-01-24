// theme.config.ts
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
    '--background': '#ffffff',
    '--foreground': '#1e1e1e',
    '--muted': '#f5f5f5',
    '--muted-foreground': '#4e4e4e',
    '--popover': '#eaeaea',
    '--popover-foreground': '#1e1e1e',
    '--card': '#f0f0f0',
    '--card-foreground': '#1e1e1e',
    '--border': '#d6d6d6',
    '--input': '#eaeaea',
    '--primary': '#3498db',
    '--primary-foreground': '#ffffff',
    '--secondary': '#95a5a6',
    '--secondary-foreground': '#1e1e1e',
    '--accent': '#e74c3c',
    '--accent-foreground': '#ffffff',
    '--destructive': '#e74c3c',
    '--destructive-foreground': '#ffffff',
    '--ring': '#3498db',
  },
  dark: {
    '--background': '#000000',
    '--foreground': '#f5f5f5',
    '--muted': '#1e1e1e',
    '--muted-foreground': '#adb3bf',
    '--popover': '#252525',
    '--popover-foreground': '#eaeaea',
    '--card': '#858682',
    '--card-foreground': '#f5f5f5',
    '--border': '#6a5acd',
    '--input': '#6a5acd',
    '--primary': '#a7ff07',
    '--primary-foreground': '#ffffff',
    '--secondary': '#282828',
    '--secondary-foreground': '#e0e0e0',
    '--accent': '#7c83db',
    '--accent-foreground': '#ffffff',
    '--destructive': '#fb0f50',
    '--destructive-foreground': '#ffffff',
    '--ring': '#00aaff',
  },
  forest_green: {
    '--background': '#1b3022',
    '--foreground': '#d9f8c4',
    '--muted': '#2a4230',
    '--muted-foreground': '#98c482',
    '--popover': '#354c39',
    '--popover-foreground': '#d9f8c4',
    '--card': '#3e5d46',
    '--card-foreground': '#d9f8c4',
    '--border': '#75c044',
    '--input': '#75c044',
    '--primary': '#6fba1c',
    '--primary-foreground': '#ffffff',
    '--secondary': '#435942',
    '--secondary-foreground': '#d9f8c4',
    '--accent': '#8ccf68',
    '--accent-foreground': '#ffffff',
    '--destructive': '#ff5e5e',
    '--destructive-foreground': '#ffffff',
    '--ring': '#75c044',
  },
  ocean_breeze: {
    '--background': '#0e2439',
    '--foreground': '#e3f2fd',
    '--muted': '#1b4a6b',
    '--muted-foreground': '#aed7ff',
    '--popover': '#164461',
    '--popover-foreground': '#e3f2fd',
    '--card': '#1e5273',
    '--card-foreground': '#e3f2fd',
    '--border': '#47b8e0',
    '--input': '#47b8e0',
    '--primary': '#0eaaff',
    '--primary-foreground': '#ffffff',
    '--secondary': '#1d729c',
    '--secondary-foreground': '#e3f2fd',
    '--accent': '#5dd4ff',
    '--accent-foreground': '#ffffff',
    '--destructive': '#f8676a',
    '--destructive-foreground': '#ffffff',
    '--ring': '#0eaaff',
  },
  sunset: {
    '--background': '#2e1a1a',
    '--foreground': '#fddbcf',
    '--muted': '#4a2828',
    '--muted-foreground': '#ffa07a',
    '--popover': '#4e2929',
    '--popover-foreground': '#fddbcf',
    '--card': '#5a3030',
    '--card-foreground': '#fddbcf',
    '--border': '#ff4500',
    '--input': '#ff4500',
    '--primary': '#ff6347',
    '--primary-foreground': '#ffffff',
    '--secondary': '#ff8c69',
    '--secondary-foreground': '#2e1a1a',
    '--accent': '#ffa07a',
    '--accent-foreground': '#ffffff',
    '--destructive': '#ff4500',
    '--destructive-foreground': '#ffffff',
    '--ring': '#ff6347',
  },
  royal_purple: {
    '--background': '#1a0e2a',
    '--foreground': '#eae2fc',
    '--muted': '#29144d',
    '--muted-foreground': '#a98ef8',
    '--popover': '#35185f',
    '--popover-foreground': '#eae2fc',
    '--card': '#482074',
    '--card-foreground': '#eae2fc',
    '--border': '#9c27b0',
    '--input': '#9c27b0',
    '--primary': '#6a1b9a',
    '--primary-foreground': '#ffffff',
    '--secondary': '#7e57c2',
    '--secondary-foreground': '#eae2fc',
    '--accent': '#b39ddb',
    '--accent-foreground': '#ffffff',
    '--destructive': '#e91e63',
    '--destructive-foreground': '#ffffff',
    '--ring': '#9c27b0',
  },
  golden_desert: {
    '--background': '#3e2f1b',
    '--foreground': '#f7e1ba',
    '--muted': '#5a4322',
    '--muted-foreground': '#dab88b',
    '--popover': '#664e2a',
    '--popover-foreground': '#f7e1ba',
    '--card': '#7d6134',
    '--card-foreground': '#f7e1ba',
    '--border': '#c69c6d',
    '--input': '#c69c6d',
    '--primary': '#ffcc80',
    '--primary-foreground': '#ffffff',
    '--secondary': '#ffd54f',
    '--secondary-foreground': '#3e2f1b',
    '--accent': '#ffab40',
    '--accent-foreground': '#ffffff',
    '--destructive': '#f4511e',
    '--destructive-foreground': '#ffffff',
    '--ring': '#ffcc80',
  },
  emerald_green: {
    '--background': '#1b2e23',
    '--foreground': '#d6f6d6',
    '--muted': '#2a4531',
    '--muted-foreground': '#a0d4a0',
    '--popover': '#325f4a',
    '--popover-foreground': '#d6f6d6',
    '--card': '#3d5f4b',
    '--card-foreground': '#d6f6d6',
    '--border': '#4caf50',
    '--input': '#4caf50',
    '--primary': '#2e7d32',
    '--primary-foreground': '#ffffff',
    '--secondary': '#388e3c',
    '--secondary-foreground': '#d6f6d6',
    '--accent': '#689f38',
    '--accent-foreground': '#ffffff',
    '--destructive': '#d32f2f',
    '--destructive-foreground': '#ffffff',
    '--ring': '#2e7d32',
  },
  sunset_orange: {
    '--background': '#2e1a1a',
    '--foreground': '#fddbcf',
    '--muted': '#4a2828',
    '--muted-foreground': '#ffa07a',
    '--popover': '#4e2929',
    '--popover-foreground': '#fddbcf',
    '--card': '#5a3030',
    '--card-foreground': '#fddbcf',
    '--border': '#ff4500',
    '--input': '#ff4500',
    '--primary': '#ff6347',
    '--primary-foreground': '#ffffff',
    '--secondary': '#ff8c69',
    '--secondary-foreground': '#2e1a1a',
    '--accent': '#ffa07a',
    '--accent-foreground': '#ffffff',
    '--destructive': '#d32f2f',
    '--destructive-foreground': '#ffffff',
    '--ring': '#ff6347',
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
    style: 'light',
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
