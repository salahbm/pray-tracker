import { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Check, Sparkles, Crown } from 'lucide-react-native';

import { Text } from '@/components/ui/text';
import { useThemeStore } from '@/store/defaults/theme';
import { cn } from '@/lib/utils';
import { fireToast } from '@/providers/toaster';
import { useRevenueCatOfferings, usePurchasePackage } from '@/hooks/subscriptions/useRevenueCat';
import { usePaywallBottomSheetStore } from '@/store/bottom-sheets';

const PREMIUM_FEATURES = [
  'subscription.features.unlimitedFriends',
  'subscription.features.friendGroups',
  'subscription.features.detailedStats',
  'subscription.features.prayerReminders',
  'subscription.features.customThemes',
  'subscription.features.adFree',
  'subscription.features.prioritySupport',
];

export default function PaywallScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useThemeStore();
  const { paywallSheetRef } = usePaywallBottomSheetStore();

  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const { packages, loading: loadingOfferings } = useRevenueCatOfferings();
  const { purchase, restorePurchases, purchasing } = usePurchasePackage();

  // Auto-select yearly plan by default
  useEffect(() => {
    setSelectedPlan('yearly');
  }, []);

  const handlePurchase = async () => {
    const pkg = packages.find(p =>
      selectedPlan === 'monthly'
        ? p.identifier.includes('monthly')
        : p.identifier.includes('yearly')
    );

    if (!pkg) {
      fireToast.error(t('subscription.errors.packageNotFound'));
      return;
    }

    const result = await purchase(pkg);

    if (result.success) {
      fireToast.success(t('subscription.success.purchaseComplete'));
      router.back();
    } else if (!result.cancelled) {
      fireToast.error(result.error || t('subscription.errors.purchaseFailed'));
    }
  };

  const handleRestore = async () => {
    const result = await restorePurchases();

    if (result.success && result.hasPremium) {
      fireToast.success(t('subscription.success.restoreComplete'));
      router.back();
    } else if (result.success && !result.hasPremium) {
      fireToast.info(t('subscription.info.noPurchasesFound'));
    } else {
      fireToast.error(result.error || t('subscription.errors.restoreFailed'));
    }
  };

  const monthlyPackage = packages.find(p => p.identifier.includes('monthly'));
  const yearlyPackage = packages.find(p => p.identifier.includes('yearly'));

  const monthlyPrice = monthlyPackage?.product.priceString || '$4.99';
  const yearlyPrice = yearlyPackage?.product.priceString || '$54.99';
  const yearlySavings = t('subscription.saveOneMonth');

  if (loadingOfferings) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={colors['--primary']} />
        <Text className="mt-4 text-muted-foreground">{t('subscription.loadingPlans')}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 "
      contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View entering={FadeInUp.delay(100)} className="items-center px-6 pt-16 pb-8">
        <View className="mb-4 size-20 items-center justify-center rounded-full bg-primary/10">
          <Crown size={40} color={colors['--primary']} />
        </View>
        <Text className="text-3xl font-bold text-center mb-2">{t('subscription.title')}</Text>
        <Text className="text-base text-muted-foreground text-center">
          {t('subscription.subtitle')}
        </Text>
      </Animated.View>

      {/* Features List */}
      <Animated.View entering={FadeInDown.delay(200)} className=" mb-8">
        {PREMIUM_FEATURES.map((feature, index) => (
          <Animated.View
            key={feature}
            entering={FadeInDown.delay(300 + index * 50)}
            className="flex-row items-center mb-4"
          >
            <View className="size-6 items-center justify-center rounded-full bg-primary mr-3">
              <Check size={16} color="white" strokeWidth={3} />
            </View>
            <Text className="text-base flex-1">{t(feature)}</Text>
          </Animated.View>
        ))}
      </Animated.View>

      {/* Pricing Plans */}
      <Animated.View entering={FadeInDown.delay(600)} className=" mb-6">
        <Text className="text-lg font-semibold mb-4">{t('subscription.choosePlan')}</Text>

        {/* Yearly Plan */}
        <TouchableOpacity
          onPress={() => setSelectedPlan('yearly')}
          className={cn(
            'mb-4 rounded-2xl border-2 p-4 relative overflow-hidden',
            selectedPlan === 'yearly' ? 'border-primary bg-primary/5' : 'border-border bg-card'
          )}
          activeOpacity={0.7}
        >
          {/* Best Value Badge */}
          <View className="absolute top-0 right-0 bg-primary px-3 py-1 rounded-bl-xl">
            <Text className="text-xs font-bold text-primary-foreground">
              {t('subscription.bestValue')}
            </Text>
          </View>

          <View className="flex-row items-center justify-between mt-4">
            <View className="flex-1">
              <Text className="text-xl font-bold mb-1">{t('subscription.yearlyPlan')}</Text>
              <Text className="text-sm text-muted-foreground mb-2">{yearlySavings}</Text>
              <Text className="text-2xl font-bold text-primary">
                {yearlyPrice}
                <Text className="text-sm text-muted-foreground font-normal">
                  /{t('subscription.year')}
                </Text>
              </Text>
            </View>

            <View
              className={cn(
                'size-6 rounded-full border-2 items-center justify-center',
                selectedPlan === 'yearly' ? 'border-primary bg-primary' : 'border-muted-foreground'
              )}
            >
              {selectedPlan === 'yearly' && <Check size={16} color="white" strokeWidth={3} />}
            </View>
          </View>
        </TouchableOpacity>

        {/* Monthly Plan */}
        <TouchableOpacity
          onPress={() => setSelectedPlan('monthly')}
          className={cn(
            'rounded-2xl border-2 p-4',
            selectedPlan === 'monthly' ? 'border-primary bg-primary/5' : 'border-border bg-card'
          )}
          activeOpacity={0.7}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-xl font-bold mb-1">{t('subscription.monthlyPlan')}</Text>
              <Text className="text-2xl font-bold text-primary">
                {monthlyPrice}
                <Text className="text-sm text-muted-foreground font-normal">
                  /{t('subscription.month')}
                </Text>
              </Text>
            </View>

            <View
              className={cn(
                'size-6 rounded-full border-2 items-center justify-center',
                selectedPlan === 'monthly' ? 'border-primary bg-primary' : 'border-muted-foreground'
              )}
            >
              {selectedPlan === 'monthly' && <Check size={16} color="white" strokeWidth={3} />}
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Subscribe Button */}
      <Animated.View entering={FadeInDown.delay(700)} className=" mb-4">
        <TouchableOpacity
          onPress={handlePurchase}
          disabled={purchasing}
          className="bg-primary rounded-full py-4 items-center justify-center shadow-lg"
          activeOpacity={0.8}
        >
          {purchasing ? (
            <ActivityIndicator color="white" />
          ) : (
            <View className="flex-row items-center">
              <Sparkles size={20} color="white" />
              <Text className="text-white text-lg font-bold ml-2">
                {t('subscription.subscribe')}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Restore Purchases */}
      <Animated.View entering={FadeInDown.delay(800)} className=" mb-4">
        <TouchableOpacity
          onPress={handleRestore}
          disabled={purchasing}
          className="py-3 items-center"
          activeOpacity={0.7}
        >
          <Text className="text-primary font-semibold">{t('subscription.restorePurchases')}</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Close Button */}
      <Animated.View entering={FadeInDown.delay(900)} className="">
        <TouchableOpacity
          onPress={() => paywallSheetRef.current?.close()}
          className="py-3 items-center"
          activeOpacity={0.7}
        >
          <Text className="text-muted-foreground">{t('common.actions.cancel')}</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Terms */}
      <Animated.View entering={FadeInDown.delay(1000)} className=" mt-4 pb-20">
        <Text className="text-xs text-muted-foreground text-center">{t('subscription.terms')}</Text>
      </Animated.View>
    </ScrollView>
  );
}
