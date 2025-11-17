import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GoogleSignInScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>G</Text>
        </View>
        
        <Text style={styles.title}>Sign in with Google</Text>
        <Text style={styles.subtitle}>Choose an account</Text>

        <TouchableOpacity style={styles.accountRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>N</Text>
          </View>
          <View style={styles.accountInfo}>
            <Text style={styles.accountName}>Niket Sheth</Text>
            <Text style={styles.accountEmail}>niket.sheth@gmail.com</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.accountRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>R</Text>
          </View>
          <View style={styles.accountInfo}>
            <Text style={styles.accountName}>Rasmika Sathuluri</Text>
            <Text style={styles.accountEmail}>rasmika.sathuluri@gmail.com</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addAccountRow}>
          <Text style={styles.plusIcon}>+</Text>
          <Text style={styles.addAccountText}>Add an account</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    width: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  logoContainer: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  title: {
    fontWeight: '600',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 4,
    color: '#202124',
  },
  subtitle: {
    textAlign: 'center',
    color: '#5f6368',
    fontSize: 14,
    marginBottom: 24,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f8f9fa',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontWeight: '600',
    fontSize: 15,
    color: '#202124',
    marginBottom: 2,
  },
  accountEmail: {
    color: '#5f6368',
    fontSize: 13,
  },
  addAccountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  plusIcon: {
    fontSize: 24,
    color: '#5f6368',
    marginRight: 12,
  },
  addAccountText: {
    color: '#5f6368',
    fontSize: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  closeText: {
    fontSize: 24,
    color: '#5f6368',
  },
});

export default GoogleSignInScreen;
