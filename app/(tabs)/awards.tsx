import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Loader from '@/components/shared/loader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalTab from '@/components/views/awards/personal';
import { useGetUsersList } from '@/hooks/awards/useGetUsers';
import { Text } from 'components/ui/text';

export default function HomeScreen() {
  const { data, isLoading } = useGetUsersList();
  const [value, setValue] = useState('personal');

  return (
    <SafeAreaView className="main-area">
      <Loader visible={isLoading} />
      <View>
        <Tabs
          value={value}
          onValueChange={setValue}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5 "
        >
          <TabsList className="flex-row w-full">
            <TabsTrigger value="personal" className="flex-1">
              <Text>My Records</Text>
            </TabsTrigger>
            <TabsTrigger value="global" className="flex-1">
              <Text>Leaderboard</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <Text>Personal Records</Text>
            <PersonalTab />
          </TabsContent>
          <TabsContent value="global">
            {/*GLOBAL */}

            <View>
              <Text> List of users</Text>
              {data?.map((user) => (
                <View
                  key={user.id}
                  className="mb-2 flex-row w-full items-center justify-between"
                >
                  <Text>{user.username}</Text>
                  <Text>{user.totalPoints}</Text>
                  <Text>{user.email}</Text>
                </View>
              ))}
            </View>
          </TabsContent>
        </Tabs>
      </View>
    </SafeAreaView>
  );
}
