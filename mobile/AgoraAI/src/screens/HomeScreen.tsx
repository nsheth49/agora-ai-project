/*
Author: Eliza Gurung and Niket Sheth
*/ 

// @ts-ignore: no type declarations for react-native-vector-icons submodules
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';

const HomeScreen = () => {
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  return (
    <View style={{flex: 1, backgroundColor: '#ffe22a'}}>
      <StatusBar translucent backgroundColor="#ffe22a" barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffe22a'}}>
        {/* Header Section */}
        <View style={[styles.headerWrapper, {paddingTop: statusBarHeight}]}>
          <View style={styles.headerContent}>
            <MaterialIcons name="shield-outline" size={28} color="#120c00" />
            <Text style={styles.title}>AGORA AI</Text>
            <MaterialIcons name="account" size={28} color="#120c00" />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          {/* Tabs */}
          <View style={styles.tabRow}>
            <TouchableOpacity style={styles.tabActive}>
              <Text style={styles.tabTextActive}>Your Community</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabInactive}>
              <Text style={styles.tabText}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabInactive}>
              <Text style={styles.tabText}>My Inbox</Text>
            </TouchableOpacity>
          </View>

          {/* Top Cards (Trending + Active Votes) */}
          <View style={styles.cardsRow}>
            <View style={[styles.card, {flex: 1, marginRight: 4}]}>
              <Text style={styles.trendingSectionHeader}>Trending 🔥</Text>
              <Text style={styles.trendingTitle}>WiFi</Text>
              <Text style={styles.trendingDetails}>+128 people supported ‘FREE public WiFi downtown’ this week!</Text>
            </View>
            <View style={[styles.card, {flex: 1, marginLeft: 4}]}>
              <Text style={styles.trendingSectionHeader}>Active Votes 📦</Text>
              <Text style={styles.activeVotes}>12 Open</Text>
              <Text style={styles.activeVotesDetails}>Voting closes October 18</Text>
            </View>
          </View>

          {/* Questions Section */}
          <View style={styles.questionsContainer}>
            <Text style={styles.sectionHeader}>Questions you may want to ask...</Text>
            <Text style={styles.question}>Should financial literacy be a mandatory subject in schools?</Text>
            <Text style={styles.question}>Should downtown areas be pedestrian-only zones during weekends?</Text>
            <Text style={styles.question}>Opinion on car-free zones in certain neighborhoods?</Text>
            <Text style={styles.question}>Should the city ban gas-powered leaf blowers starting next year?</Text>
            <Text style={styles.question}>Should the city buy abandoned lots near Central Park to build community housing?</Text>
          </View>

          {/* Events Section */}
          <View style={styles.eventsContainer}>
            <Text style={styles.sectionHeader}>
              <MaterialIcons name="calendar" size={18} /> Upcoming Events / Deadlines
            </Text>
            <View style={styles.eventRow}>
              <MaterialIcons name="account" size={34} style={{marginRight: 8}} />
              <View>
                <Text style={styles.eventTitle}>Town Hall: Downtown Redevelopment</Text>
                <Text style={styles.eventTime}>October 14: 6:00 PM - 8:00 PM</Text>
              </View>
            </View>
            <View style={styles.eventRow}>
              <MaterialIcons name="account" size={34} style={{marginRight: 8}} />
              <View>
                <Text style={styles.eventTitle}>Vote closes for ‘Car-Free Sundays’</Text>
                <Text style={styles.eventTime}>October 18: 9:00 AM</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#ffe22a',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    marginBottom: 8,
    paddingBottom: 6,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 54,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#120c00',
    letterSpacing: 1,
  },
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    flexGrow: 1,
    paddingBottom: 30,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 18, // <<== increased margin here for more spacing below header
  },
  tabActive: {
    backgroundColor: '#120c00',
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginRight: 8,
  },
  tabInactive: {
    backgroundColor: '#F7F6F9',
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginRight: 8,
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tabText: {
    color: '#120c00',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardsRow: {
    flexDirection: 'row',
    marginBottom: 12,
    marginHorizontal: 2,
  },
  card: {
    backgroundColor: '#fffbe5',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    elevation: 1,
    minHeight: 98,
  },
  trendingSectionHeader: {
    fontSize: 15,
    fontWeight: '500',
    color: '#C99700',
    marginBottom: 3,
  },
  trendingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#120c00',
  },
  trendingDetails: {
    fontSize: 12,
    color: '#333'
  },
  activeVotes: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#120c00',
  },
  activeVotesDetails: {
    fontSize: 12,
    color: '#333',
  },
  questionsContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 9,
    color: '#120c00',
  },
  question: {
    fontSize: 15,
    marginBottom: 8,
    color: '#5B5B5B',
    borderBottomWidth: 0.5,
    borderColor: "#e1e1e1",
    paddingBottom: 5,
  },
  eventsContainer: {
    backgroundColor: '#f6f6ff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  eventTitle: {
    fontSize: 15,
    color: '#120c00',
    fontWeight: 'bold',
    marginBottom: 0,
  },
  eventTime: {
    fontSize: 13,
    color: '#666',
  },
});

export default HomeScreen;
