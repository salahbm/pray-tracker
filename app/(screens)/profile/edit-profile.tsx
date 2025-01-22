import { useUser } from '@clerk/clerk-expo';
import { Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { COLORS } from '@/constants/Colors';
import { FRIENDS } from '@/constants/images';
import { useUpdateUser } from '@/hooks/auth/usePutUser';
import { fireToast } from '@/providers/toaster';

const EditProfile = () => {
  const { user } = useUser();

  const { mutateAsync: updateUser, isPending: isLoading } = useUpdateUser();
  const [username, setUserName] = useState<string>(user?.username || '');
  const [firstName, setFirstName] = useState<string>(user?.firstName || '');
  const [lastName, setLastName] = useState<string>(user?.lastName || '');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [image, setImage] = useState<string>(user?.imageUrl || '');
  const [imageBase64, setImageBase64] = useState(null);

  const onUpdatePress = async () => {
    try {
      // Update first and last name if they have changed
      if (
        firstName !== user?.firstName ||
        lastName !== user?.lastName ||
        username !== user?.username
      ) {
        await user?.update({
          username,
          firstName,
          lastName,
        });
      }

      // Update password if provided
      if (currentPassword && newPassword) {
        await user?.updatePassword({
          currentPassword,
          newPassword,
        });
      }

      // Update profile image if a new image is selected
      if (imageBase64 && imageBase64 !== user?.imageUrl) {
        const { base64, mimeType } = imageBase64;

        // Construct the data URI with the correct MIME type
        const base64WithPrefix = `data:image/${mimeType};base64,${base64}`;

        // Send the base64 string to the API
        await user?.setProfileImage({ file: base64WithPrefix });

        // Clear the imageBase64 state
        setImageBase64(null);
        setImage(user.imageUrl);
      }

      await user?.reload();

      const payload = {
        id: user?.id,
        username: user?.username,
        firstName: user?.firstName,
        lastName: user?.lastName,
        photo: user?.imageUrl,
      };

      await updateUser(payload);
    } catch (error) {
      fireToast.error(error.message);
    }
  };

  const onPickImage = async () => {
    try {
      // Request permission to access media library
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.status !== 'granted') {
        fireToast.error('Permission to access media library is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.5, // Adjust as needed
        base64: true, // Enable base64 encoding
      });

      if (!result.canceled && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        if (selectedImage.base64 && selectedImage.type) {
          // Optionally, store the MIME type if needed
          setImageBase64({
            base64: selectedImage.base64,
            type: selectedImage.type,
          });
          setImage(selectedImage.uri);
        } else {
          fireToast.error(
            'Failed to retrieve base64 data from the selected image.',
          );
        }
      }
    } catch (e) {
      fireToast.error('Failed: ' + e);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <GoBack title="Edit Profile" />
      <ScrollView className="main-area pb-10" automaticallyAdjustKeyboardInsets>
        <View className="h-[240px] items-center justify-center space-y-3">
          <View className="relative">
            <Image
              source={{
                uri: image || FRIENDS.guest,
              }}
              accessibilityLabel="Profile Photo" // Replaced 'alt' with 'accessibilityLabel'
              className="w-[150px] h-[150px] rounded-full"
            />
            <TouchableOpacity
              onPress={onPickImage} // Corrected function reference
              className="absolute p-1 rounded-full right-5 bottom-3 bg-light-orange"
            >
              <Feather name="edit-3" size={24} color={COLORS.dark.primary} />
              {/* Added color for better visibility */}
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex gap-4">
          {/* User Name Field */}
          <View className="gap-1">
            <Text>User Name</Text>
            <Input
              placeholder="Your User Name"
              className="px-3 py-2 border rounded-xl"
              value={username}
              onChangeText={setUserName}
              autoCapitalize="words"
            />
          </View>
          {/* First Name Field */}
          <View className="gap-1">
            <Text>First Name</Text>
            <Input
              placeholder="Your First Name"
              className="px-3 py-2 border rounded-xl"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
          </View>
          {/* Last Name Field */}
          <View className="gap-1">
            <Text>Last Name</Text>
            <Input
              placeholder="Your Last Name"
              className="px-3 py-2 border rounded-xl"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />
          </View>
          {/* Current Password Field */}
          <View className="gap-1">
            <Text>Current Password</Text>
            <Input
              placeholder="Your Current Password"
              className="px-3 py-2 border rounded-xl"
              autoCapitalize="none"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
          </View>
          {/* New Password Field */}
          <View className="gap-1">
            <Text>New Password</Text>
            <Input
              placeholder="Your New Password"
              className="px-3 py-2 border rounded-xl"
              autoCapitalize="none"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>
        </View>
      </ScrollView>
      {/* Update Button */}

      <View className="bg-background px-5 py-4">
        <Button onPress={onUpdatePress} disabled={isLoading}>
          <Text>{isLoading ? 'Updating...' : 'Update'}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
