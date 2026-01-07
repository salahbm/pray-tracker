import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

import GoBack from '@/components/shared/go-back';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useGetInquiry } from '@/hooks/inquiries/useGetInquiry';
import { useSendInquiryMessage } from '@/hooks/inquiries/useSendInquiryMessage';
import { fireToast } from '@/providers/toaster';
import { useThemeStore } from '@/store/defaults/theme';
import { InquiryMessage } from '@/types/inquiries';

const InquiryDetailScreen = () => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const { id } = useLocalSearchParams<{ id: string }>();
  const inquiryId = Array.isArray(id) ? id[0] : id;
  const { data: inquiry, isLoading } = useGetInquiry(inquiryId);
  const { mutateAsync: sendMessage, isPending } = useSendInquiryMessage();
  const [reply, setReply] = useState('');

  const statusLabel = useMemo(() => {
    if (!inquiry) return '';
    return inquiry.status === 'CLOSED'
      ? t('profile.inquiries.list.status.closed')
      : t('profile.inquiries.list.status.open');
  }, [inquiry, t]);

  const handleSend = async () => {
    if (!reply.trim() || !inquiryId) return;

    try {
      await sendMessage({ inquiryId, message: reply.trim() });
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
        <View
          className={`rounded-2xl px-4 py-2 max-w-[80%] ${
            isUser ? 'bg-primary' : 'bg-muted'
          }`}
        >
          <Text className={isUser ? 'text-primary-foreground' : 'text-foreground'}>
            {item.body}
          </Text>
        </View>
        <Text className="text-xs text-muted-foreground mt-1">{timeLabel}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="main-area">
      <GoBack title={t('profile.inquiries.detail.title')} />

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="small" color={colors['--primary']} />
        </View>
      ) : (
        <View className="flex-1">
          <View className="mb-4">
            <Text className="text-lg font-semibold">{inquiry?.subject}</Text>
            <Text className="text-sm text-muted-foreground mt-1">{statusLabel}</Text>
          </View>

          <FlatList
            data={inquiry?.messages ?? []}
            keyExtractor={item => item.id}
            renderItem={renderMessage}
            contentContainerStyle={{ paddingBottom: 16 }}
            ListEmptyComponent={
              <Text className="text-sm text-muted-foreground">
                {t('profile.inquiries.detail.emptyMessages')}
              </Text>
            }
          />

          <View className="pt-4">
            <Input
              value={reply}
              onChangeText={setReply}
              placeholder={t('profile.inquiries.detail.replyPlaceholder')}
              multiline
              className="min-h-[100px]"
            />
            <View className="mt-3">
              <Button onPress={handleSend} disabled={isPending || !reply.trim()} width="full">
                <Text>{t('profile.inquiries.detail.sendButton')}</Text>
              </Button>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default InquiryDetailScreen;
