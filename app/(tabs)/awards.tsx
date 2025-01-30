import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Leaderboard from '@/components/views/awards/leaderboard';
import PersonalTab from '@/components/views/awards/personal';
import { Text } from 'components/ui/text';

export default function HomeScreen() {
  const [value, setValue] = useState('personal');

  return (
    <SafeAreaView className="main-area">
      <Tabs
        value={value}
        onValueChange={setValue}
        className="w-full max-w-[400px] mx-auto flex-col gap-1.5 flex-1"
      >
        <TabsList className="flex-row w-full">
          <TabsTrigger value="personal" className="flex-1">
            <Text>My Records</Text>
          </TabsTrigger>
          <TabsTrigger value="global" className="flex-1">
            <Text>Leaderboard</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="flex-1 h-full flex">
          <PersonalTab />
        </TabsContent>
        <TabsContent value="global" className="flex-1 h-full flex">
          {/*GLOBAL */}
          <Leaderboard />
        </TabsContent>
      </Tabs>
    </SafeAreaView>
  );
}
