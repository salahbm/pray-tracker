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
  pink_rose = 'pink_rose',
  vibrant_orange = 'vibrant_orange',
  emerald_green = 'emerald_green',
}

export type ThemesVariant = (typeof THEMES)[keyof typeof THEMES];

export type StatusBarThemeStyle = {
  [keys in ThemesVariant]: {
    style: StatusBarStyle;
    background: string;
  };
};

// ONLY the tokens your tailwind config expects
export type ThemeColorKeys =
  | '--background'
  | '--foreground'
  | '--primary'
  | '--primary-300'
  | '--primary-400'
  | '--primary-600'
  | '--primary-700'
  | '--primary-foreground'
  | '--muted'
  | '--muted-foreground'
  | '--border'
  | '--border-focus'
  | '--border-hover'
  | '--warning'
  | '--destructive'
  | '--success'
  | '--info';

export type ThemeColors = Record<ThemeColorKeys, string>;
export type AllThemes = Record<ThemesVariant, ThemeColors>;

/**
 * background / foreground
 * primary (+ shades + foreground)
 * muted / muted-foreground
 * border (+ focus + hover)
 * warning / destructive / success / info
 */
export const THEME_COLORS: AllThemes = {
  light: {
    '--background': '249 250 251',
    '--foreground': '24 24 24',

    '--primary': '52 152 219',
    '--primary-300': '194 224 244',
    '--primary-400': '143 198 235',
    '--primary-600': '44 129 186',
    '--primary-700': '36 106 153',
    '--primary-foreground': '255 255 255',

    '--muted': '229 231 235',
    '--muted-foreground': '75 85 99',

    '--border': '209 213 219',
    '--border-focus': '59 130 246',
    '--border-hover': '191 197 205',

    '--warning': '245 158 11',
    '--destructive': '230 57 70',
    '--success': '34 197 94',
    '--info': '59 130 246',
  },

  dark: {
    '--background': '18 18 18',
    '--foreground': '228 228 231',

    '--primary': '158 240 16',
    '--primary-300': '226 250 183',
    '--primary-400': '202 247 124',
    '--primary-600': '134 204 14',
    '--primary-700': '111 168 11',
    '--primary-foreground': '18 18 18',

    '--muted': '30 30 30',
    '--muted-foreground': '156 163 175',

    '--border': '48 54 61',
    '--border-focus': '59 130 246',
    '--border-hover': '70 76 82',

    '--warning': '245 158 11',
    '--destructive': '251 15 80',
    '--success': '34 197 94',
    '--info': '59 130 246',
  },

  forest_green: {
    '--background': '240 247 244',
    '--foreground': '45 71 57',

    '--primary': '139 168 136',
    '--primary-300': '220 229 219',
    '--primary-400': '191 207 190',
    '--primary-600': '118 143 116',
    '--primary-700': '97 118 95',
    '--primary-foreground': '255 255 255',

    '--muted': '212 231 211',
    '--muted-foreground': '107 143 113',

    '--border': '178 200 160',
    '--border-focus': '139 168 136',
    '--border-hover': '162 185 148',

    '--warning': '245 158 11',
    '--destructive': '217 108 108',
    '--success': '34 197 94',
    '--info': '59 130 246',
  },

  ocean_breeze: {
    '--background': '244 249 252',
    '--foreground': '42 66 88',

    '--primary': '126 170 203',
    '--primary-300': '216 230 239',
    '--primary-400': '184 208 226',
    '--primary-600': '107 144 173',
    '--primary-700': '88 119 142',
    '--primary-foreground': '255 255 255',

    '--muted': '214 230 242',
    '--muted-foreground': '114 155 183',

    '--border': '166 200 229',
    '--border-focus': '126 170 203',
    '--border-hover': '151 184 212',

    '--warning': '245 158 11',
    '--destructive': '217 108 108',
    '--success': '34 197 94',
    '--info': '59 130 246',
  },

  sunset: {
    '--background': '252 244 241',
    '--foreground': '94 61 54',

    '--primary': '208 156 137',
    '--primary-300': '241 225 220',
    '--primary-400': '229 201 190',
    '--primary-600': '177 133 116',
    '--primary-700': '146 109 96',
    '--primary-foreground': '255 255 255',

    '--muted': '240 219 211',
    '--muted-foreground': '200 159 150',

    '--border': '226 180 166',
    '--border-focus': '208 156 137',
    '--border-hover': '210 166 153',

    '--warning': '245 158 11',
    '--destructive': '179 95 95',
    '--success': '34 197 94',
    '--info': '59 130 246',
  },

  royal_purple: {
    '--background': '248 245 252',
    '--foreground': '60 43 74',

    '--primary': '163 134 182',
    '--primary-300': '219 207 229',
    '--primary-400': '206 182 213',
    '--primary-600': '139 114 155',
    '--primary-700': '114 94 127',
    '--primary-foreground': '255 255 255',

    '--muted': '230 218 242',
    '--muted-foreground': '153 132 179',

    '--border': '193 164 208',
    '--border-focus': '163 134 182',
    '--border-hover': '177 150 193',

    '--warning': '245 158 11',
    '--destructive': '179 95 95',
    '--success': '34 197 94',
    '--info': '59 130 246',
  },

  pink_rose: {
    '--background': '255 240 243',
    '--foreground': '74 43 50',

    '--primary': '255 107 149',
    '--primary-300': '255 196 213',
    '--primary-400': '255 166 191',
    '--primary-600': '217 91 127',
    '--primary-700': '178 75 104',
    '--primary-foreground': '255 255 255',

    '--muted': '255 214 224',
    '--muted-foreground': '199 137 155',

    '--border': '255 173 196',
    '--border-focus': '255 107 149',
    '--border-hover': '233 158 178',

    '--warning': '245 158 11',
    '--destructive': '230 57 70',
    '--success': '34 197 94',
    '--info': '59 130 246',
  },

  vibrant_orange: {
    '--background': '255 245 240',
    '--foreground': '74 51 40',

    '--primary': '255 140 90',
    '--primary-300': '255 209 189',
    '--primary-400': '255 186 156',
    '--primary-600': '217 119 76',
    '--primary-700': '178 98 63',
    '--primary-foreground': '255 255 255',

    '--muted': '255 224 209',
    '--muted-foreground': '199 149 128',

    '--border': '255 190 163',
    '--border-focus': '255 140 90',
    '--border-hover': '233 174 150',

    '--warning': '245 158 11',
    '--destructive': '230 57 70',
    '--success': '34 197 94',
    '--info': '59 130 246',
  },

  emerald_green: {
    '--background': '242 249 244',
    '--foreground': '47 69 53',

    '--primary': '135 167 138',
    '--primary-300': '207 220 208',
    '--primary-400': '183 200 184',
    '--primary-600': '115 142 117',
    '--primary-700': '94 117 97',
    '--primary-foreground': '255 255 255',

    '--muted': '209 228 211',
    '--muted-foreground': '123 159 132',

    '--border': '170 196 160',
    '--border-focus': '135 167 138',
    '--border-hover': '155 180 148',

    '--warning': '245 158 11',
    '--destructive': '179 95 95',
    '--success': '34 197 94',
    '--info': '59 130 246',
  },
};

