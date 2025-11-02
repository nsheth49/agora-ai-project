// import React from 'react';
// import { View, Text, Button } from 'react-native';

// const WelcomeScreen = ({ navigation }: any) => (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <text>Welcome to Agora AI!</text>
//       <Button title="Login" onPress={() => navigation.navigate('Login')} />
//       <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
//     </View>
// );

// export default WelcomeScreen;

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to AgoraAI</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default WelcomeScreen;
