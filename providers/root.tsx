import React from 'react';

import ClerkProviderWrapper from './clerk';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProviderWrapper>{children}</ClerkProviderWrapper>;
};

export default RootProvider;
