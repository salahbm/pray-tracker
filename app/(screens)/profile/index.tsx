import { useAuth } from '@clerk/clerk-expo';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

import { LogOut } from '@/components/shared/icons';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/store/defaults/theme';

interface Props {
  onNavigate: () => void;
}

const ProfilePage = ({ onNavigate }: Props) => {
  const { signOut } = useAuth();
  const { colors } = useThemeStore();

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="mb-5">
        <Text className="text-xl font-bold text-muted-foreground">Profile</Text>
      </View>

      <View className="flex-1">
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
              name="user"
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
            <Text className="text-base text-muted-foreground ml-2">
              Settings
            </Text>
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
            <Feather
              name="lock"
              size={20}
              color={colors['--muted-foreground']}
            />
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

        {/* Divider */}
        <View className="h-px bg-border mb-32" />
      </View>

      <Button
        className="flex-row gap-4"
        variant="destructive"
        onPress={async () => {
          await signOut();
          onNavigate();
        }}
      >
        <Text className="text-destructive font-bold">Logout</Text>
        <LogOut className="stroke-destructive" />
      </Button>
    </View>
  );
};

export default ProfilePage;
