import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import PrayerTimer from '@/components/views/qibla/prayer-times';
import QiblaCompass from '@/components/views/qibla/qibla-compass';

const QiblaScreen = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState('qibla');

  return (
    <SafeAreaView className="safe-area">
      <Tabs value={value} onValueChange={setValue} className="main-area">
        <TabsList className="flex-row w-full">
          <TabsTrigger value="qibla" className="flex-1">
            <Text>{t('Qibla.Tabs.Qibla')}</Text>
          </TabsTrigger>
          <TabsTrigger value="salahs" className="flex-1">
            <Text>{t('Qibla.Tabs.Times')}</Text>
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
