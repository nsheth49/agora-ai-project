// LanguageScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
// @ts-ignore: no type declarations for react-native-vector-icons submodules
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LANGS = [
  { main: 'Español (EE. UU.)', sub: 'Spanish (US)' },
  { main: 'English (UK)', sub: 'English (UK)' },
  { main: '簡體中文', sub: 'Chinese (Traditional)' },
  { main: 'हिंदी', sub: 'Hindi' },
  { main: 'Français', sub: 'French' },
];

type LanguageScreenProps = {
  onBack: () => void;
};

const LanguageScreen: React.FC<LanguageScreenProps> = ({ onBack }) => {
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;
  const [selectedLang, setSelectedLang] = useState('English (UK)');

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
          <View style={styles.languageWrapper}>
            <View style={styles.languageHeaderRow}>
              <TouchableOpacity style={styles.languageBackRow} onPress={onBack}>
                <MaterialIcons name="chevron-left" size={26} color="#181818" />
                <Text style={styles.languageBackText}>English</Text>
              </TouchableOpacity>
              <Text style={styles.languageHeaderTitle}>Language & Region</Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
              {LANGS.map((item, idx) => (
                <TouchableOpacity
                  key={item.main}
                  style={[
                    styles.languageRow,
                    idx === LANGS.length - 1 ? { borderBottomWidth: 0 } : {},
                    selectedLang === item.main && styles.languageActiveRow,
                  ]}
                  activeOpacity={0.75}
                  onPress={() => setSelectedLang(item.main)}
                >
                  <Text style={[
                    styles.languageSub,
                    { marginBottom: 2 },
                    selectedLang === item.main && { color: "#262626", fontWeight: 'bold' }
                  ]}>
                    {item.sub}
                  </Text>
                  <Text style={[
                    styles.languageText,
                    selectedLang === item.main && styles.languageTextActive,
                  ]}>
                    {item.main}
                  </Text>
                </TouchableOpacity>
              ))}
              <View style={styles.languageSaveBtnView}>
                <TouchableOpacity style={styles.saveBtn}>
                  <Text style={styles.saveBtnText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
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
  languageWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingTop: 15,
  },
  languageHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
    paddingHorizontal: 7,
  },
  languageBackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  languageBackText: {
    color: "#181818",
    fontSize: 16,
    marginLeft: 2,
    marginRight: 7,
    fontWeight: '400',
  },
  languageHeaderTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 3,
    color: '#212121',
    letterSpacing: 0.03,
  },
  languageRow: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  languageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#181818",
  },
  languageTextActive: {
    color: "#181818",
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  languageSub: {
    fontSize: 13,
    fontWeight: "400",
    color: "#8c8c8c",
  },
  languageActiveRow: {
    backgroundColor: "#E8EDEF",
    borderRadius: 8,
  },
  languageSaveBtnView: {
    alignItems: "center",
    marginTop: 35,
    marginBottom: 20,
  },
  saveBtn: {
    backgroundColor: "#2367F2",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 190,
    marginBottom: 8,
    paddingHorizontal: 35,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.12,
  },
});

export default LanguageScreen;
