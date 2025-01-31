import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import PrayerTimer from '@/components/views/qibla/prayer-times';
import QiblaCompass from '@/components/views/qibla/qibla-compass';

const QiblaScreen = () => {
  const [value, setValue] = useState('qibla');

  return (
    <SafeAreaView className="main-area">
      <View>
        <Tabs
          value={value}
          onValueChange={setValue}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full">
            <TabsTrigger value="qibla" className="flex-1">
              <Text>Qibla</Text>
            </TabsTrigger>
            <TabsTrigger value="salahs" className="flex-1">
              <Text>Times</Text>
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
      </View>
    </SafeAreaView>
  );
};

export default QiblaScreen;
