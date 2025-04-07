import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

import { SUPABASE_ROLE_KEY, SUPABASE_URL } from '@/constants/config';

if (!SUPABASE_URL || !SUPABASE_ROLE_KEY) {
  console.error(
    'Missing Supabase configuration. Check app.config.ts and environment variables.',
  );
}

const isServer = typeof window === 'undefined';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY, {
  auth: {
    storage: isServer ? undefined : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
