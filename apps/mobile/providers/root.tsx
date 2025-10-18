import { PortalHost } from '@rn-primitives/portal';
import React from 'react';

import BottomSheet from './bottom-sheet';
import PlatformGestureWrapper from './gesture';
import { I18nProvider } from './i18n-provider';
import QueryProvider from './query';
import { ThemeProvider } from './theme';
import ToastProvider from './toaster';
import SheetWrapper from './sheet-wrapper';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <I18nProvider>
      <QueryProvider>
        <ThemeProvider>
          <PlatformGestureWrapper>
            <BottomSheet>{children}</BottomSheet>
            <ToastProvider />
            <PortalHost />
            <SheetWrapper />
          </PlatformGestureWrapper>
        </ThemeProvider>
      </QueryProvider>
    </I18nProvider>
  );
};

export { RootProvider };
