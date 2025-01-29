import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { useUpdateUser } from '@/hooks/auth/usePutUser';
import { supabase } from '@/lib/supabase';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';
import { hashPassword } from '@/utils/helpers';

const EditProfile = () => {
  const { user, setUser } = useAuthStore();
  const { colors } = useThemeStore();
  const { mutateAsync: updateUser, isPending: isLoading } = useUpdateUser();

  const [username, setUserName] = useState<string>(user?.username || '');
  const [firstName, setFirstName] = useState<string>(user?.firstName || '');
  const [lastName, setLastName] = useState<string>(user?.lastName || '');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [image, setImage] = useState<string>(user?.photo || '');
  const [imageUploading, setImageUploading] = useState<boolean>(false);

  const validatePasswords = () => {
    if (newPassword && newPassword.length < 6) {
      fireToast.error('Password must be at least 6 characters.');
      return false;
    }
    if (newPassword && newPassword !== confirmPassword) {
      fireToast.error('Passwords do not match.');
      return false;
    }
    return true;
  };

  const uploadImageToSupabase = async (imageUri: string) => {
    try {
      setImageUploading(true);

      const response = await fetch(imageUri);
      const blob = await response.blob();

      const fileExt = imageUri.split('.').pop();
      const filePath = `${user?.id}.${fileExt}`;

      const { error } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob, { upsert: true });

      if (error) throw error;

      const { data: publicUrl } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setImage(publicUrl.publicUrl);
      fireToast.success('Image uploaded successfully!');
    } catch (error) {
      fireToast.error(error.message);
    } finally {
      setImageUploading(false);
    }
  };

  const onUpdatePress = async () => {
    try {
      if (!validatePasswords()) return;

      if (currentPassword && newPassword) {
        const hashedPassword: string = await hashPassword(currentPassword);
        if (hashedPassword !== user?.password) {
          await supabase.auth?.updateUser({ password: newPassword });
        }
      }

      const payload = {
        id: user?.id,
        username,
        firstName,
        lastName,
        photo: image,
      };

      await updateUser(payload).then((res) => {
        if (res) {
          setUser(res.data);
        }
      });
    } catch (error) {
      fireToast.error(error.message);
    }
  };

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
        setImage(selectedImage.uri);
        uploadImageToSupabase(selectedImage.uri);
      }
    } catch (e) {
      fireToast.error(e.message);
    }
  };

  return (
    <SafeAreaView className="safe-area">
      <GoBack title="Edit Profile" />
      <ScrollView
        className="main-area"
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
      >
        <View className="h-[240px] items-center justify-center space-y-3">
          <View className="relative">
            <Image
              source={{ uri: image || FRIENDS.guest }}
              accessibilityLabel="Profile Photo"
              className="w-[150px] h-[150px] rounded-full border border-border"
            />
            <TouchableOpacity
              onPress={onPickImage}
              className="absolute p-1 rounded-full right-2 bottom-3"
            >
              <Feather name="edit-3" size={24} color={colors['--primary']} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex gap-4 pb-12">
          <Input
            label="User Name"
            placeholder="Your User Name"
            value={username}
            onChangeText={setUserName}
            autoCapitalize="words"
          />
          <Input
            label="First Name"
            placeholder="Your First Name"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
          <Input
            label="Last Name"
            placeholder="Your Last Name"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
          <View className="border-b border-border my-8" />
          <Input
            label="Current Password"
            placeholder="Your Current Password"
            autoCapitalize="none"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <Input
            label="New Password"
            placeholder="Your New Password"
            autoCapitalize="none"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Input
            label="Confirm Password"
            placeholder="Confirm Password"
            autoCapitalize="none"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </ScrollView>
      <View className="bg-background px-5 py-4">
        <Button onPress={onUpdatePress} disabled={isLoading || imageUploading}>
          <Text>{isLoading || imageUploading ? 'Updating...' : 'Update'}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
