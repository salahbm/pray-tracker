import { Redirect } from 'expo-router';
import { useOnboarding } from '@store/defaults/onboarding';

const Page = () => {
  const { visited } = useOnboarding();

  if (visited) return <Redirect href='/(tabs)' />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;
