import { useAuth } from '@clerk/clerk-expo';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { LogOut } from '@/components/shared/icons';
import { Language } from '@/components/shared/language';
import { Button } from '@/components/ui/button';
import { COLORS } from '@/constants/Colors';

interface Props {
  onNavigate: () => void;
}

const ProfilePage = ({ onNavigate }: Props) => {
  const { signOut } = useAuth();
  return (
    <View className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={{ flex: 1 }}>
          {/* Edit Profile Section */}
          <TouchableOpacity
            style={styles.section}
            onPress={() => {
              onNavigate();
              router.push('/(screens)/profile/edit-profile');
            }}
          >
            <View style={styles.row}>
              <Feather
                name="user"
                size={20}
                color={COLORS.dark.muted_foreground}
              />
              <Text style={styles.sectionText}>Edit Profile</Text>
            </View>
            <Feather
              name="chevron-right"
              size={20}
              color={COLORS.dark.muted_foreground}
            />
          </TouchableOpacity>

          {/* Notifications Section */}
          <TouchableOpacity style={styles.section}>
            <View style={styles.row}>
              <Feather
                name="bell"
                size={20}
                color={COLORS.dark.muted_foreground}
              />
              <Text style={styles.sectionText}>Notifications</Text>
            </View>
            <Feather
              name="chevron-right"
              size={20}
              color={COLORS.dark.muted_foreground}
            />
          </TouchableOpacity>

          {/* Language Section */}
          <View style={styles.section}>
            <View style={styles.row}>
              <Feather
                name="globe"
                size={20}
                color={COLORS.dark.muted_foreground}
              />
              <Text style={styles.sectionText}>Languages</Text>
            </View>
            <Language />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Privacy & Security Section */}
          <TouchableOpacity style={styles.section}>
            <View style={styles.row}>
              <Feather
                name="lock"
                size={20}
                color={COLORS.dark.muted_foreground}
              />
              <Text style={styles.sectionText}>Privacy & Security</Text>
            </View>
            <Feather
              name="chevron-right"
              size={20}
              color={COLORS.dark.muted_foreground}
            />
          </TouchableOpacity>

          {/* Terms & Conditions Section */}
          <TouchableOpacity style={styles.section}>
            <View style={styles.row}>
              <Feather
                name="file-text"
                size={20}
                color={COLORS.dark.muted_foreground}
              />
              <Text style={styles.sectionText}>Terms & Conditions</Text>
            </View>
            <Feather
              name="chevron-right"
              size={20}
              color={COLORS.dark.muted_foreground}
            />
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider} />
        </View>
      </ScrollView>

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

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark.foreground,
  },
  section: {
    backgroundColor: COLORS.dark.muted,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    width: '100%',
  },
  sectionText: {
    fontSize: 16,
    color: COLORS.dark.foreground,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.dark.border,
    marginVertical: 16,
  },
});

export default ProfilePage;
