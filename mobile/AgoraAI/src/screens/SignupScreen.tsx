// import React from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// const SignupScreen = ({ navigation }: any) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign Up</Text>

//       <TextInput placeholder="Name" style={styles.input} />
//       <TextInput placeholder="Email" style={styles.input} />
//       <TextInput placeholder="Password" style={styles.input} secureTextEntry />

//       <Button title="Create Account" onPress={() => navigation.replace('AppTabs')} />

//       <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
//         Already have an account? Login
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 28,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 12,
//     borderRadius: 8,
//   },
//   link: {
//     color: 'blue',
//     textAlign: 'center',
//     marginTop: 16,
//   },
// });

// export default SignupScreen;

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Alert 
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Email/Password Signup
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      
      // Update profile with name
      await userCredential.user.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });

      Alert.alert('Success', 'Account created successfully!');
      navigation.replace('AppTabs');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'Email address is already in use');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid email address');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'Password should be at least 6 characters');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  // Google Signup
  const handleGoogleSignup = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { data } = await GoogleSignin.signIn();
      
      if (data?.idToken) {
        const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
        await auth().signInWithCredential(googleCredential);
        
        Alert.alert('Success', 'Signed up with Google successfully!');
        navigation.replace('AppTabs');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AGORA AI</Text>

      <Text style={styles.subtitle}>Create an account</Text>
      <Text style={styles.subtext}>Enter your email to sign up for this app</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Birth date"
        value={birthDate}
        onChangeText={setBirthDate}
      />

      <TextInput
        style={styles.input}
        placeholder="email@domain.com"
        keyboardType="email-address"
        autoCapitalize="none"
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

      <TextInput
        style={styles.input}
        placeholder="Re-enter password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Join Agora AI</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignup}>
        <AntDesign name="google" size={20} color="black" />
        <Text style={styles.socialText}>Sign up with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.appleButton}>
        <AntDesign name="apple1" size={20} color="black" />
        <Text style={styles.socialText}>Sign up with Apple</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        By clicking continue, you agree to our{' '}
        <Text style={styles.link}>Terms of Service</Text> and{' '}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>
    </View>
  );
};

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
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtext: {
    color: 'gray',
    marginBottom: 20,
    fontSize: 14,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  signupButton: {
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  signupText: {
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
  link: {
    color: '#007AFF',
  },
  footerText: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    width: '90%',
  },
});

export default SignupScreen;