export const Themes = {
  light: vars(THEME_COLORS.light),
  dark: vars(THEME_COLORS.dark),
  forest_green: vars(THEME_COLORS.forest_green),
  ocean_breeze: vars(THEME_COLORS.ocean_breeze),
  sunset: vars(THEME_COLORS.sunset),
  royal_purple: vars(THEME_COLORS.royal_purple),
  pink_rose: vars(THEME_COLORS.pink_rose),
  vibrant_orange: vars(THEME_COLORS.vibrant_orange),
  emerald_green: vars(THEME_COLORS.emerald_green),
};

export const StatusBarTheme: StatusBarThemeStyle = {
  light: { style: 'dark', background: '#fff' },
  dark: { style: 'light', background: '#000' },
  forest_green: { style: 'dark', background: '#1b2e23' },
  ocean_breeze: { style: 'dark', background: '#1b2e23' },
  sunset: { style: 'dark', background: '#2e1a1a' },
  royal_purple: { style: 'dark', background: '#1a0e2a' },
  vibrant_orange: { style: 'dark', background: '#2e1a1a' },
  emerald_green: { style: 'dark', background: '#1b2e23' },
  pink_rose: { style: 'dark', background: '#2e1a1a' },
};

export const TabTints: Record<THEMES, any> = {
  light: 'light',
  forest_green: 'regular',
  dark: 'default',
  ocean_breeze: 'dark',
  sunset: 'dark',
  royal_purple: 'dark',
  vibrant_orange: 'dark',
  emerald_green: 'dark',
  pink_rose: 'dark',
} as const;
