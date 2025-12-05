import { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import {
  Check,
  Sparkles,
  Users,
  TrendingUp,
  Bell,
  Palette,
  Shield,
  Zap,
} from 'lucide-react-native';

import { Text } from '@/components/ui/text';
import { useThemeStore } from '@/store/defaults/theme';
import { cn } from '@/lib/utils';
import { fireToast } from '@/providers/toaster';
import { useRevenueCatOfferings, usePurchasePackage } from '@/hooks/subscriptions/useRevenueCat';
import { useAuthBottomSheetStore, usePaywallBottomSheetStore } from '@/store/bottom-sheets';
import { FRIENDS, IMAGES } from '@/constants/images';
import { useAuthStore } from '@/store/auth/auth-session';
import LottieView from 'lottie-react-native';
import { gifs } from '@/constants/onboarding';
import { LinearGradient } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PREMIUM_FEATURES = [
  {
    key: 'unlimitedFriends',
    title: 'subscription.features.unlimitedFriends',
    icon: Users,
    image: FRIENDS.friend_3,
  },
  {
    key: 'friendGroups',
    title: 'subscription.features.friendGroups',
    icon: Users,
    image: IMAGES.check,
  },
  {
    key: 'detailedStats',
    title: 'subscription.features.detailedStats',
    icon: TrendingUp,
    image: IMAGES.check,
  },
  {
    key: 'prayerReminders',
    title: 'subscription.features.prayerReminders',
    icon: Bell,
    image: IMAGES.check,
  },
  {
    key: 'customThemes',
    title: 'subscription.features.customThemes',
    icon: Palette,
    image: IMAGES.check,
  },
  {
    key: 'adFree',
    title: 'subscription.features.adFree',
    icon: Shield,
    image: IMAGES.check,
  },
];

export default function PaywallScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuthStore();
  const { signInSheetRef } = useAuthBottomSheetStore();
  const insets = useSafeAreaInsets();
  const { colors, currentTheme } = useThemeStore();
  const { paywallSheetRef } = usePaywallBottomSheetStore();

  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const { packages, loading: loadingOfferings } = useRevenueCatOfferings();
  const { purchase, restorePurchases, purchasing } = usePurchasePackage();

  useEffect(() => {
    setSelectedPlan('yearly');
  }, []);

  const handlePurchase = async () => {
    if (!user) {
      signInSheetRef.current?.snapToIndex(1);
      return;
    }
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
    if (!user) {
      signInSheetRef.current?.snapToIndex(1);
      return;
    }
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

  const renderFeatureCard = ({
    item,
    index,
  }: {
    item: (typeof PREMIUM_FEATURES)[0];
    index: number;
  }) => {
    const Icon = item.icon;

    return (
      <View style={{ width: SCREEN_WIDTH - 80 }} className="mr-4 h-fit aspect-[3/4]">
        <View className="bg-card rounded-2xl overflow-hidden h-full border border-border relative">
          {/* Full Image */}
          <Image
            source={item.image}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
          />

          {/* Gradient for readability */}
          <View className="absolute inset-x-0 bottom-0 p-5">
            <Text className="text-base font-semibold flex-1 text-white">{t(item.title)}</Text>
          </View>
        </View>
      </View>
    );
  };

  if (loadingOfferings) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors['--primary']} />
        <Text className="mt-4 text-muted-foreground">{t('subscription.loadingPlans')}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 relative"
      contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View entering={FadeInUp.delay(100)} className="items-center  mb-8">
        <LottieView
          source={gifs.man_premium}
          autoPlay
          loop
          style={{ height: 320, width: '100%' }}
          resizeMode="cover"
        />
        {/* 
<Image
          source={currentTheme === 'light' ? IMAGES.icon_light : IMAGES.icon_dark}
          className="w-40 h-40 rounded-full border border-border mb-6"
        /> */}
        <Text className="text-2xl font-bold text-center mb-2">{t('subscription.title')} +</Text>

        <Text className="text-base text-muted-foreground text-center max-w-sm leading-6">
          {t('subscription.subtitle')}
        </Text>
      </Animated.View>

      {/* Feature Carousel */}
      <Animated.View entering={FadeInDown.delay(200)} className="my-8">
        <FlatList
          ref={flatListRef}
          data={PREMIUM_FEATURES}
          renderItem={renderFeatureCard}
          keyExtractor={item => item.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={event => {
            const index = Math.round(event.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 80 + 16));
            setActiveFeatureIndex(index);
          }}
          snapToInterval={SCREEN_WIDTH - 80 + 16}
          decelerationRate="fast"
          contentContainerStyle={{ paddingLeft: 4 }}
        />

        {/* Pagination Dots */}
        <View className="flex-row justify-center mt-5 gap-2">
          {PREMIUM_FEATURES.map((_, index) => (
            <View
              key={index}
              className={cn(
                'h-1.5 rounded-full',
                index === activeFeatureIndex ? 'w-6' : 'w-1.5',
                index === activeFeatureIndex ? 'bg-primary' : 'bg-primary opacity-50'
              )}
            />
          ))}
        </View>
      </Animated.View>

      {/* Pricing Plans */}
      <Animated.View entering={FadeInDown.delay(400)} className="mb-6">
        <Text className="text-xl font-bold mb-5">{t('subscription.choosePlan')}</Text>

        {/* Yearly Plan */}
        <TouchableOpacity
          onPress={() => setSelectedPlan('yearly')}
          className={cn(
            'mb-4 rounded-2xl border-2 p-5 relative',
            selectedPlan === 'yearly' ? 'border-primary bg-primary/5' : 'border-border bg-card'
          )}
          activeOpacity={0.7}
        >
          {/* Best Value Badge */}
          <View
            className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl rounded-tr-2xl"
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
            selectedPlan === 'monthly' ? 'border-primary bg-primary/5' : 'border-border bg-card'
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

      {/* Subscribe Button */}
      <Animated.View entering={FadeInDown.delay(600)} className="my-4">
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
      <Animated.View entering={FadeInDown.delay(700)} className="mb-4">
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
      <Animated.View entering={FadeInDown.delay(800)} className="mb-4">
        <TouchableOpacity
          onPress={() => paywallSheetRef.current?.close()}
          className="py-3 items-center"
          activeOpacity={0.7}
        >
          <Text className="text-muted-foreground">{t('common.actions.cancel')}</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Terms */}
      <Animated.View entering={FadeInDown.delay(900)} className="px-6 pb-10">
        <Text className="text-xs text-muted-foreground text-center leading-5">
          {t('subscription.terms')}
        </Text>
      </Animated.View>
    </ScrollView>
  );
}
