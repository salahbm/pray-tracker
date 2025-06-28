import { SafeAreaView } from 'react-native-safe-area-context';

import Leaderboard from '@/components/views/awards/leaderboard';

export default function AwardsScreen() {
  // const { t } = useTranslation();
  // const [value, setValue] = useState('personal');

  // !TODO: Add tabs and personal tab in next version
  return (
    <SafeAreaView className="safe-area">
      {/* <Tabs value={value} onValueChange={setValue} className="main-area">
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
        <TabsContent value="global" className="flex-1 h-full flex"> */}
      <Leaderboard />
      {/* </TabsContent>
      </Tabs> */}
    </SafeAreaView>
  );
}
