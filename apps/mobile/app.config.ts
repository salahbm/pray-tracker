import 'dotenv/config';
import { ExpoConfig, ConfigContext } from '@expo/config';

process.env.EXPO_ROUTER_APP_ROOT =
  process.env.EXPO_ROUTER_APP_ROOT ?? 'src/app';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Pray Tracker',
  slug: 'pray-tracker',
  version: '1.0.2',
  orientation: 'portrait',
  icon: './src/assets/images/icon-light-rounded.png',
  scheme: 'salahdev-prayer-tracker',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  experiments: {
    typedRoutes: true,
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.salahdev.prayerTracker',
    buildNumber: '1.0.2',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    icon: {
      dark: './src/assets/images/icon-dark.png',
      light: './src/assets/images/icon-light.png',
    },
  },
  android: {
    package: 'com.salahdev.prayerTracker',
    adaptiveIcon: {
      foregroundImage: './src/assets/images/icon-light.png',
      backgroundColor: '#F9FAFB',
    },
    permissions: [
      'android.permission.ACCESS_COARSE_LOCATION',
      'android.permission.ACCESS_FINE_LOCATION',
    ],
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './src/assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-image-picker',
    'expo-localization',
    'expo-font',
    'expo-secure-store',
    'expo-web-browser',
    [
      'expo-splash-screen',
      {
        image: './src/assets/images/icon-light-rounded.png',
        imageWidth: 150,
        resizeMode: 'contain',
        backgroundColor: '#F9FAFB',
        dark: {
          image: './src/assets/images/icon-dark-rounded.png',
          backgroundColor: '#121212',
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
  ],
  locales: {
    en: './src/locales/en.json',
    ru: './src/locales/ru.json',
    uz: './src/locales/uz.json',
    ko: './src/locales/ko.json',
  },
  extra: {
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
    appVariant: process.env.EXPO_PUBLIC_APP_VARIANT,
    supportRTL: true,
    eas: {
      projectId: '6199a50c-8940-4b44-bb6a-919736af63f6',
    },
  },
  owner: 'salahbm_dev',
  runtimeVersion: {
    policy: 'appVersion',
  },
  updates: {
    url: 'https://u.expo.dev/6199a50c-8940-4b44-bb6a-919736af63f6',
  },
});
