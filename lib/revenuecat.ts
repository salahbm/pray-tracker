import { Platform } from 'react-native';

// Mock implementation for non-iOS/Android environments or Expo Go
// Explanation: react-native-purchases does NOT work on the web or in Expo Go, so we provide a fallback.
const MockPurchases = {
  PURCHASES_ERROR_CODE: {
    PURCHASE_CANCELLED_ERROR: 'PURCHASE_CANCELLED_ERROR',
  },
  LOG_LEVEL: {
    DEBUG: 'DEBUG',
  },
  configure: async (_: { apiKey: string }) => {},
  getCustomerInfo: async () => ({
    entitlements: { active: {} },
  }),
  getOfferings: async () => ({
    current: {
      availablePackages: [
        {
          identifier: 'monthly',
          product: {
            identifier: 'monthly',
            description: 'Monthly Premium Subscription',
            price: 4.99,
            subscriptionPeriod: 'P1M',
          },
        },
        {
          identifier: 'yearly',
          product: {
            identifier: 'yearly',
            description: 'Yearly Premium Subscription',
            price: 39.99,
            subscriptionPeriod: 'P1Y',
          },
        },
      ],
    },
  }),
  purchasePackage: async (_package) => {
    // Simulate purchase success
    return {
      customerInfo: {
        entitlements: {
          active: {
            premium: {
              isActive: true,
            },
          },
        },
      },
    };
  },
  restorePurchases: async () => ({
    entitlements: { active: { premium: { isActive: true } } },
  }),
  setLogLevel: async (_level: string) => {},
};

let Purchases: typeof MockPurchases = MockPurchases;

// Initialize the real Purchases library for iOS/Android
const initializePurchasesLibrary = async () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    const RNPurchases = await import('react-native-purchases');
    Purchases = RNPurchases.default;
  }
};

// Call initialization immediately
initializePurchasesLibrary();

// RevenueCat API keys
const REVENUECAT_API_KEYS = {
  ios: 'YOUR_IOS_API_KEY',
  android: 'YOUR_ANDROID_API_KEY',
};

// Types
export interface SubscriptionPlan {
  identifier: string;
  description: string;
  price: number;
  period: string;
}

// Initialize Purchases
export const initializePurchases = async () => {
  try {
    const apiKey = Platform.select(REVENUECAT_API_KEYS);
    if (!apiKey) {
      throw new Error('No API key found for this platform');
    }

    // Configure RevenueCat
    await Purchases.configure({ apiKey });

    // Enable debug logs in development builds only
    if (__DEV__) {
      // Ensure that LOG_LEVEL exists on whichever object we’re using
      Purchases.setLogLevel?.(Purchases.LOG_LEVEL.DEBUG);
    }
    return true;
  } catch (error) {
    console.error('Failed to initialize RevenueCat:', error);
    return false;
  }
};

// Get customer info
export const getCustomerInfo = async () => {
  try {
    return await Purchases.getCustomerInfo();
  } catch (error) {
    console.error('Failed to get customer info:', error);
    return null;
  }
};

// Get available subscription plans
export const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
  try {
    const offerings = await Purchases.getOfferings();
    if (!offerings.current) {
      throw new Error('No offerings available');
    }

    return offerings.current.availablePackages.map((pkg) => ({
      identifier: pkg.identifier,
      description: pkg.product.description,
      price: pkg.product.price,
      period: pkg.product.subscriptionPeriod,
    }));
  } catch (error) {
    console.error('Failed to get subscription plans:', error);
    return [];
  }
};

// Purchase a package
export const purchasePackage = async (packageIdentifier: string) => {
  try {
    const offerings = await Purchases.getOfferings();
    const packageToPurchase = offerings.current?.availablePackages.find(
      (pkg) => pkg.identifier === packageIdentifier,
    );

    if (!packageToPurchase) {
      throw new Error('Package not found');
    }

    const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
    return { customerInfo };
  } catch (error) {
    // Check for user cancellation
    if (
      error?.code === Purchases.PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR
    ) {
      throw new Error('Purchase cancelled');
    }

    console.error('Failed to purchase package:', error);
    throw error;
  }
};

// Restore purchases
export const restorePurchases = async (): Promise<boolean> => {
  try {
    const customerInfo = await Purchases.restorePurchases();
    return Object.keys(customerInfo.entitlements.active).length > 0;
  } catch (error) {
    console.error('Failed to restore purchases:', error);
    return false;
  }
};

// Check if user has an active subscription
export const checkSubscriptionStatus = async (): Promise<boolean> => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo.entitlements.active['premium']?.isActive ?? false;
  } catch (error) {
    console.error('Failed to check subscription status:', error);
    return false;
  }
};
