import React, { Fragment, useEffect } from 'react';
import { initializeRevenueCat } from '@/lib/revenuecat';
import { useAuthStore } from '@/store/auth/auth-session';

/**
 * RevenueCat Provider
 * Initializes RevenueCat SDK when the app starts
 * and sets the user ID when the user is authenticated
 */
export const RevenueCatProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    // Initialize RevenueCat on mount
    initializeRevenueCat(user?.id);
  }, [user?.id]);

  return <Fragment>{children}</Fragment>;
};
