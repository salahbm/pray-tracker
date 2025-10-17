import 'react-native-reanimated';
import '@styles/global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { RootProvider } from '@/providers';
import App from './app';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function Layout() {
  return (
    <RootProvider>
      <App />
    </RootProvider>
  );
}
