import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { useUploadImage } from '@/hooks/user/useAvatart';
import { usePutUser } from '@/hooks/user/usePutUser';
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
  const [image, setImage] = useState<string>(user?.photo);
  console.log(' image:', image);
  const [isFieldUpdated, setIsFieldUpdated] = useState<boolean>(false);

  const usernameRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const onPickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== 'granted') {
      fireToast.error('Permission required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      exif: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      const fileExt =
        selectedImage.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg';
      const oldPath = user?.photo?.split('/').pop();

      try {
        const data = await uploadImage({
          imageUri: selectedImage.uri,
          fileExt,
          userId: user.id,
          oldPath,
        });

        setImage(data?.photo);
        setIsFieldUpdated(true);
      } catch (uploadError) {
        fireToast.error(uploadError.message || 'Failed to upload.');
      }
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
      <ScrollView
        className="main-area"
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
      >
        <GoBack title={t('Profile.EditProfile.Title')} />
        <View className="h-[220px] mb-10 items-center justify-center gap-3">
          <View className="relative">
            {image ? (
              <Image
                source={{
                  uri: image,
                }}
                accessibilityLabel="Profile Photo"
                className="w-[150px] h-[150px] rounded-full border border-border max-w-[150px] max-h-[150px]"
              />
            ) : (
              <Image
                source={FRIENDS.guest}
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
            onFocus={() => setIsFieldUpdated(true)}
            autoCapitalize="words"
            keyboardType="default"
            returnKeyType="next"
            onSubmitEditing={() => firstNameRef.current?.focus()}
            ref={usernameRef}
          />
          <Input
            label={t('Profile.EditProfile.Fields.FirstName.Label')}
            placeholder={t('Profile.EditProfile.Fields.FirstName.Placeholder')}
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            keyboardType="default"
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current?.focus()}
            ref={firstNameRef}
            onFocus={() => setIsFieldUpdated(true)}
          />
          <Input
            ref={lastNameRef}
            label={t('Profile.EditProfile.Fields.LastName.Label')}
            placeholder={t('Profile.EditProfile.Fields.LastName.Placeholder')}
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            keyboardType="default"
            returnKeyType="done"
            onSubmitEditing={() => handleUpdate()}
            onFocus={() => setIsFieldUpdated(true)}
          />
        </View>
      </ScrollView>
      <View className="bg-background px-5 py-4">
        <Button
          onPress={handleUpdate}
          disabled={isLoading || imageUploading || !isFieldUpdated}
        >
          <Text>{t('Profile.EditProfile.SaveButton')}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
