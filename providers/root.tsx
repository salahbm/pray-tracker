import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import BottomSheet from './bottom-sheet';
import ClerkProviderWrapper from './clerk';
import QueryProvider from './query';
import { ThemeProvider } from './theme';
import ToastProvider from './toaster';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <GestureHandlerRootView>
        <QueryProvider>
          <ClerkProviderWrapper>
            <BottomSheet>{children}</BottomSheet>
          </ClerkProviderWrapper>
          <ToastProvider />
        </QueryProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

export default RootProvider;
