import { useState, useEffect } from 'react';
import * as Localization from 'expo-localization';
import {
  getSubscriptionPlans,
  checkSubscriptionStatus,
  purchasePackage,
  restorePurchases,
  SubscriptionPlan,
} from '@/lib/revenuecat';

// Define discount rates for different regions
const REGIONAL_DISCOUNTS: Record<string, number> = {
  TR: 0.5, // 50% discount for Turkey
  EG: 0.4, // 40% discount for Egypt
  ID: 0.3, // 30% discount for Indonesia
  US: 0.2, // 20% discount for the US
  GB: 0.2, // 20% discount for the UK
  KR: 0.2, // 20% discount for the KOREA
  // Add more countries as needed
};

export function useSubscription() {
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get user's country code
  const countryCode = Localization.getLocales()[0]?.regionCode;
  const regionCode = countryCode?.toLowerCase();

  // Apply regional discount if applicable
  const applyRegionalDiscount = (price: number) => {
    const discount = REGIONAL_DISCOUNTS[regionCode || ''] || 0;
    return price * (1 - discount);
  };

  // Load subscription plans
  const loadPlans = async () => {
    try {
      setIsLoading(true);
      const fetchedPlans = await getSubscriptionPlans();

      // Apply regional discounts
      const adjustedPlans = fetchedPlans.map((plan) => ({
        ...plan,
        price: applyRegionalDiscount(plan.price),
        originalPrice: plan.price, // Keep original price for reference
      }));

      setPlans(adjustedPlans);

      // Check current subscription status
      const status = await checkSubscriptionStatus();
      setIsPremium(status);
    } catch (err) {
      setError('Failed to load subscription plans');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Purchase a plan
  const purchase = async (planId: string) => {
    try {
      setIsLoading(true);
      const success = await purchasePackage(planId);
      if (success) {
        setIsPremium(true);
      }
      return success;
    } catch (err) {
      setError('Purchase failed');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Restore previous purchases
  const restore = async () => {
    try {
      setIsLoading(true);
      const success = await restorePurchases();
      if (success) {
        setIsPremium(true);
      }
      return success;
    } catch (err) {
      setError('Restore failed');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Load plans on mount
  useEffect(() => {
    loadPlans();
  }, []);

  return {
    isLoading,
    plans,
    isPremium,
    error,
    purchase,
    restore,
    refresh: loadPlans,
  };
}
