import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
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

const EditProfile = () => {
  const { user, setUser } = useAuthStore();
  const { colors } = useThemeStore();
  const { mutateAsync: updateUser, isPending: isLoading } = useUpdateUser();

  const [username, setUserName] = useState<string>(user?.username || '');
  const [firstName, setFirstName] = useState<string>(user?.firstName || '');
  const [lastName, setLastName] = useState<string>(user?.lastName || '');
  const [image, setImage] = useState<string>(user?.photo || '');
  const [imageUploading, setImageUploading] = useState<boolean>(false);

  const uploadImageToSupabase = async (imageUri: string) => {
    try {
      setImageUploading(true);

      // UPLOAD NEW IMAGE TO SUPABASE
      const response = await fetch(imageUri);
      const arrayBuffer = await response.arrayBuffer();

      const fileExt = imageUri.split('.').pop()?.toLowerCase() ?? 'jpeg';
      const filePath = `avatars/${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from('avatars')
        .upload(filePath, arrayBuffer, {
          contentType: `image/${fileExt}`,
          upsert: true,
        });

      if (error) throw error;

      // // Get public URL of new image
      // const { data: publicUrlData } = supabase.storage
      //   .from('avatars')
      //   .getPublicUrl(filePath);

      // // Set new image URL
      // setImage(publicUrlData.publicUrl);
    } catch (error) {
      fireToast.error(error.message);
    } finally {
      setImageUploading(false);
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
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.5,
      });

      if (!result.canceled && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setImage(selectedImage.uri);
        await uploadImageToSupabase(selectedImage.uri);
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

        // ✅ DELETE OLD IMAGE **AFTER** SUCCESSFUL UPDATE
        if (user?.photo) {
          const { error } = await supabase.storage
            .from('avatars')
            .remove([user.photo]);

          if (error) throw error;
        }
      }
    } catch (error) {
      fireToast.error(error.message);
    }
  };

  return (
    <SafeAreaView className="safe-area">
      <View className="main-area">
        <GoBack title="Edit Profile" />
        <View className="h-[220px] mb-10 items-center justify-center gap-3">
          <View className="relative">
            <Image
              source={{ uri: image || FRIENDS.guest }}
              accessibilityLabel="Profile Photo"
              className="w-[150px] h-[150px] rounded-full border border-border"
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
        <View className="flex gap-6 pb-12">
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
        </View>
      </View>
      <View className="bg-background px-5 py-4">
        <Button onPress={handleUpdate} disabled={isLoading || imageUploading}>
          <Text>{isLoading ? 'Updating...' : 'Update'}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
