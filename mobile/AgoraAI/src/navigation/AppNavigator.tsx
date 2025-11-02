import React, { useState } from 'react';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // temporary toggle
  // return isLoggedIn ? <AppTabs /> : <AuthStack />;
  return isLoggedIn ? (
    <AppTabs />
  ) : (
    <AuthStack onLogin={() => setIsLoggedIn(true)} />
  );
};

export default AppNavigator;
