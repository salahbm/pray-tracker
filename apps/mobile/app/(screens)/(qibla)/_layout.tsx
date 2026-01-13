import { Platform } from 'react-native';
import { Stack } from 'expo-router';

const QiblaLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === 'ios' ? 'fade' : 'fade_from_bottom',
      }}
    />
  );
};

export default QiblaLayout;
