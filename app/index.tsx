import { Redirect } from 'expo-router';
import { AppState } from 'react-native';

import { supabase } from '@/lib/supabase';
import { useOnboarding } from 'store/defaults/onboarding';

const Page = () => {
  const { visited } = useOnboarding();

  // Auto refresh token

  // Tells Supabase Auth to continuously refresh the session automatically if
  // the app is in the foreground. When this is added, you will continue to receive
  // `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
  // if the user's session is terminated. This should only be registered once.
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });

  if (visited) return <Redirect href="/(tabs)" />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;
