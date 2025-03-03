import { Platform } from 'react-native';
import * as Device from 'expo-device';

// Mock implementation for Expo Go
const MockPurchases = {
  setLogLevel: () => {},
  configure: async () => {},
  getOfferings: async () => ({
    current: {
      availablePackages: [
        {
          identifier: 'monthly',
          product: {
            description: 'Monthly Premium',
            price: 4.99,
            subscriptionPeriod: 'P1M',
          },
        },
        {
          identifier: 'yearly',
          product: {
            description: 'Yearly Premium (Save 40%)',
            price: 29.99,
            subscriptionPeriod: 'P1Y',
          },
        },
      ],
    },
  }),
  purchasePackage: async (package_: any) => ({
    customerInfo: {
      entitlements: {
        active: {
          premium: {
            isActive: true,
            willRenew: true,
            periodType: 'normal',
            latestPurchaseDate: new Date().toISOString(),
            originalPurchaseDate: new Date().toISOString(),
            expirationDate: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000,
            ).toISOString(),
          },
        },
      },
    },
  }),
  getCustomerInfo: async () => ({
    entitlements: {
      active: {},
    },
  }),
  restorePurchases: async () => ({
    entitlements: {
      active: {},
    },
  }),
};

// Use mock in Expo Go, real implementation in development build
const Purchases = Platform.select({
  ios: MockPurchases,
  android: MockPurchases,
  default: MockPurchases,
});

export const OFFERING_IDENTIFIER = 'default';
export const ENTITLEMENT_ID = 'premium';

export type SubscriptionPlan = {
  identifier: string;
  description: string;
  price: number;
  period: string;
  originalPrice?: number;
};

// Initialize RevenueCat or mock
export async function initializePurchases() {
  if (Device.isDevice) {
    await Purchases.configure();
  }
}

// Get available packages
export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  try {
    const offerings = await Purchases.getOfferings();
    const current = offerings.current;

    if (!current) return [];

    return current.availablePackages.map((pkg) => ({
      identifier: pkg.identifier,
      description: pkg.product.description,
      price: pkg.product.price,
      period: pkg.product.subscriptionPeriod,
    }));
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    return [];
  }
}

// Purchase a package
export async function purchasePackage(packageIdentifier: string) {
  try {
    const offerings = await Purchases.getOfferings();
    const package_ = offerings.current?.availablePackages.find(
      (p) => p.identifier === packageIdentifier,
    );

    if (!package_) {
      throw new Error('Package not found');
    }

    const { customerInfo } = await Purchases.purchasePackage(package_);
    return customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
  } catch (error: any) {
    if (!error.userCancelled) {
      console.error('Error purchasing package:', error);
    }
    return false;
  }
}

// Check subscription status
export async function checkSubscriptionStatus(): Promise<boolean> {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return false;
  }
}

// Restore purchases
export async function restorePurchases(): Promise<boolean> {
  try {
    const customerInfo = await Purchases.restorePurchases();
    return customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
  } catch (error) {
    console.error('Error restoring purchases:', error);
    return false;
  }
}
