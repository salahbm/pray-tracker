import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image } from 'react-native';

import { Text } from '../ui/text';
import { IMAGES } from '@/constants/images';
import { cn } from '@/lib/utils';

const NoData = ({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) => {
  const { t } = useTranslation();
  return (
    <View className={cn('m-auto flex flex-col items-center', className)}>
      <Image
        source={IMAGES.no_data}
        className="w-[130px] h-[130px] object-contain border border-border rounded-full bg-foreground"
      />
      <Text className="text-xl text-muted-foreground mt-2">
        {title || t('Defaults.noData')}
      </Text>
    </View>
  );
};

export default NoData;
