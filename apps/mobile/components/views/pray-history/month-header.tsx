import { Text } from '@/components/ui/text';
import { format } from 'date-fns';
import { View } from 'react-native';

export const RenderHeader = (date: Date) => (
  <View className="flex-row items-start w-full">
    <Text className="font-subtitle">{format(date, 'MMMM')}</Text>
  </View>
);
