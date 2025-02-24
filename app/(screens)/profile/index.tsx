import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

import { AuthWrapper } from '@/providers/session';
import { useThemeStore } from '@/store/defaults/theme';

interface Props {
  onNavigate: () => void;
}

const ProfilePage = ({ onNavigate }: Props) => {
  const { colors } = useThemeStore();

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="mb-5">
        <Text className="text-xl font-bold text-muted-foreground">Profile</Text>
      </View>
      <AuthWrapper mode="signedIn">
        {/* Account*/}
        <TouchableOpacity
          className="profile-section"
          onPress={() => {
            onNavigate();
            router.push('/(screens)/profile/account');
          }}
        >
          <View className="flex-row items-center">
            <Feather
              name="user"
              size={20}
              color={colors['--muted-foreground']}
            />
            <Text className="text-base text-muted-foreground ml-2">
              Account
            </Text>
          </View>
          <Feather
            name="chevron-right"
            size={20}
            color={colors['--muted-foreground']}
          />
        </TouchableOpacity>
        {/* Edit Profile Section */}
        <TouchableOpacity
          className="profile-section"
          onPress={() => {
            onNavigate();
            router.push('/(screens)/profile/edit-profile');
          }}
        >
          <View className="flex-row items-center">
            <Feather
              name="edit"
              size={20}
              color={colors['--muted-foreground']}
            />
            <Text className="text-base text-muted-foreground ml-2">
              Edit Profile
            </Text>
          </View>
          <Feather
            name="chevron-right"
            size={20}
            color={colors['--muted-foreground']}
          />
        </TouchableOpacity>
        {/* Edit Password Section */}
        <TouchableOpacity
          className="profile-section"
          onPress={() => {
            onNavigate();
            router.push('/(screens)/profile/edit-pwd');
          }}
        >
          <View className="flex-row items-center">
            <Feather
              name="lock"
              size={20}
              color={colors['--muted-foreground']}
            />
            <Text className="text-base text-muted-foreground ml-2">
              Edit Password
            </Text>
          </View>
          <Feather
            name="chevron-right"
            size={20}
            color={colors['--muted-foreground']}
          />
        </TouchableOpacity>
      </AuthWrapper>

      {/* Notifications Section */}
      <TouchableOpacity
        className="profile-section"
        onPress={() => {
          onNavigate();
          router.push('/(screens)/profile/settings');
        }}
      >
        <View className="flex-row items-center">
          <Feather
            name="settings"
            size={20}
            color={colors['--muted-foreground']}
          />
          <Text className="text-base text-muted-foreground ml-2">Settings</Text>
        </View>
        <Feather
          name="chevron-right"
          size={20}
          color={colors['--muted-foreground']}
        />
      </TouchableOpacity>

      {/* Divider */}
      <View className="h-px bg-border my-4" />

      {/* Privacy & Security Section */}
      <TouchableOpacity className="profile-section">
        <View className="flex-row items-center">
          <Feather name="lock" size={20} color={colors['--muted-foreground']} />
          <Text className="text-base text-muted-foreground ml-2">
            Privacy & Security
          </Text>
        </View>
        <Feather
          name="chevron-right"
          size={20}
          color={colors['--muted-foreground']}
        />
      </TouchableOpacity>

      {/* Terms & Conditions Section */}
      <TouchableOpacity className="profile-section">
        <View className="flex-row items-center">
          <Feather
            name="file-text"
            size={20}
            color={colors['--muted-foreground']}
          />
          <Text className="text-base text-muted-foreground ml-2">
            Terms & Conditions
          </Text>
        </View>
        <Feather
          name="chevron-right"
          size={20}
          color={colors['--muted-foreground']}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePage;
