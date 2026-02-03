import { format } from 'date-fns';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useGetInquiries } from '@/hooks/inquiries/useGetInquiries';
import { useAuthStore } from '@/store/auth/auth-session';
import { InquiryListItem } from '@/types/inquiries';
import { Lock, MessageSquare } from '@/components/shared/icons';

const InquiryListScreen = () => {
  const { t } = useTranslation();
  // const { colors } = useThemeStore();
  const { user } = useAuthStore();
  const isLoggedIn = !!user;

  // Only logged-in users can view inquiry list
  const { data, isLoading, refetch } = useGetInquiries(user?.email);

  const renderItem = ({ item }: { item: InquiryListItem }) => {
    const updatedAt = item.updatedAt ? format(new Date(item.updatedAt), 'MMM d, yyyy') : undefined;
    const statusLabel =
      item.status === 'CLOSED'
        ? t('profile.inquiries.list.status.closed')
        : t('profile.inquiries.list.status.open');
    const lastMessage = item.lastMessage?.body || t('profile.inquiries.list.noMessages');

    return (
      <TouchableOpacity
        className="border border-border rounded-xl px-4 py-3 mb-3"
        onPress={() =>
          router.push({
            pathname: '/(screens)/profile/inquiries/[id]',
            params: { id: item.id, email: user?.email },
          })
        }
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
    <SafeAreaView className="safe-area">
      <GoBack title={t('profile.inquiries.title')} />
      <View className="relative main-area">
        {/* Content */}
        {!isLoggedIn ? (
          <View className="flex-1">
            {/* Centered content */}
            <View className="flex-1 items-center justify-center px-6">
              <View className="bg-muted rounded-full p-4 mb-4">
                <Lock className="size-12 text-muted-foreground" />
              </View>

              <Text className="text-base font-semibold mb-2">
                {t('profile.inquiries.loginRequired')}
              </Text>

              <Text className="text-sm text-muted-foreground text-center mb-6">
                {t('profile.inquiries.loginRequiredDescription')}
              </Text>
            </View>

            {/* Bottom button */}
            <View className="pb-6">
              <Button
                variant="default"
                onPress={() => router.push('/(screens)/profile/inquiries/new')}
                className="w-full"
              >
                <Text>{t('profile.inquiries.newButton')}</Text>
              </Button>
            </View>
          </View>
        ) : isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View className="flex-1">
            <FlatList
              data={data ?? []}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
              contentContainerStyle={{ paddingBottom: 96 }} // space for button
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View className="items-center mt-12 px-6">
                  <View className="bg-muted rounded-full p-4 mb-4">
                    <MessageSquare className="size-8 text-muted-foreground" />
                  </View>
                  <Text className="text-base font-semibold mb-2">
                    {t('profile.inquiries.list.emptyTitle')}
                  </Text>
                  <Text className="text-sm text-muted-foreground text-center">
                    {t('profile.inquiries.list.emptyDescription')}
                  </Text>
                </View>
              }
            />

            {/* Fixed bottom button */}
            <View className="absolute bottom-6 left-4 right-4">
              <Button
                variant="default"
                size="lg"
                className="w-full "
                onPress={() => router.push('/(screens)/profile/inquiries/new')}
              >
                <Text className="text-lg font-medium">{t('profile.inquiries.list.newButton')}</Text>
              </Button>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default InquiryListScreen;
