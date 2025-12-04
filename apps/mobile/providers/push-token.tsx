import React, { Fragment } from 'react';
import { useRegisterPushToken } from '@/hooks/user/useRegisterPushToken';

/**
 * Provider that registers the user's Expo push token with the backend
 * This runs once when the user is authenticated
 */
export const PushTokenProvider = ({ children }: { children: React.ReactNode }) => {
  useRegisterPushToken();
  return <Fragment>{children}</Fragment>;
};
