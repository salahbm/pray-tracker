import { Stack } from 'expo-router';

export default function ScreensLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        keyboardHandlingEnabled: true,
      }}
    >
      <Stack.Screen
        name="(settings)/index"
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
}
