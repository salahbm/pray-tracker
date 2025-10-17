import 'react-native-reanimated';
import '@styles/global.css';

import { RootProvider } from '@/providers';
import App from './app';



export default function Layout() {
  return (
    <RootProvider>
      <App />
    </RootProvider>
  );
}
