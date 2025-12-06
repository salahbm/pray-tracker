import { useEffect } from 'react';
import {
  getRevenueCatOfferings,
  getRevenueCatUserInfo,
  initializeRevenueCat,
} from '@/lib/revenuecat';
import { useAuthStore } from '@/store/auth/auth-session';

/**
 * RevenueCat Provider
 * Initializes RevenueCat SDK when the app starts
 * and sets the user ID when the user is authenticated
 */
export const RevenueCatProvider = () => {
  useEffect(() => {
    // Initialize RevenueCat on mount
    initializeRevenueCat();
    getRevenueCatUserInfo();
    getRevenueCatOfferings();
  }, []);

  return null;
};
