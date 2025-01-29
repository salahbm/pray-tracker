import { Session } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth/auth-session';

const SignedOut = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, s) => setSession(s),
    );
    return () => authListener.subscription.unsubscribe();
  }, []);

  return session && user ? null : <>{children}</>;
};

const SignedIn = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, s) => setSession(s),
    );
    return () => authListener.subscription.unsubscribe();
  }, []);

  return session && user ? <>{children}</> : null;
};

export { SignedOut, SignedIn };
