import { StackHeader } from '@/components/views/pray-history/stack-header';
import { Stack } from 'expo-router';

export default function CalendarLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        keyboardHandlingEnabled: true,
        headerBackButtonMenuEnabled: false,
        headerTransparent: false,
      }}
    >
      <Stack.Screen
        name="months"
        options={{
          headerShown: true,
          autoHideHomeIndicator: true,
          header: ({ options }) => <StackHeader options={options} />,
        }}
      />
    </Stack>
  );
}
