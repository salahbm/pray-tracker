import { RelativePathString, router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  User,
  Edit,
  Lock,
  Settings,
  Shield,
  FileText,
  MessageSquare,
  Info,
  ChevronRight,
} from '@/components/shared/icons';

import { AuthWrapper } from '@/providers/session';
import GoBack from '@/components/shared/go-back';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
  const { t } = useTranslation();

  const handleNavigate = (screen: string) => {
    router.push(screen as RelativePathString);
  };

  return (
    <SafeAreaView className="safe-area">
      <GoBack title={t('profile.title')} titleStyle="text-xl font-bold" />
      <ScrollView showsVerticalScrollIndicator={false} className="main-area pb-20">
        <AuthWrapper mode="signedIn">
          <View className="mt-6">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
              Account
            </Text>

            <View className="bg-card rounded-xl border border-border overflow-hidden">
              <TouchableOpacity
                className="flex-row items-center justify-between px-4 py-4 active:bg-muted/50"
                onPress={() => handleNavigate('/(screens)/profile/account')}
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-9 h-9 rounded-full bg-primary/10 items-center justify-center">
                    <User className="text-primary" size={18} />
                  </View>
                  <Text className="text-base font-medium text-foreground">
                    {t('profile.navigation.account')}
                  </Text>
                </View>
                <ChevronRight className="text-muted-foreground" size={20} />
              </TouchableOpacity>

              <View className="h-px bg-border mx-4" />

              <TouchableOpacity
                className="flex-row items-center justify-between px-4 py-4 active:bg-muted/50"
                onPress={() => handleNavigate('/(screens)/profile/edit-profile')}
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-9 h-9 rounded-full bg-info/10 items-center justify-center">
                    <Edit className="text-info" size={18} />
                  </View>
                  <Text className="text-base font-medium text-foreground">
                    {t('profile.navigation.editProfile')}
                  </Text>
                </View>
                <ChevronRight className="text-muted-foreground" size={20} />
              </TouchableOpacity>

              <View className="h-px bg-border mx-4" />

              <TouchableOpacity
                className="flex-row items-center justify-between px-4 py-4 active:bg-muted/50"
                onPress={() => handleNavigate('/(screens)/profile/edit-pwd')}
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-9 h-9 rounded-full bg-warning/10 items-center justify-center">
                    <Lock className="text-warning" size={18} />
                  </View>
                  <Text className="text-base font-medium text-foreground">
                    {t('profile.navigation.editPassword')}
                  </Text>
                </View>
                <ChevronRight className="text-muted-foreground" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </AuthWrapper>

        <View className="my-6">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Preferences
          </Text>

          <View className="bg-card rounded-xl border border-border overflow-hidden">
            <TouchableOpacity
              className="flex-row items-center justify-between px-4 py-4 active:bg-muted/50"
              onPress={() => handleNavigate('/(screens)/profile/preferences')}
            >
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-full bg-primary/10 items-center justify-center">
                  <Settings className="text-primary" size={18} />
                </View>
                <Text className="text-base font-medium text-foreground">
                  {t('profile.navigation.settings')}
                </Text>
              </View>
              <ChevronRight className="text-muted-foreground" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Support & Legal
          </Text>

          <View className="bg-card rounded-xl border border-border overflow-hidden">
            <TouchableOpacity
              className="flex-row items-center justify-between px-4 py-4 active:bg-muted/50"
              onPress={() => handleNavigate('/(screens)/profile/privacy')}
            >
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-full bg-success/10 items-center justify-center">
                  <Shield className="text-success" size={18} />
                </View>
                <Text className="text-base font-medium text-foreground">
                  {t('profile.navigation.privacySecurity')}
                </Text>
              </View>
              <ChevronRight className="text-muted-foreground" size={20} />
            </TouchableOpacity>

            <View className="h-px bg-border mx-4" />

            <TouchableOpacity
              className="flex-row items-center justify-between px-4 py-4 active:bg-muted/50"
              onPress={() => handleNavigate('/(screens)/profile/terms')}
            >
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-full bg-info/10 items-center justify-center">
                  <FileText className="text-info" size={18} />
                </View>
                <Text className="text-base font-medium text-foreground">
                  {t('profile.navigation.termsConditions')}
                </Text>
              </View>
              <ChevronRight className="text-muted-foreground" size={20} />
            </TouchableOpacity>

            <View className="h-px bg-border mx-4" />

            <TouchableOpacity
              className="flex-row items-center justify-between px-4 py-4 active:bg-muted/50"
              onPress={() => handleNavigate('/(screens)/profile/inquiries')}
            >
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-full bg-primary/10 items-center justify-center">
                  <MessageSquare className="text-primary" size={18} />
                </View>
                <Text className="text-base font-medium text-foreground">
                  {t('profile.navigation.feedback')}
                </Text>
              </View>
              <ChevronRight className="text-muted-foreground" size={20} />
            </TouchableOpacity>

            <View className="h-px bg-border mx-4" />

            <TouchableOpacity
              className="flex-row items-center justify-between px-4 py-4 active:bg-muted/50"
              onPress={() => handleNavigate('/(screens)/profile/about')}
            >
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-full bg-info/10 items-center justify-center">
                  <Info className="text-info" size={18} />
                </View>
                <Text className="text-base font-medium text-foreground">
                  {t('profile.navigation.about')}
                </Text>
              </View>
              <ChevronRight className="text-muted-foreground" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
