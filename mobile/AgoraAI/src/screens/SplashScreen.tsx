/*
Author: Niket Sheth
*/ 

import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation, isLoggedIn }: any) => {
  // Automatically navigate after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        navigation.replace('HomeTabs'); // Go to tabbed home
      } else {
        navigation.replace('Login'); // Go to login
      }
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, [navigation, isLoggedIn]);

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
    backgroundColor: '#000000ff', // dark background
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
    fontFamily: 'serif',
    fontWeight: '500',
  },
});

export default SplashScreen;
