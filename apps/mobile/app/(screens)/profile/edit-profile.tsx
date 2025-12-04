import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useUploadImage } from '@/hooks/user/useAvatar';
import { usePutUser } from '@/hooks/user/usePutUser';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';
import Image from '@/components/ui/image';

const EditProfile = () => {
  const { user, setUser } = useAuthStore();
  const { colors } = useThemeStore();
  const { t } = useTranslation();
  const { mutateAsync: updateUser, isPending: isLoading } = usePutUser();
  const { mutateAsync: uploadImage, isPending: imageUploading } = useUploadImage();

  const [username, setUserName] = useState<string>(user?.name || '');
  const [image, setImage] = useState<string>(user?.image ?? '');
  const [isFieldUpdated, setIsFieldUpdated] = useState<boolean>(false);


  const onPickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== 'granted') {
      fireToast.error(t('Profile.EditProfile.ErrorPermission'));
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
        setIsFieldUpdated(true);
      } catch (e) {
        fireToast.error((e as Error)?.message || 'Failed to upload.');
      }
    }
  };

  const handleUpdate = async () => {
    if (!user) return;

    try {
      const updatedUser = await updateUser({
        id: user.id,
        name: username,
        image,
      });

      if (updatedUser) {
        setUser(updatedUser);
        setUserName(updatedUser.name);
        setIsFieldUpdated(false);
        fireToast.success(t('Profile.EditProfile.Success'));
      }
    } catch (e) {
      fireToast.error((e as Error)?.message);
    }
  };
  return (
    <SafeAreaView className="safe-area">
      <View
        className="main-area"
      >
        <GoBack title={t('Profile.EditProfile.Title')} />
        <View className="h-[220px] mb-10 items-center justify-center gap-3">
          <View className="relative">
            <Image
              source={image}
              className='size-[150px]'

            />

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
        <View className="flex gap-6 pb-12 border-t border-border pt-10">
          <Input
            label={t('Profile.EditProfile.Fields.Username.Label')}
            placeholder={t('Profile.EditProfile.Fields.Username.Placeholder')}
            value={username}
            onChangeText={setUserName}
            onFocus={() => setIsFieldUpdated(true)}
            autoCapitalize="words"
            keyboardType="default"
            returnKeyType="done"
            onSubmitEditing={handleUpdate}
          />
        </View>
      </View>
      <View className="bg-background px-5 py-4">
        <Button onPress={handleUpdate} disabled={isLoading || imageUploading || !isFieldUpdated}>
          <Text>{t('Profile.EditProfile.SaveButton')}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
