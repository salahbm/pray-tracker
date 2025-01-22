import React from 'react';

import BottomSheet from './bottom-sheet';
import ClerkProviderWrapper from './clerk';
import { ErrorProvider } from './error-modal';
import QueryProvider from './query';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ErrorProvider>
        <ClerkProviderWrapper>
          <BottomSheet>{children}</BottomSheet>
        </ClerkProviderWrapper>
      </ErrorProvider>
    </QueryProvider>
  );
};

export default RootProvider;
