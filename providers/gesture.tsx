import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const PlatformGestureWrapper = ({ children }: { children: React.ReactNode }) =>
  Platform.OS === 'web' ? (
    <>{children}</>
  ) : (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {children}
    </GestureHandlerRootView>
  );

export default PlatformGestureWrapper;
