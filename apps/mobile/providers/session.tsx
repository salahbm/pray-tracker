import { ReactNode } from 'react';

import { useAuthStore } from '@/store/auth/auth-session';

interface AuthWrapperProps {
  mode: 'signedIn' | 'signedOut';
  children: ReactNode;
}

export function AuthWrapper({ mode, children }: AuthWrapperProps) {
  const { user } = useAuthStore();

  // Better Auth uses HTTP-only cookies for session management
  // We only need to check if user exists (session is handled by cookies)

  // If mode === 'signedIn', we only render children if we have a user
  if (mode === 'signedIn' && user) {
    return <>{children}</>;
  }

  // If mode === 'signedOut', we only render children if user is not present
  if (mode === 'signedOut' && !user) {
    return <>{children}</>;
  }

  // If neither condition is met, render nothing
  return null;
}
