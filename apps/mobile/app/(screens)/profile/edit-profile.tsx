import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import Image from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { useUploadImage } from '@/hooks/user/useAvatar';
import { usePutUser } from '@/hooks/user/usePutUser';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { Pencil } from '@/components/shared/icons';

const EditProfile = () => {
  const { user, setUser } = useAuthStore();

  const { t } = useTranslation();
  const { mutateAsync: updateUser, isPending } = usePutUser();
  const { mutateAsync: uploadImage, isPending: imageUploading } = useUploadImage();

  const [username, setUserName] = useState<string>(user?.name || '');
  const [image, setImage] = useState<string>(user?.image ?? '');

  const onPickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== 'granted') {
      fireToast.error(t('profile.editProfile.errorPermission'));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ['images'],
      allowsMultipleSelection: false,
      exif: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      const fileExt = selectedImage.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg';
      const oldPath = user?.image;

      try {
        const data = await uploadImage({
          imageUri: selectedImage.uri,
          fileExt,
          userId: user?.id!,
          oldPath,
        });

        if (data?.user) {
          setUser(data.user);
        }

        setImage(data?.user?.image);
      } catch (e) {
        fireToast.error((e as Error)?.message || 'Failed to upload.');
      }
    }
  };

  const handleUpdate = async () => {
    if (!user) return;

    try {
      const trimmedName = username.trim();
      if (!trimmedName) {
        const errorMessage = t('profile.editProfile.errors.usernameRequired');
        fireToast.error(errorMessage);
        return;
      }

      // Only include fields that have changed
      const updateData: { id: string; name?: string; image?: string } = {
        id: user.id,
      };

      // Only update name if it changed
      if (trimmedName !== user.name) {
        updateData.name = trimmedName;
      }

      // Only update image if it changed
      if (image !== user.image) {
        updateData.image = image;
      }

      const updatedUser = await updateUser(updateData);

      if (updatedUser) {
        setUser(updatedUser);
        setUserName(updatedUser.name);
        fireToast.success(t('profile.editProfile.success'));
      }
    } catch (e) {
      fireToast.error((e as Error)?.message);
    }
  };
  return (
    <SafeAreaView className="safe-area">
      <GoBack title={t('profile.editProfile.title')} />
      <View className="main-area">
        <View className="h-[220px] mb-10 items-center justify-center gap-3">
          <View className="relative">
            <Image source={image} className="size-[150px]" />

            <TouchableOpacity
              onPress={onPickImage}
              disabled={imageUploading}
              className="absolute p-1 rounded-full right-0 bottom-1"
            >
              {imageUploading ? (
                <ActivityIndicator size="small" />
              ) : (
                <View className="rounded-full bg-primary/10 p-2 border border-primary/20">
                  <Pencil className="size-5 text-primary" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex gap-6 pb-12 border-t border-border pt-10">
          <Input
            label={t('auth.username.label')}
            placeholder={t('auth.username.placeholder')}
            value={username}
            onChangeText={value => {
              setUserName(value);
            }}
            autoCapitalize="words"
            keyboardType="default"
            returnKeyType="done"
            onSubmitEditing={handleUpdate}
            editable={!isPending}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
