import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

/**
 * Root-level bottom sheet container
 */
const BottomSheetContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default BottomSheetContainer;
