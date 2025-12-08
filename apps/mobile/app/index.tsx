import { useOnboarding } from '@store/defaults/onboarding';
import { Redirect } from 'expo-router';

const Index = () => {
  const { visited } = useOnboarding();

  if (visited) return <Redirect href="/(tabs)" />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Index;
