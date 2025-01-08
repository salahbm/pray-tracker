import { Redirect } from 'expo-router';

const Page = () => {
  const isSignedIn = true;

  if (isSignedIn) return <Redirect href="/(tabs)" />;

  return <Redirect href="/(tabs)" />;
};

export default Page;
