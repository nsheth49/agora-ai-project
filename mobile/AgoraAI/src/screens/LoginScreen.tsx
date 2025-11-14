import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Linking, 
  Alert 
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

type RootStackParamList = {
  Signup: undefined;
  AppTabs: undefined;
};

export default function LoginScreen({setIsLoggedIn}: any) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Alert.alert('Login pressed', `Email: ${email}`);
    setIsLoggedIn(true);
    navigation.reset({
        index: 0,
        routes: [{ name: 'AppTabs' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AGORA AI</Text>

      <Text style={styles.subtitle}>
        Login or Sign up{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
          here
        </Text>
      </Text>

      <Text style={styles.subtext}>Enter your credentials to continue...</Text>

      <TextInput
        style={styles.input}
        placeholder="email@domain.com"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      // handleLogin 
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}> 
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <TouchableOpacity style={styles.googleButton}>
        <AntDesign name="google" size={20} color="black" />
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.appleButton}>
        <AntDesign name="apple1" size={20} color="black" />
        <Text style={styles.socialText}>Continue with Apple</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        By clicking continue, you agree to our{' '}
        <Text style={styles.link}>Terms of Service</Text> and{' '}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
  },
  subtext: {
    color: 'gray',
    marginBottom: 20,
  },
  link: {
    color: '#007AFF',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  loginButton: {
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    color: 'gray',
    marginBottom: 12,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#f2f2f2',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#f2f2f2',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  socialText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '500',
  },
  footerText: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    width: '90%',
  },
});

// import React from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// // const LoginScreen = ({ navigation }: any) => {
// //     return (
// //         <View style={styles.container}>
// //             <Text style={styles.title}>Login to Agora AI</Text>

// //             <TextInput placeholder="Email" style={styles.input} />
// //             <TextInput placeholder="Password" style={styles.input} secureTextEntry />

// //             <Button title="Login" onPress={() => navigation.replace('AppTabs')} />

// //             <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
// //                 Don't have an account? Sign up
// //             </Text>
// //         </View>
// //     );
// // };

// const LoginScreen = ({ navigation, onLogin }: any) => {
//   const handleLogin = () => {
//     // just temporary
//     onLogin(); // this switches AppNavigator to AppTabs
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput placeholder="Email" style={styles.input} />
//       <TextInput placeholder="Password" style={styles.input} secureTextEntry />
//       <Button title="Login" onPress={handleLogin} />
//       <Button title="Go Back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         padding: 20,
//     },
//     title: {
//         fontSize: 28,
//         textAlign: 'center',
//         marginBottom: 20,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 10,
//         marginBottom: 12,
//         borderRadius: 8,
//     },
//     link: {
//         color: 'blue',
//         textAlign: 'center',
//         marginTop: 16,
//     },
// });

// export default LoginScreen;