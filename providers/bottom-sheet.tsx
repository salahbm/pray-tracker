import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const BottomSheet = ({ children }: { children: React.ReactNode }) => {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default BottomSheet;
