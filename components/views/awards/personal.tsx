import { View } from 'react-native';

import Loader from '@/components/shared/loader';
import { Text } from '@/components/ui/text';
import { useAwards } from '@/hooks/awards/useGetAwards';
import { useAuthStore } from '@/store/auth/auth-session';

export default function PersonalTab() {
  const { user } = useAuthStore();
  const { data, isLoading } = useAwards(user?.id);

  return (
    <View>
      <Loader visible={isLoading} />
      {data?.map((award) => (
        <View className="flex-row items-center" key={award.id}>
          <View className="size-24 rounded-full bg-foreground border border-border" />
          <View className="ml-2">
            <Text>{award.title}</Text>
            <Text>{award.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
