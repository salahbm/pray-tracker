import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

import { AuthWrapper } from '@/providers/session';
import { useThemeStore } from '@/store/defaults/theme';

const ProfilePage = () => {
  const { colors } = useThemeStore();
  const { t } = useTranslation();

  const handleLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Error opening link:', err),
    );
  };

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="mb-5">
        <Text className="text-xl font-bold text-muted-foreground">
          {t('Profile.Title')}
        </Text>
      </View>
      <AuthWrapper mode="signedIn">
        {/* Account*/}
        <TouchableOpacity
          className="profile-section"
          onPress={() => router.push('/(screens)/profile/account')}
        >
          <View className="flex-row items-center">
            <Feather
              name="user"
              size={20}
              color={colors['--muted-foreground']}
            />
            <Text className="text-base text-muted-foreground ml-2">
              {t('Profile.Navigation.Account')}
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
          onPress={() => router.push('/(screens)/profile/edit-profile')}
        >
          <View className="flex-row items-center">
            <Feather
              name="edit"
              size={20}
              color={colors['--muted-foreground']}
            />
            <Text className="text-base text-muted-foreground ml-2">
              {t('Profile.Navigation.EditProfile')}
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
          onPress={() => router.push('/(screens)/profile/edit-pwd')}
        >
          <View className="flex-row items-center">
            <Feather
              name="lock"
              size={20}
              color={colors['--muted-foreground']}
            />
            <Text className="text-base text-muted-foreground ml-2">
              {t('Profile.Navigation.EditPassword')}
            </Text>
          </View>
          <Feather
            name="chevron-right"
            size={20}
            color={colors['--muted-foreground']}
          />
        </TouchableOpacity>
      </AuthWrapper>

      {/* Settings Section */}
      <TouchableOpacity
        className="profile-section"
        onPress={() => router.push('/(screens)/profile/settings')}
      >
        <View className="flex-row items-center">
          <Feather
            name="settings"
            size={20}
            color={colors['--muted-foreground']}
          />
          <Text className="text-base text-muted-foreground ml-2">
            {t('Profile.Navigation.Settings')}
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
      <TouchableOpacity
        className="profile-section"
        onPress={() => router.push('/(screens)/profile/privacy')}
      >
        <View className="flex-row items-center">
          <Feather name="lock" size={20} color={colors['--muted-foreground']} />
          <Text className="text-base text-muted-foreground ml-2">
            {t('Profile.Navigation.PrivacySecurity')}
          </Text>
        </View>
        <Feather
          name="chevron-right"
          size={20}
          color={colors['--muted-foreground']}
        />
      </TouchableOpacity>

      {/* Terms & Conditions Section */}
      <TouchableOpacity
        className="profile-section"
        onPress={() => router.push('/(screens)/profile/terms')}
      >
        <View className="flex-row items-center">
          <Feather
            name="file-text"
            size={20}
            color={colors['--muted-foreground']}
          />
          <Text className="text-base text-muted-foreground ml-2">
            {t('Profile.Navigation.TermsConditions')}
          </Text>
        </View>
        <Feather
          name="chevron-right"
          size={20}
          color={colors['--muted-foreground']}
        />
      </TouchableOpacity>
      {/* Feedback Section */}
      <TouchableOpacity
        className="profile-section"
        onPress={() =>
          handleLink(
            'https://docs.google.com/forms/d/1dbjL6wQoh2MwQQChIGiWpSEOaFmWvCaC9w3iDaBZmjE/edit',
          )
        }
      >
        <View className="flex-row items-center">
          <Feather
            name="message-square"
            size={20}
            color={colors['--muted-foreground']}
          />
          <Text className="text-base text-muted-foreground ml-2">
            {t('Profile.Navigation.Feedback')}
          </Text>
        </View>
        <Feather
          name="chevron-right"
          size={20}
          color={colors['--muted-foreground']}
        />
      </TouchableOpacity>
      {/* About Section */}
      <TouchableOpacity
        className="profile-section"
        onPress={() => router.push('/(screens)/profile/about')}
      >
        <View className="flex-row items-center">
          <Feather name="info" size={20} color={colors['--muted-foreground']} />
          <Text className="text-base text-muted-foreground ml-2">
            {t('Profile.Navigation.About')}
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
