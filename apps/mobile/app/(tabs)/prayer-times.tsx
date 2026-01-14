import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/ui/text';
import PrayerTimer from '@/components/views/qibla/prayer-times';

const PrayerTimesScreen = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 90,
        paddingHorizontal: 16,
      }}
      className="bg-background"
    >
      <View className="mb-4">
        <Text className="text-3xl font-semibold text-foreground">{t('qibla.tabs.times')}</Text>
      </View>
      <PrayerTimer />
    </ScrollView>
  );
};

export default PrayerTimesScreen;
