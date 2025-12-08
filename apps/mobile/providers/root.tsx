import { PortalHost } from '@rn-primitives/portal';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BottomSheet from './bottom-sheet';
import { I18nProvider } from './i18n-provider';
import QueryProvider from './query';
import { ThemeProvider } from './theme';
import ToastProvider from './toaster';
import SheetWrapper from './sheet-wrapper';
import NotificationProvider from './notification-context';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaProvider>
      <I18nProvider>
        <QueryProvider>
          <ThemeProvider>
            <BottomSheet>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? -30 : 0}
              >
                {children}
              </KeyboardAvoidingView>
              <ToastProvider />
              <PortalHost />
              <SheetWrapper />
              <NotificationProvider />
            </BottomSheet>
          </ThemeProvider>
        </QueryProvider>
      </I18nProvider>
    </SafeAreaProvider>
  );
};

export { RootProvider };
