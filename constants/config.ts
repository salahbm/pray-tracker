// config.ts
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};

const APP_VARIANT = extra.appVariant;

const API_BASE_URL = extra.baseUrl;

const SUPABASE_URL = extra.supabaseUrl;
const SUPABASE_ANON_KEY = extra.supabaseAnonKey;
const SUPABASE_ROLE_KEY = extra.supabaseRoleKey;

const DATABASE_URL = extra.databaseUrl;
const DIRECT_URL = extra.directUrl;

export {
  APP_VARIANT,
  API_BASE_URL,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_ROLE_KEY,
  DATABASE_URL,
  DIRECT_URL,
};
