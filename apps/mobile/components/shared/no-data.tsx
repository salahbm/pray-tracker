import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

import { gifs } from '@/constants/images';
import { cn } from '@/lib/utils';

import { Text } from '../ui/text';

const NoData = ({
  className,
  title,
  imageClassName,
}: {
  className?: string;
  title?: string;
  imageClassName?: string;
}) => {
  const { t } = useTranslation();
  return (
    <View className={cn('m-auto flex flex-col items-center', className)}>
      <LottieView
        source={gifs.empty}
        autoPlay
        loop={false}
        style={{ width: 150, height: 150 }}
        resizeMode="contain"
      />
      {title && <Text className="text-xl text-center text-muted-foreground mt-2">{t(title)}</Text>}
    </View>
  );
};

export default NoData;
