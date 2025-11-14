import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        {/* Optionally, put Shield/profile icons here */}
        <Text style={styles.title}>AGORA AI</Text>
      </View>

      {/* Tabs Row */}
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

      {/* Trending Section */}
      <View style={styles.trendingContainer}>
        <Text style={styles.sectionHeader}>Trending 🔥</Text>
        <Text style={styles.trendingTitle}>WiFi</Text>
        <Text style={styles.trendingDetails}>+128 people supported ‘FREE public WiFi downtown’ this week!</Text>
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

      {/* Upcoming Events Section */}
      <View style={styles.eventsContainer}>
        <Text style={styles.sectionHeader}>Upcoming Events / Deadlines</Text>
        <Text style={styles.eventItem}>Town Hall: Downtown Redevelopment{"\n"}October 14: 6:00 PM - 8:00 PM</Text>
        <Text style={styles.eventItem}>Vote closes for ‘Car-Free Sundays’{"\n"}October 18: 9:00 AM</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#ffe22a',
    padding: 10,
    alignItems: 'center',
    marginBottom: 8
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#120c00',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  tabActive: {
    backgroundColor: '#120c00',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  tabInactive: {
    backgroundColor: '#eee',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabText: {
    color: '#333',
    fontWeight: 'normal',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 12,
    color: '#120c00',
  },
  trendingContainer: {
    backgroundColor: '#fff5c2',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
  },
  trendingTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6
  },
  trendingDetails: {
    fontSize: 14,
    color: '#333'
  },
  questionsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
  },
  question: {
    fontSize: 15,
    marginBottom: 5,
    color: '#555'
  },
  eventsContainer: {
    backgroundColor: '#f6f6ff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  eventItem: {
    fontSize: 15,
    marginBottom: 5,
    color: '#333'
  }
});

export default HomeScreen;
