
/*
Author: Niket Sheth
*/ 

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from '../navigation/AuthStack';

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <AuthStack isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </NavigationContainer>
  );
}

