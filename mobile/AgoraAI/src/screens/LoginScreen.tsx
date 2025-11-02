import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// const LoginScreen = ({ navigation }: any) => {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Login to Agora AI</Text>

//             <TextInput placeholder="Email" style={styles.input} />
//             <TextInput placeholder="Password" style={styles.input} secureTextEntry />

//             <Button title="Login" onPress={() => navigation.replace('AppTabs')} />

//             <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
//                 Don't have an account? Sign up
//             </Text>
//         </View>
//     );
// };

const LoginScreen = ({ navigation, onLogin }: any) => {
  const handleLogin = () => {
    // just temporary
    onLogin(); // this switches AppNavigator to AppTabs
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 12,
        borderRadius: 8,
    },
    link: {
        color: 'blue',
        textAlign: 'center',
        marginTop: 16,
    },
});

export default LoginScreen;