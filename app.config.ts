import 'dotenv/config';
import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const APP_VARIANT = process.env.APP_VARIANT ?? 'development';

  return {
    ...config,
    name: 'Pray Tracker',
    slug: 'pray-tracker',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon-light.png',
    scheme: 'salahdev-prayer-tracker',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,

    experiments: {
      typedRoutes: true,
    },

    ios: {
      supportsTablet: true,
      bundleIdentifier:
        APP_VARIANT === 'development'
          ? 'com.salahdev.prayerTracker.dev'
          : 'com.salahdev.prayerTracker',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },

    android: {
      package:
        APP_VARIANT === 'development'
          ? 'com.salahdev.prayerTracker.dev'
          : 'com.salahdev.prayerTracker',
      adaptiveIcon: {
        foregroundImage: './assets/images/icon-light.png',
        backgroundColor: '#ffffff',
      },
    },

    web: {
      bundler: 'metro',
      output: 'server',
      favicon: './assets/images/favicon.png',
    },

    plugins: [
      [
        'expo-router',
        {
          origin: 'https://prayer-tracker.dev',
        },
      ],
      [
        'expo-splash-screen',
        {
          image: './assets/images/icon-light.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            image: './assets/images/icon-dark.png',
            backgroundColor: '#000000',
          },
        },
      ],
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission:
            'Allow Pray Tracker to access your location to calculate accurate prayer times based on where you are.',
        },
      ],
      [
        'expo-notifications',
        {
          permissions: {
            alert:
              'Allow Pray Tracker to send you notifications for upcoming prayer times.',
            badge:
              'Allow Pray Tracker to update the badge number on the app icon.',
            sound: 'Allow Pray Tracker to play a sound for prayer time alerts.',
          },
        },
      ],
      [
        'expo-sensors',
        {
          motionPermission:
            'Allow Pray Tracker to access device motion to improve Qibla direction detection.',
        },
      ],
      'expo-image-picker',
      'expo-localization',
      '@prisma/react-native',
    ],

    locales: {
      en: './locales/en.json',
      ru: './locales/ru.json',
      uz: './locales/uz.json',
      ko: './locales/ko.json',
    },

    extra: {
      supportRTL: true,
      router: {
        origin: 'https://prayer-tracker.dev',
      },
      eas: {
        projectId: '6199a50c-8940-4b44-bb6a-919736af63f6',
      },
      databaseUrl: process.env.DATABASE_URL,
      directUrl: process.env.DIRECT_URL,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      supabaseRoleKey: process.env.SUPABASE_ROLE_KEY,
      baseUrl: process.env.BASE_URL,
      APP_VARIANT: APP_VARIANT,
    },

    owner: 'salahbm_dev',
  };
};
