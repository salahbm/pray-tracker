import { useRouter } from 'expo-router';
import { Crown, Lock } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { useSubscription } from '@/hooks/subscriptions/useSubscription';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';

interface PremiumGuardProps {
  children: React.ReactNode;
  feature?: string;
  showUpgradeButton?: boolean;
}

/**
 * Component that wraps premium features and shows upgrade prompt for free users
 */
export const PremiumGuard: React.FC<PremiumGuardProps> = ({
  children,
  feature = 'this feature',
  showUpgradeButton = true,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { colors } = useThemeStore();
  const { user } = useAuthStore();
  const { data: subscription, isLoading } = useSubscription(user?.id);

  // Show loading state
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-muted-foreground">{t('common.loading')}</Text>
      </View>
    );
  }

  // If user has premium, show the content
  if (subscription?.isPremium) {
    return <>{children}</>;
  }

  // Show upgrade prompt for free users
  return (
    <View className="flex-1 items-center justify-center p-6">
      <View className="size-20 items-center justify-center rounded-full bg-primary/10 mb-4">
        <Crown size={40} color={colors['--primary']} />
      </View>

      <Text className="text-2xl font-bold text-center mb-2">{t('subscription.upgradeTitle')}</Text>

      <Text className="text-base text-muted-foreground text-center mb-6">
        {t('subscription.upgradeDescription')}
      </Text>

      {showUpgradeButton && (
        <TouchableOpacity
          onPress={() => router.push('/subscription/paywall')}
          className="bg-primary rounded-full py-4 px-8 items-center justify-center"
          activeOpacity={0.8}
        >
          <View className="flex-row items-center">
            <Crown size={20} color="white" />
            <Text className="text-white text-lg font-bold ml-2">{t('subscription.viewPlans')}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

/**
 * Simple badge to show premium-only features
 */
export const PremiumBadge: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const { colors } = useThemeStore();

  const sizeClasses = {
    sm: 'px-2 py-0.5',
    md: 'px-3 py-1',
    lg: 'px-4 py-2',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <View className={`flex-row items-center bg-primary/10 rounded-full ${sizeClasses[size]}`}>
      <Crown size={iconSizes[size]} color={colors['--primary']} />
      <Text className={`${textSizes[size]} font-semibold text-primary ml-1`}>Premium</Text>
    </View>
  );
};
