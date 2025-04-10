import { User } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';

import { Button } from '../ui/button';
import { Text } from '../ui/text';
import { IMAGES } from '@/constants/images';
import { userKeys } from '@/constants/query-keys';
import { performOAuth } from '@/hooks/auth/useOAuth';
import { useGetUser } from '@/hooks/user/useGetUser';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { MessageCodes } from '@/utils/status';

const OAuth = ({ onSuccess }: { onSuccess: () => void }) => {
  const { t } = useTranslation();
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();
  const [data, setData] = useState<User | null>(null);
  const { data: userData, refetch, isFetching } = useGetUser(data?.id);
  const hasUpdatedSession = useRef(false); // Prevent multiple updates
  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    const newData = await performOAuth();

    if (newData && newData.id !== data?.id) {
      // Only update if newData is different
      setData(newData);
    }
  };

  useEffect(() => {
    if (data) {
      refetch(); // Fetch user data after login
    }
  }, [data, refetch]);

  useEffect(() => {
    if (!data || hasUpdatedSession.current || isFetching) return;

    (async () => {
      hasUpdatedSession.current = true; // Mark as updated to prevent looping

      setUser(userData);

      queryClient.invalidateQueries(userKeys);

      onSuccess();
      fireToast.success(
        t(`Responses.MessageCodes.${MessageCodes.SIGN_IN_SUCCESSFULLY}`),
      );
    })();
  }, [data, setUser, queryClient, onSuccess, t, userData, isFetching]);

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-border" />
        <Text className="text-lg my-4">Or</Text>
        <View className="flex-1 h-[1px] bg-border" />
      </View>

      <Button
        onPress={handleGoogleSignIn}
        variant="outline"
        className="flex-row justify-center items-center gap-2 bg-popover"
      >
        <Image
          source={IMAGES.google}
          className="size-5 mx-2 max-w-5 max-h-5 object-contain"
        />
        <Text>Continue with Google</Text>
      </Button>
    </View>
  );
};

export default OAuth;
