import { useState } from 'react';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useCreateInquiry } from '@/hooks/inquiries/useCreateInquiry';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';

const NewInquiryScreen = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { mutateAsync: createInquiry, isPending } = useCreateInquiry();
  const [email, setEmail] = useState(user?.email ?? '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!email.trim() || !subject.trim() || !message.trim()) {
      fireToast.error(t('profile.inquiries.new.validationError'));
      return;
    }

    try {
      const inquiry = await createInquiry({
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });

      fireToast.success(t('profile.inquiries.new.success'));
      setSubject('');
      setMessage('');

      if (inquiry?.id) {
        router.replace({
          pathname: '/(screens)/profile/inquiries/[id]',
          params: { id: inquiry.id, email: email.trim() },
        });
      }
    } catch (error) {
      fireToast.error((error as Error)?.message || t('profile.inquiries.new.error'));
    }
  };

  return (
    <SafeAreaView className="main-area">
      <GoBack title={t('profile.inquiries.new.title')} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="gap-6">
          <Input
            label={t('profile.inquiries.new.emailLabel')}
            placeholder={t('profile.inquiries.new.emailPlaceholder')}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input
            label={t('profile.inquiries.new.subjectLabel')}
            placeholder={t('profile.inquiries.new.subjectPlaceholder')}
            value={subject}
            onChangeText={setSubject}
            autoCapitalize="sentences"
            returnKeyType="next"
          />
          <Input
            label={t('profile.inquiries.new.messageLabel')}
            placeholder={t('profile.inquiries.new.messagePlaceholder')}
            value={message}
            onChangeText={setMessage}
            autoCapitalize="sentences"
            multiline
            className="min-h-[120px]"
          />
        </View>
      </ScrollView>
      <View className="pt-4">
        <Button onPress={handleSubmit} disabled={isPending} width="full">
          <Text>{t('profile.inquiries.new.submitButton')}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default NewInquiryScreen;
