import { ReactNode, useEffect } from 'react';

import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth/auth-session';

interface SignedProps {
  children: ReactNode;
}

export function SignedOut({ children }: SignedProps) {
  const { user, session, setSession } = useAuthStore();

  // Listen for auth changes & update Zustand store
  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setSession(data.session);
      }
    };

    fetchSession(); // Initial session fetch

    // Listen for session changes & update Zustand store
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => authListener.subscription.unsubscribe();
  }, [setSession]);

  return user && session ? null : <>{children}</>;
}

export function SignedIn({ children }: SignedProps) {
  const { user, session, setSession } = useAuthStore();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setSession(data.session);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => authListener.subscription.unsubscribe();
  }, [setSession]);

  return user && session ? <>{children}</> : null;
}
