import { useUser } from '@clerk/clerk-expo';
import { Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProfile = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState<string>(user?.firstName || '');
  const [lastName, setLastName] = useState<string>(user?.lastName || '');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [image, setImage] = useState<string>(user?.imageUrl || '');
  const [loading, setLoading] = useState<boolean>(false);

  const onUpdatePress = async () => {
    setLoading(true);

    try {
      // Update first and last name if they have changed
      if (firstName.trim() && lastName.trim()) {
        await user?.update({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
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
      if (image && image !== user?.imageUrl) {
        const base64 = await FileSystem.readAsStringAsync(image, {
          encoding: 'base64',
        });
        await user?.setProfileImage({ file: base64 });
      }

      await user?.reload();
      Alert.alert('Success', 'Profile updated successfully.');
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.errors
          ? error.errors[0].message
          : 'An unexpected error occurred.',
      );
    } finally {
      setLoading(false);
    }
  };

  const onPickImage = async () => {
    try {
      // Request permission to access media library
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Permission to access media library is required!',
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.5, // Increased quality for better image resolution
        base64: false, // We'll handle base64 conversion separately
      });

      if (!result.canceled && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        if (selectedImage.uri) {
          setImage(selectedImage.uri);
        }
      }
    } catch (err: any) {
      Alert.alert('Error', 'Failed to pick the image.');
    }
  };

  return (
    <ScrollView className="flex-1">
      <SafeAreaView className="flex-1 pb-3">
        <View className="h-[240px] items-center justify-center space-y-3">
          <View className="relative">
            <Image
              source={{
                uri: image || 'https://via.placeholder.com/150', // Fallback image
              }}
              style={{ borderRadius: 100, width: 208, height: 176 }} // Adjusted to match Tailwind classes
              accessibilityLabel="Profile Photo" // Replaced 'alt' with 'accessibilityLabel'
            />
            <TouchableOpacity
              onPress={onPickImage} // Corrected function reference
              className="absolute p-1 rounded-full right-5 bottom-3 bg-light-orange"
            >
              <Feather name="edit-3" size={20} color="#fff" />{' '}
              {/* Added color for better visibility */}
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-4 space-y-3">
          {/* First Name Field */}
          <View className="gap-1">
            <Text>First Name</Text>
            <TextInput
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
            <TextInput
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
            <TextInput
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
            <TextInput
              placeholder="Your New Password"
              className="px-3 py-2 border rounded-xl"
              autoCapitalize="none"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>
          {/* Update Button */}
          <View className="gap-1">
            <TouchableOpacity
              onPress={onUpdatePress}
              className="py-4 bg-main-orange rounded-xl"
              disabled={loading} // Disable button while loading
            >
              <Text className="text-base text-center text-off-white">
                {loading ? 'Updating...' : 'Update'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default EditProfile;
