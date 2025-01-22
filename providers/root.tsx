import React from 'react';

import BottomSheet from './bottom-sheet';
import ClerkProviderWrapper from './clerk';
import QueryProvider from './query';
import ToastProvider from './toaster';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ClerkProviderWrapper>
        <BottomSheet>{children}</BottomSheet>
      </ClerkProviderWrapper>
      <ToastProvider />
    </QueryProvider>
  );
};

export default RootProvider;
