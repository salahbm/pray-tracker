import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AlertProvider } from './alert';
import BottomSheet from './bottom-sheet';
import QueryProvider from './query';
import { ThemeProvider } from './theme';
import ToastProvider from './toaster';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <GestureHandlerRootView>
        <AlertProvider>
          <QueryProvider>
            <BottomSheet>{children}</BottomSheet>
            <ToastProvider />
          </QueryProvider>
        </AlertProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

export default RootProvider;
