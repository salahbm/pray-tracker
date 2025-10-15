import { GestureHandlerRootView } from 'react-native-gesture-handler';

const PlatformGestureWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    {children}
  </GestureHandlerRootView>
);

export default PlatformGestureWrapper;
