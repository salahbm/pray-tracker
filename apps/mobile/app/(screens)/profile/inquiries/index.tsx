import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useGetInquiries } from '@/hooks/inquiries/useGetInquiries';
import { useThemeStore } from '@/store/defaults/theme';
import { InquiryListItem } from '@/types/inquiries';

const InquiryListScreen = () => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const { data, isLoading } = useGetInquiries();

  const renderItem = ({ item }: { item: InquiryListItem }) => {
    const updatedAt = item.updatedAt
      ? format(new Date(item.updatedAt), 'MMM d, yyyy')
      : undefined;
    const statusLabel =
      item.status === 'CLOSED'
        ? t('profile.inquiries.list.status.closed')
        : t('profile.inquiries.list.status.open');
    const lastMessage = item.lastMessage?.body || t('profile.inquiries.list.noMessages');

    return (
      <TouchableOpacity
        className="border border-border rounded-xl px-4 py-3 mb-3"
        onPress={() => router.push(`/(screens)/profile/inquiries/${item.id}`)}
      >
        <View className="flex-row items-start justify-between gap-2">
          <View className="flex-1">
            <Text className="text-base font-semibold" numberOfLines={1}>
              {item.subject}
            </Text>
            <Text className="text-sm text-muted-foreground mt-1" numberOfLines={2}>
              {lastMessage}
            </Text>
          </View>
          <View className="items-end">
            <View className="px-2 py-1 rounded-full bg-muted">
              <Text className="text-xs text-muted-foreground">{statusLabel}</Text>
            </View>
            {updatedAt ? (
              <Text className="text-xs text-muted-foreground mt-2">{updatedAt}</Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="main-area">
      <GoBack title={t('profile.inquiries.title')} />
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold">{t('profile.inquiries.list.title')}</Text>
          <Button
            variant="secondary"
            size="sm"
            onPress={() => router.push('/(screens)/profile/inquiries/new')}
          >
            <Text className="text-sm">{t('profile.inquiries.list.newButton')}</Text>
          </Button>
        </View>

        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="small" color={colors['--primary']} />
          </View>
        ) : (
          <FlatList
            data={data ?? []}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            ListEmptyComponent={
              <View className="items-center mt-12 px-6">
                <View className="bg-muted rounded-full p-4 mb-4">
                  <Feather name="message-square" size={24} color={colors['--primary']} />
                </View>
                <Text className="text-base font-semibold">
                  {t('profile.inquiries.list.emptyTitle')}
                </Text>
                <Text className="text-sm text-muted-foreground text-center mt-2">
                  {t('profile.inquiries.list.emptyDescription')}
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default InquiryListScreen;
