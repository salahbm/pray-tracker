// config.ts
import Constants from 'expo-constants';

// Get configuration from Expo Constants
const extra = Constants.expoConfig?.extra;

export const API_BASE_URL = extra?.baseUrl || '/(api)';
