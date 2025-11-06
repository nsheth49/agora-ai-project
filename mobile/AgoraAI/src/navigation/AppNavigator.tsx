// import React, { useState } from 'react';
// import AuthStack from './AuthStack';
// import AppTabs from './AppTabs';

// const AppNavigator = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // temporary toggle
//   // return isLoggedIn ? <AppTabs /> : <AuthStack />;
//   return isLoggedIn ? (
//     <AppTabs />
//   ) : (
//     <AuthStack onLogin={() => setIsLoggedIn(true)} />
//   );
// };

// export default AppNavigator;

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from '../navigation/AuthStack';
import AppTabs from '../navigation/AppTabs';

const RootStack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <RootStack.Screen name="AppTabs">
            {() => <AppTabs />}
          </RootStack.Screen>
        ) : (
          <RootStack.Screen name="AuthStack">
            {() => <AuthStack setIsLoggedIn={setIsLoggedIn} />}
          </RootStack.Screen>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
