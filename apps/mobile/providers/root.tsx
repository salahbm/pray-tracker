import { PortalHost } from '@rn-primitives/portal';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { I18nProvider } from './i18n-provider';
import QueryProvider from './query';
import { ThemeProvider } from './theme';
import ToastProvider from './toaster';
import SheetWrapper from './sheet-wrapper';
import NotificationProvider from './notification-context';
import { OfflineModal } from '@/components/shared/modals/offline-modal';
import { GlobalAlert } from './alert';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <I18nProvider>
      <QueryProvider>
        <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
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
              <GlobalAlert />
              <OfflineModal />
              <NotificationProvider />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </QueryProvider>
    </I18nProvider>
  );
};

export { RootProvider };
