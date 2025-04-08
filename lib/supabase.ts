import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const isServer = typeof window === 'undefined';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ROLE_KEY = process.env.EXPO_PUBLIC_SUPABASE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ROLE_KEY) {
  throw new Error(
    'Supabase configuration missing. Check your environment variables.',
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY, {
  auth: {
    storage: isServer ? undefined : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
