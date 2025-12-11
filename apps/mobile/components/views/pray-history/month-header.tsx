import { View } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';

import { Text } from '@/components/ui/text';

interface RenderHeaderProps {
  date: Date;
  locale: string;
}

export const RenderHeader = ({ date, locale }: RenderHeaderProps) => {
  const monthIndex = date.getMonth();
  const monthName = LocaleConfig.locales[locale]?.monthNames?.[monthIndex] || 'Month';

  return (
    <View className="flex-row items-start w-full">
      <Text className="font-subtitle">{monthName}</Text>
    </View>
  );
};
