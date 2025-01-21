import React from 'react';

import ClerkProviderWrapper from './clerk';
import QueryProvider from './query';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ClerkProviderWrapper>{children}</ClerkProviderWrapper>
    </QueryProvider>
  );
};

export default RootProvider;
