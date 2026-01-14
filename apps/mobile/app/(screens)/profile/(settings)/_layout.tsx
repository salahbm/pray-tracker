import { Stack } from 'expo-router';

const SettingsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="settings">
      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_bottom',
          statusBarAnimation: 'slide',
          keyboardHandlingEnabled: true,
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
