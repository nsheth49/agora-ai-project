

// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import WelcomeScreen from '../screens/WelcomeScreen';
// import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
// import SplashScreen from '../screens/SplashScreen';

// const Stack = createStackNavigator();

// const AuthStack = ({ setIsLoggedIn }: any) => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Splash" component={SplashScreen} />
//     <Stack.Screen name="Welcome" component={WelcomeScreen} />
//     <Stack.Screen name="Login">
//       {/* {props => <LoginScreen {...props} onLogin={onLogin} />} */}
//       {({ navigation }) => (
//           <LoginScreen navigation={navigation} setIsLoggedIn={setIsLoggedIn} />
//       )}
//     </Stack.Screen>
//     <Stack.Screen name="Signup" component={SignupScreen} />
//   </Stack.Navigator>
// );

// export default AuthStack;

import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import SplashScreen from '../screens/SplashScreen';
import AppTabs from './AppTabs'; // Import your bottom tabs navigator

const Stack = createStackNavigator();

const AuthStack = ({ isLoggedIn, setIsLoggedIn }: { isLoggedIn: boolean, setIsLoggedIn: (val: boolean) => void }) => {
  // Note: SplashScreen handles redirection after animation completes

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Always start with SplashScreen */}
      <Stack.Screen name="Splash">
        {props => (
          <SplashScreen
            {...props}
            onAnimationEnd={() => {
              // After splash, decide where to go
              if (isLoggedIn) {
                props.navigation.replace('HomeTabs');
              } else {
                props.navigation.replace('Login');
              }
            }}
          />
        )}
      </Stack.Screen>
      {/* HomeTabs is your AppTabs.tsx */}
      <Stack.Screen name="HomeTabs" component={AppTabs} />
      {/* Show Login/Signup if not logged in */}
      <Stack.Screen name="Login">
        {({ navigation }) => (
          <LoginScreen navigation={navigation} setIsLoggedIn={setIsLoggedIn} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="AppTabs" component={AppTabs} />
    </Stack.Navigator>
  );
};

export default AuthStack;

