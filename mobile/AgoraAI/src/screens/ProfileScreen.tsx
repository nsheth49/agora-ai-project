
/*
Author: Niket Sheth and Eliza Gurung
*/ 

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
// @ts-ignore: no type declarations for react-native-vector-icons submodules
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define root navigator param list
type RootStackParamList = {
  Profile: undefined;
  AuthSecurity: undefined;
  Home: undefined;
  Feed: undefined;
  Notifications: undefined;
  AIChatScreen: undefined;
  Membership: undefined;
  LanguageScreen: undefined;
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

const menuOptions = [
  {
    title: 'Profile',
    subtitle: 'Personal details, interests, bio, etc.',
    icon: 'account',
    isLocked: false,
  },
  {
    title: 'Authentication & Security',
    subtitle: 'Add recovery email & phone number',
    icon: 'lock',
    isLocked: false,
  },
  {
    title: 'Language & Region',
    subtitle: 'Choose your region and preferred language',
    icon: 'lock',
    isLocked: false,
  },
  {
    title: 'Membership',
    subtitle: 'View exclusive benefits & join today',
    icon: 'lock',
    isLocked: false,
  },
];

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [firstName, setFirstName] = useState('Niket');
  const [lastName, setLastName] = useState('Sheth');
  const [dob, setDob] = useState('');
  const [bio, setBio] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#ffe22a' }}>
      <StatusBar translucent backgroundColor="#ffe22a" barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffe22a' }}>
        {/* HEADER */}
        <View style={[styles.headerWrapper, { paddingTop: statusBarHeight }]}>
          <View style={styles.headerContent}>
            <MaterialIcons name="shield-outline" size={28} color="#120c00" />
            <Text style={styles.title}>AGORA AI</Text>
            <MaterialIcons name="account" size={28} color="#120c00" style={{ opacity: 0 }} />
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          {!showProfileForm ? (
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
              {/* Blue Profile Card */}
              <View style={styles.profileCard}>
                <View style={styles.profileCircle}>
                  <MaterialIcons name="star" size={32} color="#2151E6" />
                  <View style={styles.circleRing} />
                </View>
                <View style={{ flex: 1, marginLeft: 18 }}>
                  <Text style={styles.profileName}>Niket Sheth</Text>
                  <Text style={styles.profileSub}>Community Voice Advocate</Text>
                </View>
              </View>
              {/* Menu Section */}
              <View style={styles.menuSection}>
                {menuOptions.map((option, i) => (
                  <TouchableOpacity
                    key={option.title}
                    style={[styles.menuCard, i !== menuOptions.length - 1 && { marginBottom: 14 }]}
                    activeOpacity={0.8}
                    onPress={
                      option.title === "Profile"
                        ? () => setShowProfileForm(true)
                        : option.title === "Authentication & Security"
                        ? () => navigation.navigate('AuthSecurity')
                        : option.title === "Membership"
                        ? () => navigation.navigate('Membership')
                        : option.title === "Language & Region"
                        ? () => navigation.navigate('LanguageScreen')
                        : undefined
                    }
                  >
                    <View style={styles.menuIcon}>
                      <MaterialIcons name={option.icon} size={24} color="#232323" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.menuTitle}>{option.title}</Text>
                      <Text style={styles.menuSubtitle}>{option.subtitle}</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={27} color="#212121" />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          ) : (
            <ScrollView contentContainerStyle={styles.formContainer}>
              <Text style={styles.sectionHeader}>Personal Information</Text>
              <View style={styles.row}>
                <View style={styles.selectorInputContainer}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="First Name"
                  />
                </View>
                <View style={styles.selectorInputContainer}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Last Name"
                  />
                </View>
              </View>
              <Text style={styles.inputLabel}>Date of Birth (DOB)</Text>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={dob}
                  onChangeText={setDob}
                  placeholder="DD/MM/YYYY"
                  keyboardType="numeric"
                />
                <MaterialIcons name="calendar" size={22} color="#888" style={{ marginLeft: 8 }} />
              </View>
              <Text style={styles.inputLabel}>Bio</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={bio}
                onChangeText={setBio}
                placeholder="Tell us a bit about yourself..."
                multiline={true}
                numberOfLines={4}
              />
              <View style={styles.sectionDivider} />
              <Text style={styles.sectionHeader2}>Documents</Text>
              <TouchableOpacity style={styles.addDocBtn}>
                <MaterialIcons name="plus-circle-outline" size={24} color="#212121" style={{ marginRight: 7 }} />
                <Text style={styles.addDocBtnText}>Add Document(s)</Text>
              </TouchableOpacity>
              <Text style={styles.docNote}>Add any supporting materials to express yourself</Text>
              {/* Save button at the bottom, always visible */}
              <View style={styles.bottomSaveWrapper}>
                <TouchableOpacity style={styles.saveBtn} onPress={() => setShowSuccess(true)}>
                  <Text style={styles.saveBtnText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backBtn} onPress={() => setShowProfileForm(false)}>
                  <Text style={styles.backBtnText}>Back</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
        <Modal
          visible={showSuccess}
          animationType="fade"
          transparent
          onRequestClose={() => setShowSuccess(false)}
        >
          <View style={styles.modalBG}>
            <View style={styles.popup}>
              <Text style={styles.popupText}>Your changes{'\n'}were saved!</Text>
              <TouchableOpacity style={styles.popupButton} onPress={() => setShowSuccess(false)}>
                <Text style={styles.popupButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#ffe22a',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    marginBottom: 0,
    paddingBottom: 6,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 54,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    letterSpacing: 0.2,
  },
  profileCard: {
    backgroundColor: '#2151E6',
    marginHorizontal: 18,
    marginTop: 32,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 22,
    elevation: 2,
  },
  profileCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    position: 'relative',
    zIndex: 1,
  },
  circleRing: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#ffe22a',
    zIndex: -1,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 2,
  },
  profileSub: {
    color: '#e6ecff',
    fontSize: 15,
    fontWeight: '500',
  },
  menuSection: {
    backgroundColor: '#F0F0F1',
    borderRadius: 13,
    marginHorizontal: 0,
    marginTop: 32,
    paddingTop: 20,
    paddingBottom: 20,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 11,
    marginHorizontal: 18,
    paddingVertical: 18,
    paddingHorizontal: 16,
    elevation: 1,
    marginBottom: 0,
  },
  menuIcon: {
    marginRight: 14,
  },
  menuTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#212121',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 0,
  },
  formContainer: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingTop: 36,
    paddingBottom: 42,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 4,
    color: '#181818',
    letterSpacing: 0.1,
  },
  sectionHeader2: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 9,
    marginTop: 18,
    color: '#181818',
    letterSpacing: 0.1,
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    marginVertical: 17,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 9,
  },
  selectorInputContainer: {
    flex: 1,
    marginRight: 10,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#232323',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    marginBottom: 0,
    color: '#222',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    marginTop: 4,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 13,
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
    marginTop: 4,
    marginBottom: 8,
  },
  addDocBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe073',
    alignSelf: 'flex-start',
    paddingVertical: 11,
    paddingHorizontal: 19,
    borderRadius: 8,
    marginTop: 3,
    marginBottom: 6,
  },
  addDocBtnText: {
    color: '#181818',
    fontWeight: 'bold',
    fontSize: 15,
  },
  docNote: {
    fontSize: 13,
    color: '#888',
    marginBottom: 20,
    marginTop: 1,
    marginLeft: 2,
  },
  bottomSaveWrapper: {
    marginTop: 20,
    marginBottom: 8,
    alignItems: 'center',
    width: '100%',
  },
  saveBtn: {
    backgroundColor: "#2367F2",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 190,
    marginBottom: 8,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.12,
    paddingHorizontal: 35,
  },
  backBtn: {
    alignItems: 'center',
    marginTop: 6,
  },
  backBtnText: {
    color: "#2367F2",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
  // Popup styles
  modalBG: {
    flex: 1,
    backgroundColor: "rgba(180,180,180,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  popup: {
    minWidth: width * 0.76,
    backgroundColor: '#41A547',
    borderRadius: 23,
    paddingVertical: 38,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1D821C',
    shadowOpacity: 0.15,
    shadowRadius: 11,
    shadowOffset: { width: 0, height: 6 },
  },
  popupText: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 24,
    lineHeight: 39,
  },
  popupButton: {
    backgroundColor: '#181818',
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 29,
    alignItems: 'center',
  },
  popupButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 0.18,
  },
});

export default ProfileScreen;
