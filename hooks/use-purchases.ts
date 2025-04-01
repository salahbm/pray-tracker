import { useState, useEffect } from 'react';

import {
  checkSubscriptionStatus,
  getSubscriptionPlans,
  purchasePackage,
  restorePurchases,
  SubscriptionPlan,
} from '../lib/revenuecat';

export interface PurchaseError {
  code: string;
  message: string;
}

export function usePurchases() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<PurchaseError | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isPremium, setIsPremium] = useState(false);

  // Load initial data
  useEffect(() => {
    loadSubscriptionData();
  }, []);

  // Load subscription data
  const loadSubscriptionData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get subscription status
      const hasSubscription = await checkSubscriptionStatus();
      setIsPremium(hasSubscription);

      // Get available plans
      const availablePlans = await getSubscriptionPlans();
      setPlans(availablePlans);
    } catch (err) {
      setError({
        code: err?.code || 'UNKNOWN',
        message: err?.message || 'An unknown error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Purchase a plan
  const purchase = async (planId: string) => {
    try {
      setError(null);
      setIsLoading(true);

      // Attempt purchase
      await purchasePackage(planId);

      // Verify subscription status after purchase
      const hasSubscription = await checkSubscriptionStatus();
      setIsPremium(hasSubscription);

      return true;
    } catch (err) {
      // Don't track user cancellation as error
      if (err?.message !== 'Purchase cancelled') {
        setError({
          code: err?.code || 'PURCHASE_FAILED',
          message: err?.message || 'Failed to complete purchase',
        });
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Restore purchases
  const restore = async () => {
    try {
      setError(null);
      setIsLoading(true);

      const restored = await restorePurchases();

      // Verify subscription status after restore
      const hasSubscription = await checkSubscriptionStatus();
      setIsPremium(hasSubscription);

      return restored;
    } catch (err) {
      setError({
        code: err?.code || 'RESTORE_FAILED',
        message: err?.message || 'Failed to restore purchases',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    plans,
    isPremium,
    purchase,
    restore,
    reload: loadSubscriptionData,
  };
}
