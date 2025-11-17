
/*
Author: Niket Sheth
*/ 


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
// @ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const AuthSecurityScreen = () => {
  const navigation = useNavigation();
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

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
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Recovery Email Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Recovery Email</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.roundInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter email..."
                  keyboardType="email-address"
                  autoCapitalize='none'
                />
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionBtnText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Recovery Phone Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Recovery Phone</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.roundInput}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter mobile number..."
                  keyboardType="phone-pad"
                />
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionBtnText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Change Password Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Change Password</Text>
              <TextInput
                style={[styles.roundInputFull, { marginBottom: 12 }]}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter current password..."
                secureTextEntry
              />
              <TextInput
                style={styles.roundInputFull}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password..."
                secureTextEntry
              />
              <TouchableOpacity style={[styles.actionBtn, { alignSelf: 'flex-end', marginTop: 14 }]}>
                <Text style={styles.actionBtnText}>Submit</Text>
              </TouchableOpacity>
            </View>

            {/* Go Back to Menu */}
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.backBtnText}>Go Back to Menu</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#ffe22a',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 3,
    paddingBottom: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 54,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212121',
    letterSpacing: 0.3,
  },
  scrollContent: {
    padding: 18,
    paddingTop: 26,
    paddingBottom: 44,
  },
  card: {
    backgroundColor: '#e6e6e6',
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 23,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#232323'
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundInput: {
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 15,
    flex: 1,
    marginRight: 11,
    borderWidth: 0,
    color: '#232323'
  },
  roundInputFull: {
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 15,
    borderWidth: 0,
    color: '#232323',
    width: '100%',
  },
  actionBtn: {
    backgroundColor: '#2370f2',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 9,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  backBtn: {
    backgroundColor: '#2370f2',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  backBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    letterSpacing: 0.2,
  },
});

export default AuthSecurityScreen;
