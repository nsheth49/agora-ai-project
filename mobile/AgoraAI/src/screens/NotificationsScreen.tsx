import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Notifications</Text>
    <Text style={styles.subtitle}>Your messages and alerts will appear here.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  title: {
    fontSize: 24, fontWeight: 'bold', color: '#120c00', marginBottom: 10,
  },
  subtitle: {
    fontSize: 17, color: '#333'
  }
});

export default NotificationsScreen;
