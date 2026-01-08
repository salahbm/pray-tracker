import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LocationPermissionModal } from '@/components/shared/modals/location-permission-modal';
import { NotificationPermissionModal } from '@/components/shared/modals/notification-permission-modal';
import { Activity } from '@/components/ui/activity';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import PrayerTimer from '@/components/views/qibla/prayer-times';
import QiblaCompass from '@/components/views/qibla/qibla-compass';

const QiblaScreen = () => {
  const { t } = useTranslation();
  const { tab } = useLocalSearchParams();
  const [value, setValue] = useState((tab as string) || 'salahs');
  return (
    <SafeAreaView className="safe-area">
      <NotificationPermissionModal />
      <LocationPermissionModal />
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
          <Activity mode={value === 'qibla' ? 'visible' : 'hidden'}>
            <QiblaCompass />
          </Activity>
        </TabsContent>
        <TabsContent value="salahs">
          {/* TIME AND LOCATION */}
          <Activity mode={value === 'salahs' ? 'visible' : 'hidden'}>
            <PrayerTimer />
          </Activity>
        </TabsContent>
      </Tabs>
    </SafeAreaView>
  );
};

export default QiblaScreen;
