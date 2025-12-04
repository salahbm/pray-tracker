import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import Constants from 'expo-constants';

// RevenueCat API Keys (get these from RevenueCat dashboard)
const REVENUECAT_API_KEY_IOS = process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY || '';
const REVENUECAT_API_KEY_ANDROID = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY || '';

// Product identifiers (must match App Store Connect / Google Play Console)
export const PRODUCT_IDS = {
  MONTHLY: 'noor_monthly_4.99',
  YEARLY: 'noor_yearly_54.99',
} as const;

// Entitlement identifier (from RevenueCat dashboard)
export const ENTITLEMENT_ID = 'premium';

/**
 * Initialize RevenueCat SDK
 * Call this once when the app starts
 */
export const initializeRevenueCat = async (userId?: string) => {
  try {
    const apiKey = Constants.platform?.ios ? REVENUECAT_API_KEY_IOS : REVENUECAT_API_KEY_ANDROID;

    if (!apiKey) {
      console.warn('RevenueCat API key not found. Subscriptions will not work.');
      return;
    }

    // Configure SDK
    Purchases.configure({
      apiKey,
      appUserID: userId, // Optional: set user ID for cross-platform purchases
    });

    // Set log level for debugging (remove in production)
    if (__DEV__) {
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    }

    console.log('RevenueCat initialized successfully');
  } catch (error) {
    console.error('Failed to initialize RevenueCat:', error);
  }
};

/**
 * Set user ID after login
 */
export const setRevenueCatUserId = async (userId: string) => {
  try {
    await Purchases.logIn(userId);
    console.log('RevenueCat user ID set:', userId);
  } catch (error) {
    console.error('Failed to set RevenueCat user ID:', error);
  }
};

/**
 * Clear user ID on logout
 */
export const clearRevenueCatUserId = async () => {
  try {
    await Purchases.logOut();
    console.log('RevenueCat user logged out');
  } catch (error) {
    console.error('Failed to log out RevenueCat user:', error);
  }
};
