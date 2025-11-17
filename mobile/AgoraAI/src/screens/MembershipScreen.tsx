/*
Author: Niket Sheth
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
  Switch,
  ScrollView,
} from 'react-native';
// @ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MembershipScreen = () => {
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;
  const [annual, setAnnual] = useState(false);

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
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            {/* Membership Header */}
            <Text style={styles.headerText}>Membership</Text>
            <View style={styles.planContainer}>
              {/* Basic Free Card */}
              <View style={styles.basicCard}>
                <Text style={styles.basicTitle}>Basic</Text>
                <Text style={styles.basicSub}>(Free)</Text>
                <View style={styles.list}>
                  <Text style={styles.bullet}>➤ Contains ads</Text>
                  <Text style={styles.bullet}>➤ Converse with Agora AI</Text>
                  <Text style={styles.bullet}>➤ Regular Updates</Text>
                </View>
                <TouchableOpacity style={styles.upgradeBtn}>
                  <Text style={styles.upgradeBtnText}>Upgrade Now</Text>
                </TouchableOpacity>
              </View>
              {/* Premium Card */}
              <View style={styles.premiumCard}>
                <Text style={styles.premiumTitle}>Premium</Text>
                <Text style={styles.premiumSub}>($9.99/month)</Text>
                <View style={styles.list}>
                  <Text style={styles.premiumBullet}>➤ Submit an appeal if admin blocks or removes the user's access to a discussion</Text>
                  <Text style={styles.premiumBullet}>➤ Early access to beta features, faster updates</Text>
                  <Text style={styles.premiumBullet}>➤ Save posts and conversations with Agora AI</Text>
                  <Text style={styles.premiumBullet}>➤ Receive push-notifications within a discussion</Text>
                  <Text style={styles.premiumBullet}>➤ Receive priority access to chatting with officials and avoid extensive wait time</Text>
                  <Text style={styles.premiumBullet}>➤ Ad-free</Text>
                </View>
              </View>
            </View>
            {/* Switch for Plan */}
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Monthly / Annual (Save 20%)</Text>
              <Switch
                value={annual}
                onValueChange={setAnnual}
                trackColor={{ false: "#d8d8d8", true: "#2370f2" }}
                thumbColor={annual ? "#fff" : "#fff"}
              />
            </View>
            {/* Payment Button */}
            <TouchableOpacity style={styles.paymentBtn}>
              <Text style={styles.paymentBtnText}>Proceed to Payment</Text>
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 23,
    color: '#212121',
    letterSpacing: 0.1,
  },
  planContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  basicCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#e5e5e7',
    paddingVertical: 20,
    paddingHorizontal: 14,
    marginRight: 14,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  basicTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 0,
  },
  basicSub: {
    fontSize: 15,
    color: '#212121',
    fontWeight: '400',
    marginBottom: 11,
  },
  list: {
    marginBottom: 22,
    marginTop: 6,
  },
  bullet: {
    fontSize: 15,
    color: '#1f1f1f',
    marginVertical: 2,
    fontWeight: '500',
  },
  upgradeBtn: {
    backgroundColor: '#2370f2',
    borderRadius: 8,
    minWidth: 115,
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  upgradeBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  premiumCard: {
    flex: 1.12,
    backgroundColor: '#ffe22a',
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 14,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  premiumTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#232323',
    marginBottom: 0,
  },
  premiumSub: {
    fontSize: 14,
    color: '#232323',
    fontWeight: '600',
    marginBottom: 12,
  },
  premiumBullet: {
    fontSize: 15,
    fontWeight: '500',
    color: '#232323',
    marginBottom: 5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#f5f5f6",
    borderRadius: 13,
    paddingVertical: 12,
    paddingHorizontal: 19,
    marginVertical: 10,
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 16,
    color: '#212121',
    fontWeight: '600',
    marginRight: 10,
  },
  paymentBtn: {
    backgroundColor: "#2370f2",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 8,
    minWidth: 220,
    alignSelf: 'center',
    width: '80%',
  },
  paymentBtnText: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.14,
  },
});

export default MembershipScreen;
