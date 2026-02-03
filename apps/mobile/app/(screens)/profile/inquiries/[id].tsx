import { format } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useGetInquiry } from '@/hooks/inquiries/useGetInquiry';
import { useSendInquiryMessage } from '@/hooks/inquiries/useSendInquiryMessage';
import { cn } from '@/lib/utils';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { InquiryMessage } from '@/types/inquiries';

const InquiryDetailScreen = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  // const { colors } = useThemeStore();
  const insets = useSafeAreaInsets();
  const { id, email: emailParam } = useLocalSearchParams<{ id: string; email?: string }>();
  const inquiryId = Array.isArray(id) ? id[0] : id;
  const email = (Array.isArray(emailParam) ? emailParam[0] : emailParam) || user?.email || '';
  const { data: inquiry, isLoading } = useGetInquiry(inquiryId, email);
  const { mutateAsync: sendMessage, isPending } = useSendInquiryMessage();
  const [reply, setReply] = useState('');

  const statusLabel = useMemo(() => {
    if (!inquiry) return '';
    return inquiry.status === 'CLOSED'
      ? t('profile.inquiries.list.status.closed')
      : t('profile.inquiries.list.status.open');
  }, [inquiry, t]);

  const handleSend = async () => {
    if (!reply.trim() || !inquiryId || !email) return;

    try {
      await sendMessage({ inquiryId, message: reply.trim(), email });
      setReply('');
    } catch (error) {
      fireToast.error((error as Error)?.message || t('profile.inquiries.detail.error'));
    }
  };

  const renderMessage = ({ item }: { item: InquiryMessage }) => {
    const isUser = item.senderRole === 'USER';
    const timeLabel = format(new Date(item.createdAt), 'MMM d, h:mm a');

    return (
      <View className={`mb-3 ${isUser ? 'items-end' : 'items-start'}`}>
        <View className={`rounded-2xl px-4 py-2 max-w-[80%] ${isUser ? 'bg-primary' : 'bg-muted'}`}>
          <Text className={isUser ? 'text-primary-foreground' : 'text-foreground'}>
            {item.body}
          </Text>
        </View>
        <Text className="text-xs text-muted-foreground mt-1">{timeLabel}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="safe-area" style={{ paddingBottom: insets.bottom + 50 }}>
      <GoBack title={t('profile.inquiries.detail.title')} />

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : !inquiry ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-sm text-muted-foreground text-center">
            {t('profile.inquiries.detail.emptyMessages')}
          </Text>
        </View>
      ) : (
        <View className="main-area">
          {/* Header */}
          <View className="mt-6 mb-2">
            <Text className="text-xl font-bold">{inquiry.subject}</Text>
            <View className="flex-row items-center mt-2">
              <View className="px-3 py-1 rounded-md bg-muted">
                <Text className="text-xs font-medium text-muted-foreground">{statusLabel}</Text>
              </View>
            </View>
          </View>

          {/* Messages */}
          <View className="flex-1">
            <FlatList
              data={inquiry.messages ?? []}
              keyExtractor={item => item.id}
              renderItem={renderMessage}
              contentContainerStyle={{ paddingBottom: 220 }} // space for input
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View className="items-center py-12">
                  <Text className="text-sm text-muted-foreground">
                    {t('profile.inquiries.detail.emptyMessages')}
                  </Text>
                </View>
              }
            />

            {/* Sticky reply box */}

            <Input
              value={reply}
              onChangeText={setReply}
              placeholder={t('profile.inquiries.detail.replyPlaceholder')}
              multiline
              numberOfLines={4}
              className={cn(
                'min-h-[100px] h-[100px] p-3 transition-all duration-300 ease-in-out',
                isPending ? 'animate-pulse border-dashed border-muted' : ''
              )}
              textAlignVertical="top"
              keyboardType="default"
              returnKeyType="send"
              editable={!isPending && inquiry.status !== 'CLOSED'}
              submitBehavior="submit"
              onSubmitEditing={() => {
                if (isPending) return;
                if (!reply.trim()) return;
                if (inquiry.status === 'CLOSED') return;

                handleSend();
              }}
            />

            {/* <Button
        onPress={handleSend}
        disabled={isPending || !reply.trim() || inquiry.status === "CLOSED"}
        width="full"
        className="mt-3"
      >
        <Text>{t("profile.inquiries.detail.sendButton")}</Text>
      </Button> */}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default InquiryDetailScreen;
