import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }: any) => {
  // Automatically navigate after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome'); // Replace Splash with Welcome
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../static/logo.png')} style={styles.logo} />
      <Text style={styles.title}>AGORA AI</Text>
      <Text style={styles.subtitle}>Your Voice Matters</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120c00', // dark background
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 32,
    resizeMode: 'contain', // adjust size as needed
  },
  title: {
    fontSize: 32,
    color: '#ffe22a',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 22,
    color: '#ffe22a',
    fontFamily: 'serif', // matches the style from your image
    fontWeight: '500',
  },
});

export default SplashScreen;