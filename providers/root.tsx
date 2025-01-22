import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import BottomSheet from './bottom-sheet';
import ClerkProviderWrapper from './clerk';
import QueryProvider from './query';
import ToastProvider from './toaster';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GestureHandlerRootView>
      <QueryProvider>
        <ClerkProviderWrapper>
          <BottomSheet>{children}</BottomSheet>
        </ClerkProviderWrapper>
        <ToastProvider />
      </QueryProvider>
    </GestureHandlerRootView>
  );
};

export default RootProvider;
