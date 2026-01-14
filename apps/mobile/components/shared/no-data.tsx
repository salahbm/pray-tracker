import LottieView from 'lottie-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, TouchableOpacity } from 'react-native';
import { RefreshCcw } from '@/components/shared/icons';

import { gifs } from '@/constants/images';
import { cn } from '@/lib/utils';
import { Text } from '../ui/text';

interface NoDataProps {
  className?: string;
  title?: string;
  description?: string;
  onRetry?: () => void;
  hideImage?: boolean;
}

const NoData = ({
  className,
  title = 'common.noData', // Default translation key
  description,
  onRetry,
  hideImage = false,
}: NoDataProps) => {
  const { t } = useTranslation();

  return (
    <View className={cn('flex-1 justify-center items-center p-6 bg-background', className)}>
      {!hideImage && (
        <View className="w-full items-center mb-6">
          <LottieView
            source={gifs.cat_playing}
            autoPlay
            loop={true} // Usually better to loop 'empty' states so it doesn't look frozen
            style={{ width: '100%', height: 180 }}
            resizeMode="contain"
          />
        </View>
      )}

      {/* Text Content */}
      <View className="items-center gap-2 max-w-[80%]">
        <Text className="text-xl font-bold text-center text-foreground">{t(title)}</Text>

        {description && (
          <Text className="text-sm text-center text-muted-foreground leading-6">
            {t(description)}
          </Text>
        )}
      </View>

      {/* Action Button */}
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          activeOpacity={0.8}
          className="mt-8 flex-row items-center gap-2 bg-primary px-6 py-3 rounded-full shadow-lg shadow-primary/20"
        >
          <RefreshCcw size={18} className="text-primary-foreground" />
          <Text className="text-primary-foreground font-semibold">{t('common.retry')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NoData;
