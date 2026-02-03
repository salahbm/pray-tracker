import { router } from 'expo-router';
import { useState } from 'react';
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
  const isLoggedIn = !!user;
  const { mutateAsync: createInquiry, isPending } = useCreateInquiry();
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const emailToUse = isLoggedIn ? user.email : email.trim();

    if (!emailToUse || !subject.trim() || !message.trim()) {
      fireToast.error(t('profile.inquiries.new.validationError'));
      return;
    }

    try {
      const inquiry = await createInquiry({
        email: emailToUse,
        subject: subject.trim(),
        message: message.trim(),
      });

      // Clear form
      setSubject('');
      setMessage('');
      if (!isLoggedIn) {
        setEmail('');
      }

      if (isLoggedIn && inquiry?.id) {
        // Authenticated users: redirect to detail page
        fireToast.success(t('profile.inquiries.new.success'));
        router.replace({
          pathname: '/(screens)/profile/inquiries/[id]',
          params: { id: inquiry.id, email: emailToUse },
        });
      } else {
        // Unauthenticated users: show success message and stay on page
        fireToast.success(
          t('profile.inquiries.new.successAnonymous') ||
            'Thank you! We will respond to your inquiry via email.'
        );
        router.back();
      }
    } catch (error) {
      fireToast.error((error as Error)?.message || t('profile.inquiries.new.error'));
    }
  };

  return (
    <SafeAreaView className="safe-area">
      <GoBack title={t('profile.inquiries.new.title')} />
      <View className="flex-1 main-area">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        >
          <View className="gap-5 mt-2">
            {/* Email input for anonymous users only */}
            {!isLoggedIn && (
              <Input
                label={t('profile.inquiries.new.emailLabel')}
                placeholder={t('profile.inquiries.new.emailPlaceholder')}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            )}

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
              numberOfLines={6}
              className="min-h-[140px]"
              textAlignVertical="top"
            />
          </View>
        </ScrollView>

        <View className="pt-4 pb-2">
          <Button onPress={handleSubmit} disabled={isPending} width="full">
            <Text>{t('profile.inquiries.new.submitButton')}</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewInquiryScreen;
