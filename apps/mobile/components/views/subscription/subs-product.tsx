import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
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

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Localization from 'expo-localization';

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
import { ChevronLeft, ChevronRight, Sparkles as SparklesIcon } from '@/components/shared/icons';
import { PressableBounce } from '@/components/shared/pressable-bounce';
import { Sparkles } from '@/components/shared/sparks';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { BorderBeam } from '@/components/shared/vfx';

type SubProductCardProps = {
  selectedPlan: 'monthly' | 'yearly';
  setSelectedPlan: (plan: 'monthly' | 'yearly') => void;

  monthlyPrice: string;
  yearlyPrice: string;
  yearlySavings: string;
};

const SubProductCard: React.FC<SubProductCardProps> = ({
  selectedPlan,
  setSelectedPlan,
  monthlyPrice,
  yearlyPrice,
  yearlySavings,
}) => {
  const { t } = useTranslation();
  return (
    <Animated.View entering={FadeInDown.delay(400)} className="my-6">
      <Text className="text-xl font-bold mb-4">{t('subscription.choosePlan')}</Text>

      {/* Monthly Plan */}
      <PressableBounce
        onPress={() => setSelectedPlan('monthly')}
        className={cn(
          'rounded-2xl border-2 p-5 relative overflow-hidden',
          selectedPlan === 'monthly'
            ? 'border-primary bg-background/50'
            : 'border-border bg-background/50'
        )}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-xl font-bold mb-1">{t('subscription.monthlyPlan')}</Text>
            <View className="self-start rounded-full flex-center bg-primary/10 px-3 py-1 mb-2 relative overflow-hidden">
              <Text className="text-xs font-bold text-primary">
                7 {t('subscription.trialBadge')}
              </Text>
              <BorderBeam
                duration={4000}
                size={75}
                borderWidth={1}
                colorFrom="#ffaa40"
                colorTo="#9c40ff"
                rx={12}
                ry={24}
              />
            </View>
            <View className="flex-row items-baseline mt-2">
              <Text className="text-3xl font-bold text-primary">{monthlyPrice}</Text>
              <Text className="text-sm text-muted-foreground ml-1">/{t('subscription.month')}</Text>
            </View>
          </View>

          <View
            className={cn(
              'size-7 rounded-full border-2 items-center justify-center',
              selectedPlan === 'monthly' ? 'border-primary' : 'border-muted-foreground'
            )}
          >
            {selectedPlan === 'monthly' && <View className="size-2 rounded-full bg-primary" />}
          </View>
        </View>
      </PressableBounce>

      {/* Yearly Plan */}
      <PressableBounce
        onPress={() => setSelectedPlan('yearly')}
        className={cn(
          'mt-4 rounded-2xl border-2 p-5 relative',
          selectedPlan === 'yearly'
            ? 'border-primary bg-background/50'
            : 'border-border bg-background/50'
        )}
      >
        {/* Best Value Badge */}
        <View className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl rounded-tr-xl">
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
              <Text className="text-sm text-muted-foreground ml-1">/{t('subscription.year')}</Text>
            </View>
          </View>

          <View
            className={cn(
              'size-7 rounded-full border-2 items-center justify-center',
              selectedPlan === 'yearly' ? 'border-primary' : 'border-muted-foreground'
            )}
          >
            {selectedPlan === 'yearly' && <View className="size-2 rounded-full bg-primary" />}
          </View>
        </View>
      </PressableBounce>
    </Animated.View>
  );
};

export { SubProductCard };
