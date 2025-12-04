import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import PrayerTimer from '@/components/views/qibla/prayer-times';
import QiblaCompass from '@/components/views/qibla/qibla-compass';
import { useLocalSearchParams } from 'expo-router';

const QiblaScreen = () => {
  const { t } = useTranslation();
  const { tab } = useLocalSearchParams();
  const [value, setValue] = useState(tab as string || 'salahs');
  return (
    <SafeAreaView className="safe-area">
      <Tabs value={value} onValueChange={setValue} className="main-area">
        <TabsList className="flex-row w-full">
     
          <TabsTrigger value="salahs" className="flex-1">
            <Text>{t('qibla.tabs.times')}</Text>
          </TabsTrigger>
          <TabsTrigger value="qibla" className="flex-1">
            <Text>{t('qibla.tabs.qibla')}</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="qibla">
          {/* QIBLA */}
          <QiblaCompass />
        </TabsContent>
        <TabsContent value="salahs">
          {/* TIME AND LOCATION */}
          <PrayerTimer />
        </TabsContent>
      </Tabs>
    </SafeAreaView>
  );
};

export default QiblaScreen;
