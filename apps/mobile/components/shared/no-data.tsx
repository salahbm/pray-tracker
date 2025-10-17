import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';

import { IMAGES } from '@/constants/images';
import { cn } from '@/lib/utils';

import { Text } from '../ui/text';

const NoData = ({ className, title }: { className?: string; title?: string }) => {
  const { t } = useTranslation();
  return (
    <View className={cn('m-auto flex flex-col items-center', className)}>
      <Image
        source={IMAGES.no_result}
        className="w-[130px] h-[130px] object-contain max-w-[130px] max-h-[130px]"
      />
      <Text className="text-xl text-muted-foreground mt-2">{title || t('Commons.noData')}</Text>
    </View>
  );
};

export default NoData;
