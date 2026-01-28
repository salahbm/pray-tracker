import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Lock } from '@/components/shared/icons';
import { Text } from '@/components/ui/text';
import { useThemeStore } from '@/store/defaults/theme';

const PremiumLocked = () => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();

  return (
    <View className="mt-4 rounded-2xl border border-border bg-muted/40 px-4 py-6 items-center">
      <Lock className="mb-3" color={colors['--muted-foreground']} size={28} />
      <Text className="text-base font-semibold text-center">{t('stats.premiumLocked.title')}</Text>
      <Text className="text-sm text-muted-foreground text-center mt-2">
        {t('stats.premiumLocked.description')}
      </Text>
    </View>
  );
};

export default PremiumLocked;
