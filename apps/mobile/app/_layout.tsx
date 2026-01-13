import 'react-native-reanimated';
import '@styles/global.css';

import { RootProvider } from '@/providers';
import App from './App';

export default function Layout() {
  return (
    <RootProvider>
      <App />
    </RootProvider>
  );
}
