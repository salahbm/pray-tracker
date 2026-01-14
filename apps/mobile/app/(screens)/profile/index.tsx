import { Feather } from '@expo/vector-icons';
import { RelativePathString, router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import { AuthWrapper } from '@/providers/session';
import { useThemeStore } from '@/store/defaults/theme';

const ProfilePage = () => {
  const { t } = useTranslation();

  const handleNavigate = (screen: string) => {
    router.push(screen as RelativePathString);
  };

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="mb-5">
        <Text className="text-xl font-bold text-muted-foreground">{t('profile.title')}</Text>
      </View>
      <AuthWrapper mode="signedIn">
        {/* Account*/}
        <TouchableOpacity
          className="profile-section"
          onPress={() => handleNavigate('/(screens)/profile/account')}
        >
          <View className="flex-row items-center">
            <Feather name="user" size={20} />
            <Text className="text-base text-muted-foreground ml-2">
              {t('profile.navigation.account')}
            </Text>
          </View>
          <Feather name="chevron-right" size={20} />
        </TouchableOpacity>
        {/* Edit Profile Section */}
        <TouchableOpacity
          className="profile-section"
          onPress={() => handleNavigate('/(screens)/profile/edit-profile')}
        >
          <View className="flex-row items-center">
            <Feather name="edit" size={20} />
            <Text className="text-base text-muted-foreground ml-2">
              {t('profile.navigation.editProfile')}
            </Text>
          </View>
          <Feather name="chevron-right" size={20} />
        </TouchableOpacity>
        {/* Edit Password Section */}
        <TouchableOpacity
          className="profile-section"
          onPress={() => handleNavigate('/(screens)/profile/edit-pwd')}
        >
          <View className="flex-row items-center">
            <Feather name="lock" size={20} />
            <Text className="text-base text-muted-foreground ml-2">
              {t('profile.navigation.editPassword')}
            </Text>
          </View>
          <Feather name="chevron-right" size={20} />
        </TouchableOpacity>
      </AuthWrapper>

      {/* Settings Section */}
      <TouchableOpacity
        className="profile-section"
        onPress={() => handleNavigate('/(screens)/profile/settings')}
      >
        <View className="flex-row items-center">
          <Feather name="settings" size={20} />
          <Text className="text-base text-muted-foreground ml-2">
            {t('profile.navigation.settings')}
          </Text>
        </View>
        <Feather name="chevron-right" size={20} />
      </TouchableOpacity>

      {/* Divider */}
      <View className="h-px bg-border my-4" />

      {/* Privacy & Security Section */}
      <TouchableOpacity
        className="profile-section"
        onPress={() => handleNavigate('/(screens)/profile/privacy')}
      >
        <View className="flex-row items-center">
          <Feather name="lock" size={20} />
          <Text className="text-base text-muted-foreground ml-2">
            {t('profile.navigation.privacySecurity')}
          </Text>
        </View>
        <Feather name="chevron-right" size={20} />
      </TouchableOpacity>

      {/* Terms & Conditions Section */}
      <TouchableOpacity
        className="profile-section"
        onPress={() => handleNavigate('/(screens)/profile/terms')}
      >
        <View className="flex-row items-center">
          <Feather name="file-text" size={20} />
          <Text className="text-base text-muted-foreground ml-2">
            {t('profile.navigation.termsConditions')}
          </Text>
        </View>
        <Feather name="chevron-right" size={20} />
      </TouchableOpacity>
      {/* Feedback Section */}
      <TouchableOpacity
        className="profile-section"
        onPress={() => handleNavigate('/(screens)/profile/inquiries')}
      >
        <View className="flex-row items-center">
          <Feather name="message-square" size={20} />
          <Text className="text-base text-muted-foreground ml-2">
            {t('profile.navigation.feedback')}
          </Text>
        </View>
        <Feather name="chevron-right" size={20} />
      </TouchableOpacity>
      {/* About Section */}
      <TouchableOpacity
        className="profile-section"
        onPress={() => handleNavigate('/(screens)/profile/about')}
      >
        <View className="flex-row items-center">
          <Feather name="info" size={20} />
          <Text className="text-base text-muted-foreground ml-2">
            {t('profile.navigation.about')}
          </Text>
        </View>
        <Feather name="chevron-right" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePage;
