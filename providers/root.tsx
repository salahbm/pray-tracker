import { PortalHost } from '@rn-primitives/portal';
import React from 'react';

import BottomSheet from './bottom-sheet';
import PlatformGestureWrapper from './guesture';
import QueryProvider from './query';
import { ThemeProvider } from './theme';
import ToastProvider from './toaster';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <PlatformGestureWrapper>
          <BottomSheet>{children}</BottomSheet>
          <ToastProvider />
          <PortalHost />
        </PlatformGestureWrapper>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default RootProvider;
