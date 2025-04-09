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
import { useUploadImage } from '@/hooks/auth/useAvatart';
import { usePutUser } from '@/hooks/auth/usePutUser';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';

const EditProfile = () => {
  const { user, setUser } = useAuthStore();
  const { colors } = useThemeStore();
  const { t } = useTranslation();
  const { mutateAsync: updateUser, isPending: isLoading } = usePutUser();
  const { mutateAsync: uploadImage, isPending: imageUploading } =
    useUploadImage();

  const [username, setUserName] = useState<string>(user?.username || '');
  const [firstName, setFirstName] = useState<string>(user?.firstName || '');
  const [lastName, setLastName] = useState<string>(user?.lastName || '');
  const [image, setImage] = useState<string>(user?.photo || '');

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
        const fileExt = selectedImage.uri.split('.').pop() || 'jpeg';
        const oldPath = user?.photo?.split('/').pop();

        const uploadedUrl = await uploadImage({
          imageUri: selectedImage.uri,
          fileExt,
          userId: user?.id,
          oldPath,
        });
        setImage(uploadedUrl); // update state with uploaded image URL
      }
    } catch (e) {
      fireToast.error(e.message);
    }
  };

  const handleUpdate = async () => {
    try {
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
            ) : image ? (
              <Image
                source={{
                  uri: image,
                }}
                accessibilityLabel="Profile Photo"
                className="w-[150px] h-[150px] rounded-full border border-border max-w-[150px] max-h-[150px]"
              />
            ) : (
              <Image
                source={{
                  uri: FRIENDS.guest,
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
