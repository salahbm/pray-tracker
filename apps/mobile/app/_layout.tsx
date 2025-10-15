import * as SplashScreen from 'expo-splash-screen';

import App from './App';

import RootProvider from '@/providers/root';
import 'react-native-reanimated';
import 'i18n.config';
import 'styles/global.css';
import 'reanimated.config';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  return (
    <RootProvider>
      <App />
    </RootProvider>
  );
}

export default RootLayout;
