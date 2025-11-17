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
  TextInput,
  Dimensions,
} from 'react-native';
// @ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const MembershipScreen = () => {
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;
  const navigation = useNavigation();

  const [annual, setAnnual] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // Payment states
  const [payMode, setPayMode] = useState('card'); // 'card' | 'paypal'
  const [name, setName] = useState('');
  const [exp, setExp] = useState('');
  const [cvc, setCvc] = useState('');
  const [zip, setZip] = useState('');
  const [agree, setAgree] = useState(false);

  // Main membership plans UI
  if (!showPayment) {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffe22a' }}>
        <StatusBar translucent backgroundColor="#ffe22a" barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffe22a' }}>
          <View style={[styles.headerWrapper, { paddingTop: statusBarHeight }]}>
            <View style={styles.headerContent}>
              <MaterialIcons name="shield-outline" size={28} color="#120c00" />
              <Text style={styles.title}>AGORA AI</Text>
              <MaterialIcons name="account" size={28} color="#120c00" style={{ opacity: 0 }} />
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
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
                  <Text style={styles.premiumSub}>( $9.99/month )</Text>
                  <View style={styles.list}>
                    <Text style={styles.premiumBullet}>➤ Submit an appeal if admin blocks or removes the user's access to a discussion</Text>
                    <Text style={styles.premiumBullet}>➤ Early access to beta features, faster updates</Text>
                    <Text style={styles.premiumBullet}>➤ Save posts and conversations with Agora AI</Text>
                    <Text style={styles.premiumBullet}>➤ Receive push-notifications within a discussion</Text>
                    <Text style={styles.premiumBullet}>➤ Priority access to officials and avoid wait time</Text>
                    <Text style={styles.premiumBullet}>➤ Ad-free</Text>
                  </View>
                </View>
              </View>
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Monthly / Annual (Save 20%)</Text>
                <Switch
                  value={annual}
                  onValueChange={setAnnual}
                  trackColor={{ false: "#d8d8d8", true: "#2370f2" }}
                  thumbColor={annual ? "#fff" : "#fff"}
                />
              </View>
              <TouchableOpacity style={styles.paymentBtn} onPress={() => setShowPayment(true)}>
                <Text style={styles.paymentBtnText}>Proceed to Payment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Text style={styles.backBtnText}>Back to Menu</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  // Payment card UI
  return (
    <View style={{ flex: 1, backgroundColor: '#ffe22a' }}>
      <StatusBar translucent backgroundColor="#ffe22a" barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffe22a' }}>
        <View style={[styles.headerWrapper, { paddingTop: statusBarHeight }]}>
          <View style={styles.headerContent}>
            <MaterialIcons name="shield-outline" size={28} color="#120c00" />
            <Text style={styles.title}>AGORA AI</Text>
            <MaterialIcons name="account" size={28} color="#120c00" style={{ opacity: 0 }} />
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'flex-start' }}>
          <ScrollView contentContainerStyle={{ padding: 18, paddingTop: 27 }}>
            <Text style={styles.headerTextPayment}>Membership</Text>
            <View style={styles.paymentCard}>
              <View style={styles.paymentHeader}>
                <Text style={styles.paymentCardHeader}>Payment Information</Text>
                <MaterialIcons name="cart-outline" size={30} color="#181818" />
              </View>
              {/* Card/Paypal toggle */}
              <View style={styles.toggleRow}>
                <Text style={styles.payLabel}>Credit Card</Text>
                <Switch
                  value={payMode === 'card'}
                  onValueChange={() => setPayMode('card')}
                  trackColor={{ false: "#d8d8d8", true: "#2370f2" }}
                />
              </View>
              <View style={styles.toggleRow}>
                <Text style={styles.payLabel}>PayPal</Text>
                <Switch
                  value={payMode === 'paypal'}
                  onValueChange={() => setPayMode('paypal')}
                  trackColor={{ false: "#d8d8d8", true: "#2370f2" }}
                />
              </View>
              {/* Card fields */}
              {payMode === "card" && (
                <>
                  <Text style={[styles.paySecLabel, { marginTop: 7 }]}>Name on Card</Text>
                  <TextInput
                    style={styles.payInput}
                    value={name}
                    onChangeText={setName}
                    placeholder="Name"
                  />
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    <TextInput
                      style={[styles.payInput, { flex: 1, marginRight: 6 }]}
                      value={exp}
                      onChangeText={setExp}
                      placeholder="Expiration (MM)"
                      keyboardType="numeric"
                    />
                    <TextInput
                      style={[styles.payInput, { flex: 1, maxWidth: 81 }]}
                      value={cvc}
                      onChangeText={setCvc}
                      placeholder="CVC"
                      keyboardType="numeric"
                    />
                  </View>
                  <TextInput
                    style={[styles.payInput, { marginTop: 5 }]}
                    value={exp}
                    onChangeText={setExp}
                    placeholder="(MM/YY)"
                  />
                  <TextInput
                    style={[styles.payInput, { marginTop: 5 }]}
                    value={zip}
                    onChangeText={setZip}
                    placeholder="Zip/Postal Code"
                  />
                </>
              )}
              <Text style={styles.payDue}>Total Due: $199.99</Text>
              {/* Agree terms checkbox substitute */}
              <TouchableOpacity
                onPress={() => setAgree((a) => !a)}
                style={styles.termsRow}
                activeOpacity={0.78}
              >
                <View style={styles.checkbox}>{agree && <View style={styles.checkboxCheck} />}</View>
                <Text style={styles.termsText}>
                  I agree to the Terms of Service..
                </Text>
              </TouchableOpacity>
              <Text style={styles.paySSL}>
                Your payment is secured by SSL encryption.
              </Text>
              <TouchableOpacity
                style={[
                  styles.payNowBtn,
                  (!agree || !name || !cvc || !exp || !zip) && { opacity: 0.6 },
                ]}
                disabled={!agree || !name || !cvc || !exp || !zip}
              >
                <Text style={styles.payNowBtnText}>Pay Now</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.payChangePlan}>Change Plan</Text>
              </TouchableOpacity>
              {/* Billing info */}
              <View style={styles.billingCycleBox}>
                <Text style={styles.billingLabel}>Billing Cycle:</Text>
                <Text>Cost: $199.99 (USD)</Text>
                <Text>Savings</Text>
                <Text>Next Renewal{'\n'}October 12, 2026</Text>
              </View>
            </View>
            {/* Back button */}
            <TouchableOpacity style={styles.backBtn} onPress={() => setShowPayment(false)}>
              <Text style={styles.backBtnText}>Back to Plans</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  // (all previous styles plus new payment form styles)
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
  headerTextPayment: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    letterSpacing: 0.1,
    marginBottom: 24,
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
  backBtn: {
    backgroundColor: "#2370f2",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    minWidth: 220,
    alignSelf: 'center',
    width: '80%',
  },
  backBtnText: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.14,
  },
  paymentCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#d6d6d9",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    width: '100%',
    marginBottom: 25,
    marginTop: 10,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 7, shadowOffset: {width:0, height: 1},
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentCardHeader: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#181818',
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  payLabel: {
    fontWeight: "500",
    fontSize: 15,
    color: "#161616",
  },
  paySecLabel: {
    fontWeight: "600",
    fontSize: 15,
    color: "#1a1a1a",
    marginBottom: 4,
    marginTop: 7,
  },
  payInput: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#222',
    marginBottom: 0,
    marginRight: 0,
  },
  payDue: {
    marginTop: 17,
    fontWeight: "600",
    fontSize: 15,
    color: "#212121",
    marginBottom: 2,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginTop: 13,
  },
  checkbox: {
    width: 21,
    height: 21,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#2367f2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
    backgroundColor: "#fff"
  },
  checkboxCheck: {
    width: 13,
    height: 13,
    backgroundColor: "#2367f2",
    borderRadius: 3,
  },
  termsText: {
    fontSize: 14,
    color: "#141414",
    fontWeight: "500",
  },
  paySSL: {
    fontSize: 12,
    color: "#8c8c8c",
    marginTop: 2,
    marginBottom: 6,
  },
  payNowBtn: {
    backgroundColor: "#2367f2",
    borderRadius: 11,
    marginTop: 8,
    marginBottom: 2,
    paddingVertical: 13,
    alignItems: "center",
  },
  payNowBtnText: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.14,
    paddingHorizontal: 12,
  },
  payChangePlan: {
    fontSize: 15,
    color: "#2367f2",
    fontWeight: "bold",
    marginTop: 13,
    marginBottom: 5,
    alignSelf: 'center',
  },
  billingCycleBox: {
    marginTop: 10,
    marginLeft: 3,
    alignItems: "flex-start",
  },
  billingLabel: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 1,
    marginTop: 9,
    color: "#232323",
  },
});

export default MembershipScreen;
