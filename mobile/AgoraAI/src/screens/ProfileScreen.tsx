import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// @ts-ignore: no type declarations for react-native-vector-icons submodules
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// @ts-ignore: no type declarations for react-native-vector-icons submodules
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// @ts-ignore: no type declarations for react-native-vector-icons submodules
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => (
  <View style={styles.container}>
    {/* Header Section */}
    <View style={styles.headerWrapper}>
      <View style={styles.header}>
        <MaterialIcons name="shield" size={26} color="#120c00" style={styles.shieldIcon} />
        <Text style={styles.headerTitle}>Profile & Account</Text>
      </View>
      <View style={styles.headerCurve} />
    </View>

    <View style={styles.mainSection}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarCircle}>
          <FontAwesome name="star" size={27} color="#256af5" />
        </View>
        <View style={{ marginLeft: 16 }}>
          <Text style={styles.profileName}>Sample Name</Text>
          <Text style={styles.profileRole}>Community Voice Advocate</Text>
        </View>
      </View>

      {/* Setting Options */}
      <View style={styles.settingsSection}>
        <SettingsItem
          icon={<Ionicons name="person" size={22} color="#120c00" />}
          title="Profile"
          subtitle="Personal details, interests, bio, etc."
        />
        <SettingsItem
          icon={<FontAwesome name="lock" size={20} color="#120c00" />}
          title="Authentication & Security"
          subtitle="Add recovery email & phone number"
        />
        <SettingsItem
          icon={<Ionicons name="language" size={20} color="#120c00" />}
          title="Language & Region"
          subtitle="Choose your region and preferred language"
        />
        <SettingsItem
          icon={<FontAwesome name="unlock-alt" size={20} color="#120c00" />}
          title="Membership"
          subtitle="View exclusive benefits & join today"
          locked
        />
      </View>
    </View>
  </View>
);

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  locked?: boolean;
}

const SettingsItem = ({ icon, title, subtitle, locked = false }: SettingsItemProps) => (
  <TouchableOpacity style={styles.settingsItem}>
    <View style={styles.settingsIcon}>{icon}</View>
    <View style={{ flex: 1 }}>
      <Text style={styles.settingsTitle}>{title}</Text>
      <Text style={styles.settingsSubtitle}>{subtitle}</Text>
    </View>
    {locked ? (
      <FontAwesome name="lock" size={18} color="#aaa" />
    ) : (
      <MaterialIcons name="keyboard-arrow-right" size={24} color="#1a2038" />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    backgroundColor: '#ffd028',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingBottom: 0,
  },
  header: {
    paddingTop: 38,
    paddingBottom: 20,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: '700',
    color: '#120c00',
    marginTop: 18,
    letterSpacing: 0.5,
  },
  shieldIcon: {
    position: 'absolute',
    left: 18,
    top: 44,
  },
  headerCurve: {
    backgroundColor: '#fff',
    height: 30,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginHorizontal: -2,
    marginTop: -8,
  },
  mainSection: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#fff',
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#256af5',
    borderRadius: 18,
    marginHorizontal: 22,
    paddingVertical: 21,
    paddingHorizontal: 23,
    alignItems: 'center',
    marginTop: -15,
    marginBottom: 22,
    elevation: 2,
    shadowColor: '#008',
    shadowOpacity: 0.08,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 2,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#ffd028',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  profileName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 3,
  },
  profileRole: {
    fontSize: 15,
    color: '#e3effc',
  },
  settingsSection: {
    marginTop: 5,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    borderRadius: 12,
    marginHorizontal: 18,
    marginBottom: 15,
    padding: 17,
    shadowColor: '#aaa',
    shadowOpacity: 0.04,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 2 },
  },
  settingsIcon: {
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  settingsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a2038',
    marginBottom: 3,
  },
  settingsSubtitle: {
    fontSize: 13,
    color: '#a3adc2',
  },
});

export default ProfileScreen;