import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import { gifs } from '@/constants/images';
import PREMIUM_FEATURES from '@/constants/premium-features';
import {
  usePurchasePackage,
  useRevenueCatCustomer,
  useRevenueCatOfferings,
} from '@/hooks/subscriptions/useRevenueCat';
import { PRODUCT_IDS } from '@/lib/revenuecat';
import { cn } from '@/lib/utils';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useAuthBottomSheetStore, usePaywallBottomSheetStore } from '@/store/bottom-sheets';
import { useAppRatingStore } from '@/store/defaults/app-rating';
import { useThemeStore } from '@/store/defaults/theme';
import { PressableBounce } from '@/components/shared/pressable-bounce';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function PaywallScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();
  const { colors } = useThemeStore();
  const { signInSheetRef } = useAuthBottomSheetStore();
  const { paywallSheetRef } = usePaywallBottomSheetStore();

  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const { packages, loading: loadingOfferings } = useRevenueCatOfferings();

  const { purchase, restorePurchases, purchasing } = usePurchasePackage();
  const { refetch: refetchCustomerInfo } = useRevenueCatCustomer();
  const { markAsPurchased } = useAppRatingStore();

  const handlePurchase = async () => {
    if (!user) {
      paywallSheetRef.current?.close();
      signInSheetRef.current?.snapToIndex(1);
      return;
    }

    // Find package by product identifier
    const pkg = packages.find(p => {
      const productId = p.product.identifier;
      const isMatch =
        selectedPlan === 'monthly'
          ? productId === PRODUCT_IDS.MONTHLY
          : productId === PRODUCT_IDS.YEARLY;

      return isMatch;
    });

    if (!pkg) {
      console.error(
        '❌ Package not found. Available packages:',
        packages.map(p => p.product.identifier)
      );
      fireToast.error(t('subscription.errors.packageNotFound'));
      return;
    }

    console.log('✅ Purchasing package:', pkg.product.identifier);

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

  const monthlyPackage = packages.find(p => p.identifier.includes('monthly'));
  const yearlyPackage = packages.find(p => p.identifier.includes('annual'));

  const monthlyPrice = monthlyPackage?.product.priceString || '$3.99';
  const yearlyPrice = yearlyPackage?.product.priceString || '$38.99';

  const monthlyPriceNum = monthlyPackage?.product.price || 0;
  const yearlyPriceNum = yearlyPackage?.product.price || 0;

  // yearly vs 12 months
  const savingAmount = monthlyPriceNum * 12 - yearlyPriceNum;

  const yearlySavings = t('subscription.saveOneMonth', {
    savingAmount: savingAmount.toFixed(2),
  });

  const renderFeatureCard = ({ item }: { item: (typeof PREMIUM_FEATURES)[0] }) => (
    <View style={{ width: SCREEN_WIDTH - 40 }} className="mr-4">
      <View className="rounded-3xl overflow-hidden">
        {/* Lottie Animation */}
        <View className="bg-primary/5 items-center justify-center" style={{ height: 280 }}>
          <LottieView
            source={item.gif}
            autoPlay
            loop
            style={{ height: 240, width: '100%' }}
            resizeMode="contain"
          />
        </View>
        <View className="border-t-[0.5px] border-primary w-[200px] mx-auto" />
        {/* Feature Title */}
        <View className="p-6 px-10">
          <Text className="text-lg font-bold text-center text-muted-foreground leading-6">
            {t(item.title)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView
      className="flex-1 relative"
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
      <Animated.View entering={FadeInDown.delay(200)} className="mb-6">
        <GestureDetector gesture={Gesture.Pan().activeOffsetX([-10, 10])}>
          <FlatList
            horizontal
            ref={flatListRef}
            pagingEnabled={false}
            data={PREMIUM_FEATURES}
            renderItem={renderFeatureCard}
            keyExtractor={item => item.key}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={event => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 64 + 16)
              );
              setActiveFeatureIndex(index);
            }}
            snapToAlignment="start"
            decelerationRate="fast"
            contentContainerStyle={{ paddingLeft: 6 }}
          />
        </GestureDetector>

        {/* Pagination Dots */}
        <View className="flex-row justify-center items-center mt-4 gap-3">
          <PressableBounce
            onPress={() =>
              activeFeatureIndex > 0 &&
              flatListRef.current?.scrollToIndex({ index: activeFeatureIndex - 1 })
            }
            className="mr-2  rounded-lg p-1"
            hitSlop={20}
            disabled={activeFeatureIndex === 0}
          >
            <ChevronLeft color={colors['--primary']} size={20} className="stroke-2" />
          </PressableBounce>
          {PREMIUM_FEATURES.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => flatListRef.current?.scrollToIndex({ index })}
              className={cn(
                'h-2 rounded-full transition-all',
                index === activeFeatureIndex ? 'w-8 bg-primary' : 'w-2 bg-primary opacity-50'
              )}
            />
          ))}
          <PressableBounce
            onPress={() =>
              activeFeatureIndex < PREMIUM_FEATURES.length - 1 &&
              flatListRef.current?.scrollToIndex({ index: activeFeatureIndex + 1 })
            }
            className="ml-2 rounded-lg p-1 "
            hitSlop={20}
            disabled={activeFeatureIndex === PREMIUM_FEATURES.length - 1}
          >
            <ChevronRight color={colors['--primary']} size={20} className="stroke-2" />
          </PressableBounce>
        </View>
      </Animated.View>
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
        <Animated.View entering={FadeInDown.delay(400)} className=" my-6">
          <Text className="text-xl font-bold mb-4">{t('subscription.choosePlan')}</Text>

          {/* Yearly Plan */}
          <TouchableOpacity
            onPress={() => setSelectedPlan('yearly')}
            className={cn(
              'mb-4 rounded-2xl border-2 p-5 relative',
              selectedPlan === 'yearly' ? 'border-primary bg-card' : 'border-border bg-popover'
            )}
            activeOpacity={0.7}
          >
            {/* Best Value Badge */}
            <View
              className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl rounded-tr-xl"
              style={{ backgroundColor: colors['--primary'] }}
            >
              <Text className="text-xs font-bold text-primary-foreground">
                {t('subscription.bestValue')}
              </Text>
            </View>

            <View className="flex-row items-center justify-between mt-6">
              <View className="flex-1">
                <Text className="text-xl font-bold mb-1">{t('subscription.yearlyPlan')}</Text>
                <Text className="text-sm text-muted-foreground mb-3">{yearlySavings}</Text>
                <View className="flex-row items-baseline">
                  <Text className="text-3xl font-bold text-primary">{yearlyPrice}</Text>
                  <Text className="text-sm text-muted-foreground ml-1">
                    /{t('subscription.year')}
                  </Text>
                </View>
              </View>

              <View
                className={cn(
                  'size-7 rounded-full border-2 items-center justify-center',
                  selectedPlan === 'yearly' ? 'border-primary' : 'border-muted-foreground'
                )}
                style={{
                  backgroundColor: selectedPlan === 'yearly' ? colors['--primary'] : 'transparent',
                }}
              >
                {selectedPlan === 'yearly' && (
                  <Check size={18} color={colors['--primary-foreground']} strokeWidth={3} />
                )}
              </View>
            </View>
          </TouchableOpacity>

          {/* Monthly Plan */}
          <TouchableOpacity
            onPress={() => setSelectedPlan('monthly')}
            className={cn(
              'rounded-2xl border-2 p-5',
              selectedPlan === 'monthly' ? 'border-primary bg-card' : 'border-border bg-popover'
            )}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-xl font-bold mb-1">{t('subscription.monthlyPlan')}</Text>
                <View className="flex-row items-baseline mt-2">
                  <Text className="text-3xl font-bold text-primary">{monthlyPrice}</Text>
                  <Text className="text-sm text-muted-foreground ml-1">
                    /{t('subscription.month')}
                  </Text>
                </View>
              </View>

              <View
                className={cn(
                  'size-7 rounded-full border-2 items-center justify-center',
                  selectedPlan === 'monthly' ? 'border-primary' : 'border-muted-foreground'
                )}
                style={{
                  backgroundColor: selectedPlan === 'monthly' ? colors['--primary'] : 'transparent',
                }}
              >
                {selectedPlan === 'monthly' && (
                  <Check size={18} color={colors['--primary-foreground']} strokeWidth={3} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Subscribe Button */}
      <Animated.View entering={FadeInDown.delay(600)} className=" mb-4">
        <TouchableOpacity
          onPress={handlePurchase}
          disabled={purchasing}
          className="rounded-full py-4 items-center justify-center"
          style={{ backgroundColor: colors['--primary'] }}
          activeOpacity={0.8}
        >
          {purchasing ? (
            <ActivityIndicator color={colors['--primary-foreground']} size="small" />
          ) : (
            <View className="flex-row items-center">
              <Sparkles size={20} color={colors['--primary-foreground']} strokeWidth={2.5} />
              <Text
                className="font-bold text-lg ml-2"
                style={{ color: colors['--primary-foreground'] }}
              >
                {t('subscription.subscribe')}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Restore Purchases */}
      <Animated.View entering={FadeInDown.delay(700)} className=" mb-2">
        <TouchableOpacity
          onPress={handleRestore}
          disabled={purchasing}
          className="py-3 items-center"
          activeOpacity={0.7}
        >
          <Text className="text-primary font-semibold">{t('subscription.restorePurchases')}</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Navigate to the Privacy and Terms */}
      <Animated.View
        entering={FadeInDown.delay(800)}
        className="mb-6 flex-row justify-center items-center gap-2 mt-2"
      >
        <TouchableOpacity
          onPress={() => {
            paywallSheetRef.current?.close();
            Linking.openURL('https://pray-tracker.vercel.app/privacy');
          }}
          activeOpacity={0.7}
        >
          <Text className="text-muted-foreground text-xs font-semibold">
            {t('profile.navigation.privacySecurity')}
          </Text>
        </TouchableOpacity>

        <Text className="text-muted-foreground text-xs font-semibold">|</Text>

        <TouchableOpacity
          onPress={() => {
            paywallSheetRef.current?.close();
            Linking.openURL('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/');
          }}
          activeOpacity={0.7}
        >
          <Text className="text-muted-foreground text-xs font-semibold">
            {t('profile.navigation.termsConditions')}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Terms */}
      <Animated.View entering={FadeInDown.delay(900)} className="px-8 pb-10">
        <Text className="text-xs text-muted-foreground text-center leading-5">
          {t('subscription.terms')}
        </Text>
      </Animated.View>
    </ScrollView>
  );
}
