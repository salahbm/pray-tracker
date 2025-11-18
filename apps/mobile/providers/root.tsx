import { PortalHost } from '@rn-primitives/portal';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BottomSheet from './bottom-sheet';
import { I18nProvider } from './i18n-provider';
import QueryProvider from './query';
import { ThemeProvider } from './theme';
import ToastProvider from './toaster';
import SheetWrapper from './sheet-wrapper';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaProvider>
      <I18nProvider>
        <QueryProvider>
          <ThemeProvider>
            <BottomSheet>
              {children}
              <ToastProvider />
              <PortalHost />
              <SheetWrapper />
            </BottomSheet>
          </ThemeProvider>
        </QueryProvider>
      </I18nProvider>
    </SafeAreaProvider>
  );
};

export { RootProvider };
