import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { initializePurchases } from '@/lib/revenuecat';
import { useOnboarding } from 'store/defaults/onboarding';

const Page = () => {
  const { visited } = useOnboarding();

  useEffect(() => {
    // Initialize RevenueCat
    initializePurchases().catch(console.error);
  }, []);

  if (visited) return <Redirect href="/(tabs)" />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;
