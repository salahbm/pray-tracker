import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { PropsWithChildren } from 'react';

import { tokenCache } from '~/lib/cache';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  );
}

const ClerkProviderWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>{children}</ClerkLoaded>
    </ClerkProvider>
  );
};

export default ClerkProviderWrapper;
