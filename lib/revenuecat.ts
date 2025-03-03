import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { ApiError } from '@/utils/error';
import { MessageCodes, StatusCode } from '@/utils/status';

// RevenueCat API keys
const API_KEYS = {
  apple: 'APPLE_API_KEY',
  google: 'GOOGLE_API_KEY',
};

export const OFFERING_IDENTIFIER = 'default';

export const ENTITLEMENT_ID = 'premium';

export type SubscriptionPlan = {
  identifier: string;
  description: string;
  price: number;
  period: string;
  originalPrice?: number;
};

// Initialize RevenueCat
export async function initializePurchases() {
  if (Device.isDevice) {
    const apiKey = Platform.select({
      ios: API_KEYS.apple,
      android: API_KEYS.google,
    });

    if (!apiKey) return;

    Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    await Purchases.configure({ apiKey });
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
      (p) => p.identifier === packageIdentifier
    );

    if (!package_) {
      throw new ApiError({
        message: 'Package not found',
        status: StatusCode.NOT_FOUND,
        code: MessageCodes.PACKAGE_NOT_FOUND,
      })
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
