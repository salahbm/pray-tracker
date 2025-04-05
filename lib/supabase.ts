import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
const supabaseRoleKey = Constants.expoConfig?.extra?.supabaseRoleKey;

if (!supabaseUrl || !supabaseRoleKey) {
  throw new Error(
    'Missing Supabase configuration. Check app.config.ts and environment variables.',
  );
}

export const supabase = createClient(supabaseUrl, supabaseRoleKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
