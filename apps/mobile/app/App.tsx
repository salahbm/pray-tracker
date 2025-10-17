import { Stack } from 'expo-router';

import { StatusBar } from 'expo-status-bar';
import { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';

export default function App() {
  return (
    <Suspense fallback={<ActivityIndicator className="text-primary size-14" />}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </Suspense>
  );
}
