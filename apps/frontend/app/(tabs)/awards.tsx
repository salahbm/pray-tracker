import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Leaderboard from '@/components/views/awards/leaderboard';
import PersonalTab from '@/components/views/awards/personal';
import { Text } from 'components/ui/text';

export default function AwardsScreen() {
  const { t } = useTranslation();
  const [value, setValue] = useState('personal');

  return (
    <SafeAreaView className="safe-area">
      <Tabs value={value} onValueChange={setValue} className="main-area">
        <TabsList className="flex-row w-full">
          <TabsTrigger value="personal" className="flex-1">
            <Text>{t('Awards.Tabs.Personal')}</Text>
          </TabsTrigger>
          <TabsTrigger value="global" className="flex-1">
            <Text>{t('Awards.Tabs.Leaderboard')}</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="flex-1 h-full flex">
          <PersonalTab />
        </TabsContent>
        <TabsContent value="global" className="flex-1 h-full flex">
          <Leaderboard />
        </TabsContent>
      </Tabs>
    </SafeAreaView>
  );
}
