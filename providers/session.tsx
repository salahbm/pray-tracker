import { ReactNode } from 'react';

import { useAuthStore } from '@/store/auth/auth-session';

interface AuthWrapperProps {
  mode: 'signedIn' | 'signedOut';
  children: ReactNode;
}

export function AuthWrapper({ mode, children }: AuthWrapperProps) {
  const { session } = useAuthStore();
  // If mode === 'signedIn', we only render children if we have a user + session
  if (mode === 'signedIn' && session) {
    return <>{children}</>;
  }

  // If mode === 'signedOut', we only render children if user/session are not present
  if (mode === 'signedOut' && !session) {
    return <>{children}</>;
  }

  // If neither condition is met, render nothing
  return null;
}
