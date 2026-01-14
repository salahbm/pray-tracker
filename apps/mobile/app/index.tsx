import { useOnboardingStore } from '@store/defaults/onboarding';
import { Redirect } from 'expo-router';

const Index = () => {
  const { visited } = useOnboardingStore();

  if (visited) return <Redirect href="/(tabs)" />;

  return <Redirect href="/(onboarding)/onboarding" />;
};

export default Index;
