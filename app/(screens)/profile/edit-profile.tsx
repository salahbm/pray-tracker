import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { usePutUser } from '@/hooks/auth/usePutUser';
import { supabase } from '@/lib/supabase';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';
import { ApiError } from '@/utils/error';
import { MessageCodes, StatusCode } from '@/utils/status';

const EditProfile = () => {
  const { user, setUser } = useAuthStore();
  const { colors } = useThemeStore();
  const { t } = useTranslation();
  const { mutateAsync: updateUser, isPending: isLoading } = usePutUser();

  const [username, setUserName] = useState<string>(user?.username || '');
  const [firstName, setFirstName] = useState<string>(user?.firstName || '');
  const [lastName, setLastName] = useState<string>(user?.lastName || '');
  const [image, setImage] = useState<string>(user?.photo || '');
  const [imageUploading, setImageUploading] = useState<boolean>(false);

  const onPickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.status !== 'granted') {
        fireToast.error('Permission required to access media.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.5,
      });

      if (!result.canceled && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        await uploadImageToSupabase(selectedImage.uri);
      }
    } catch (e) {
      fireToast.error(e.message);
    }
  };
  const uploadImageToSupabase = async (imageUri: string) => {
    try {
      setImageUploading(true);

      const response = await fetch(imageUri);
      const arrayBuffer = await response.arrayBuffer();
      const fileExt = imageUri.split('.').pop()?.toLowerCase() ?? 'jpeg';

      const fileName = `${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from('avatars')
        .upload(fileName, arrayBuffer, {
          contentType: `image/${fileExt}`,
          upsert: true,
        });

      if (error) throw error;

      // Fetch new public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);

      // Immediately update local image state
      setImage(data.publicUrl.replace(/([^:]\/)\/+/g, '$1'));
    } catch (error) {
      fireToast.error(error.message);
    } finally {
      setImageUploading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      // Save the old image path before updating user
      const oldImagePath = user?.photo ? user.photo.split('/').pop() : null;

      // Prepare updated user payload
      const payload = {
        id: user?.id,
        username,
        firstName,
        lastName,
        photo: image, // New uploaded image
      };

      // Update user in DB
      const res = await updateUser(payload);

      if (res) {
        setUser(res.data);

        // DELETE OLD IMAGE **AFTER** SUCCESSFUL UPDATE
        if (oldImagePath) {
          const { error } = await supabase.storage
            .from('avatars')
            .remove([oldImagePath]);

          if (error) {
            throw new ApiError({
              message: error.message,
              status: StatusCode.INTERNAL_ERROR,
              code: MessageCodes.SOMETHING_WENT_WRONG,
              details: null,
            });
          }
        }
      }
    } catch (error) {
      fireToast.error(error.message);
    }
  };

  return (
    <SafeAreaView className="safe-area">
      <View className="main-area">
        <GoBack title={t('Profile.EditProfile.Title')} />
        <View className="h-[220px] mb-10 items-center justify-center gap-3">
          <View className="relative">
            {imageUploading ? (
              <View className="w-[150px] h-[150px] rounded-full border border-border bg-primary opacity-80 animate-pulse" />
            ) : (
              <Image
                source={{
                  uri: image ? image : FRIENDS.guest,
                }}
                accessibilityLabel="Profile Photo"
                className="w-[150px] h-[150px] rounded-full border border-border max-w-[150px] max-h-[150px]"
              />
            )}
            <TouchableOpacity
              onPress={onPickImage}
              disabled={imageUploading}
              className="absolute p-1 rounded-full right-2 bottom-3"
            >
              {imageUploading ? (
                <ActivityIndicator size="small" color={colors['--primary']} />
              ) : (
                <Feather name="edit-3" size={24} color={colors['--primary']} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex gap-6 pb-12">
          <Input
            label={t('Profile.EditProfile.Fields.Username.Label')}
            placeholder={t('Profile.EditProfile.Fields.Username.Placeholder')}
            value={username}
            onChangeText={setUserName}
            autoCapitalize="words"
          />
          <Input
            label={t('Profile.EditProfile.Fields.FirstName.Label')}
            placeholder={t('Profile.EditProfile.Fields.FirstName.Placeholder')}
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
          <Input
            label={t('Profile.EditProfile.Fields.LastName.Label')}
            placeholder={t('Profile.EditProfile.Fields.LastName.Placeholder')}
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
        </View>
      </View>
      <View className="bg-background px-5 py-4">
        <Button onPress={handleUpdate} disabled={isLoading || imageUploading}>
          <Text>{t('Profile.EditProfile.SaveButton')}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
