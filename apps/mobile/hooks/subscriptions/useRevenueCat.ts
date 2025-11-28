import { useState, useEffect } from 'react';
import Purchases, { PurchasesOfferings, CustomerInfo } from 'react-native-purchases';
import { PurchasePackage } from '@/types/subscription';

/**
 * Hook to fetch available subscription packages from RevenueCat
 */
export const useRevenueCatOfferings = () => {
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
  const [packages, setPackages] = useState<PurchasePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOfferings();
  }, []);

  const fetchOfferings = async () => {
    try {
      setLoading(true);
      setError(null);

      const offerings = await Purchases.getOfferings();
      setOfferings(offerings);

      if (offerings.current && offerings.current.availablePackages.length > 0) {
        setPackages(offerings.current.availablePackages as any);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch offerings');
      console.error('Error fetching offerings:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    offerings,
    packages,
    loading,
    error,
    refetch: fetchOfferings,
  };
};

/**
 * Hook to get customer info and check premium status
 */
export const useRevenueCatCustomer = () => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomerInfo();
  }, []);

  const fetchCustomerInfo = async () => {
    try {
      setLoading(true);
      const info = await Purchases.getCustomerInfo();
      setCustomerInfo(info as any);

      // Check if user has active premium entitlement
      const hasPremium =
        info.entitlements.active['premium'] !== undefined ||
        info.activeSubscriptions.length > 0;
      setIsPremium(hasPremium);
    } catch (err) {
      console.error('Error fetching customer info:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    customerInfo,
    isPremium,
    loading,
    refetch: fetchCustomerInfo,
  };
};

/**
 * Hook to purchase a subscription package
 */
export const usePurchasePackage = () => {
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const purchase = async (pkg: PurchasePackage) => {
    try {
      setPurchasing(true);
      setError(null);

      const { customerInfo } = await Purchases.purchasePackage(pkg as any);

      // Check if purchase was successful
      const hasPremium =
        customerInfo.entitlements.active['premium'] !== undefined ||
        customerInfo.activeSubscriptions.length > 0;

      return {
        success: hasPremium,
        customerInfo,
      };
    } catch (err: any) {
      // Handle user cancellation
      if (err.userCancelled) {
        setError('Purchase cancelled');
        return { success: false, cancelled: true };
      }

      setError(err.message || 'Purchase failed');
      console.error('Purchase error:', err);
      return { success: false, error: err.message };
    } finally {
      setPurchasing(false);
    }
  };

  const restorePurchases = async () => {
    try {
      setPurchasing(true);
      setError(null);

      const customerInfo = await Purchases.restorePurchases();

      const hasPremium =
        customerInfo.entitlements.active['premium'] !== undefined ||
        customerInfo.activeSubscriptions.length > 0;

      return {
        success: true,
        hasPremium,
        customerInfo,
      };
    } catch (err: any) {
      setError(err.message || 'Restore failed');
      console.error('Restore error:', err);
      return { success: false, error: err.message };
    } finally {
      setPurchasing(false);
    }
  };

  return {
    purchase,
    restorePurchases,
    purchasing,
    error,
  };
};
