import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const ProfilePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Edit Profile Section */}
        <TouchableOpacity style={styles.section}>
          <View style={styles.row}>
            <Feather name="user" size={20} color="#f5f5f5" />
            <Text style={styles.sectionText}>Edit Profile</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#adb3bf" />
        </TouchableOpacity>

        {/* Notifications Section */}
        <TouchableOpacity style={styles.section}>
          <View style={styles.row}>
            <Feather name="bell" size={20} color="#f5f5f5" />
            <Text style={styles.sectionText}>Notifications</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#adb3bf" />
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Privacy & Security Section */}
        <TouchableOpacity style={styles.section}>
          <View style={styles.row}>
            <Feather name="lock" size={20} color="#f5f5f5" />
            <Text style={styles.sectionText}>Privacy & Security</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#adb3bf" />
        </TouchableOpacity>

        {/* Terms & Conditions Section */}
        <TouchableOpacity style={styles.section}>
          <View style={styles.row}>
            <Feather name="file-text" size={20} color="#f5f5f5" />
            <Text style={styles.sectionText}>Terms & Conditions</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#adb3bf" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f5f5f5',
  },
  section: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#6a5acd',
  },
  sectionText: {
    fontSize: 16,
    color: '#f5f5f5',
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#6a5acd',
    marginVertical: 16,
  },
});

export default ProfilePage;
