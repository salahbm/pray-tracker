import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Localization from 'expo-localization';

import { Text } from '@/components/ui/text';
import { gifs } from '@/constants/images';
import {
  usePurchasePackage,
  useRevenueCatCustomer,
  useRevenueCatOfferings,
} from '@/hooks/subscriptions/useRevenueCat';
import { PRODUCT_IDS } from '@/lib/revenuecat';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useAuthBottomSheetStore, usePaywallBottomSheetStore } from '@/store/bottom-sheets';
import { useAppRatingStore } from '@/store/defaults/app-rating';
import { Sparkles as SparklesIcon } from '@/components/shared/icons';
import { Sparkles } from '@/components/shared/sparks';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SubProductCard } from '@/components/views/subscription/subs-product';
import { SubFooter } from '@/components/views/subscription/subs-footer';
import { SubsHeader } from '@/components/views/subscription/subs-header';

export default function PaywallScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();
  const { signInSheetRef } = useAuthBottomSheetStore();
  const { paywallSheetRef } = usePaywallBottomSheetStore();

  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const { packages, loading: loadingOfferings } = useRevenueCatOfferings();
  const { purchase, restorePurchases, purchasing } = usePurchasePackage();
  const { refetch: refetchCustomerInfo } = useRevenueCatCustomer();
  const { markAsPurchased } = useAppRatingStore();

  const locale = Localization.getLocales()[0]?.languageTag ?? 'en-US';

  const formatCurrency = (amount: number, currencyCode?: string) => {
    if (!currencyCode) return amount.toFixed(2);
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  };

  const handlePurchase = async () => {
    if (!user) {
      paywallSheetRef.current?.close();
      signInSheetRef.current?.snapToIndex(1);
      return;
    }

    // Find package by product identifier or package identifier
    const targetProductId = selectedPlan === 'monthly' ? PRODUCT_IDS.MONTHLY : PRODUCT_IDS.YEARLY;

    // Try to find by product identifier first, then by package identifier
    let pkg = packages.find(p => p.product.identifier === targetProductId);

    // Fallback: Try to find by package identifier containing the product ID
    if (!pkg) {
      pkg = packages.find(
        p =>
          p.identifier.toLowerCase().includes(selectedPlan) ||
          p.product.identifier.toLowerCase().includes(selectedPlan)
      );
    }

    // Last resort: Use monthly/annual keywords
    if (!pkg) {
      pkg = packages.find(p => {
        const id = p.identifier.toLowerCase();
        return selectedPlan === 'monthly'
          ? id.includes('month')
          : id.includes('annual') || id.includes('year');
      });
    }

    if (!pkg) {
      fireToast.error(t('subscription.errors.packageNotFound'));
      return;
    }

    const result = await purchase(pkg);

    if (result.success) {
      // Refetch customer info to update UI immediately
      await refetchCustomerInfo();
      fireToast.success(t('subscription.success.purchaseComplete'));

      // Track purchase for app rating
      await markAsPurchased();

      router.back();
    } else if (!result.cancelled) {
      fireToast.error(result.error || t('subscription.errors.purchaseFailed'));
    }
  };

  const handleRestore = async () => {
    if (!user) {
      paywallSheetRef.current?.close();
      signInSheetRef.current?.snapToIndex(1);
      return;
    }
    const result = await restorePurchases();

    if (result.success && result.hasPremium) {
      // Refetch customer info to update UI immediately
      await refetchCustomerInfo();
      fireToast.success(t('subscription.success.restoreComplete'));
      router.back();
    } else if (result.success && !result.hasPremium) {
      fireToast.info(t('subscription.info.noPurchasesFound'));
    } else {
      fireToast.error(result.error || t('subscription.errors.restoreFailed'));
    }
  };

  // Find packages with better fallback logic
  const monthlyPackage = packages.find(
    p =>
      p.product.identifier === PRODUCT_IDS.MONTHLY ||
      p.identifier.toLowerCase().includes('monthly') ||
      p.identifier.toLowerCase().includes('month')
  );

  const yearlyPackage = packages.find(
    p =>
      p.product.identifier === PRODUCT_IDS.YEARLY ||
      p.identifier.toLowerCase().includes('annual') ||
      p.identifier.toLowerCase().includes('year')
  );

  const monthlyPrice =
    monthlyPackage?.product.priceString ||
    formatCurrency(monthlyPackage?.product.price || 0, monthlyPackage?.product.currencyCode);
  const yearlyPrice =
    yearlyPackage?.product.priceString ||
    formatCurrency(yearlyPackage?.product.price || 0, yearlyPackage?.product.currencyCode);

  const monthlyPriceNum = monthlyPackage?.product.price ?? 0;
  const yearlyPriceNum = yearlyPackage?.product.price ?? 0;

  // yearly vs 12 months
  const savingAmount = Math.max(0, monthlyPriceNum * 12 - yearlyPriceNum);

  const yearlySavings = t('subscription.saveOneMonth', {
    savingAmount: formatCurrency(
      savingAmount,
      yearlyPackage?.product.currencyCode || monthlyPackage?.product.currencyCode
    ),
  });

  return (
    <ScrollView
      className="flex-1 relative overflow-visible"
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom + 50 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View entering={FadeInUp.delay(100)} className="items-center p-6">
        <Text className="text-2xl font-bold text-center mb-2">{t('subscription.title')} +</Text>
        <Text className="text-base text-muted-foreground text-center max-w-sm leading-6">
          {t('subscription.subtitle')}
        </Text>
      </Animated.View>

      {/* Feature Carousel */}
      <SubsHeader />

      {loadingOfferings ? (
        <View className="flex-1 items-center justify-center min-h-[40vh]">
          <LottieView
            source={gifs.clock_sand}
            autoPlay
            loop
            style={{ height: 240, width: '100%' }}
            resizeMode="contain"
          />
        </View>
      ) : (
        <SubProductCard
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          monthlyPrice={monthlyPrice}
          yearlyPrice={yearlyPrice}
          yearlySavings={yearlySavings}
        />
      )}

      {/* Subscribe Button */}
      <Animated.View entering={FadeInDown.delay(600)} className=" mb-4">
        <TouchableOpacity
          onPress={handlePurchase}
          disabled={purchasing}
          className="rounded-full py-4 items-center justify-center"
          activeOpacity={0.8}
        >
          {purchasing ? (
            <ActivityIndicator size="small" />
          ) : (
            <View className="flex-center bg-primary rounded-full px-6 py-4 w-full relative">
              <Sparkles count={25} />
              <SparklesIcon className="size-5 stroke-2 text-primary-foreground" />
              <Text className="font-bold text-primary-foreground text-lg ml-2">
                {t('subscription.subscribe')}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>

      <SubFooter handleRestore={handleRestore} purchasing={purchasing} />
    </ScrollView>
  );
}
