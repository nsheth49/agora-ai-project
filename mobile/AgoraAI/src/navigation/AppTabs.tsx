import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

const Dummy = ({ name } : { name: string}) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{name} Screen</Text>
    </View>
);

const AppTabs = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen name="Home" children={() => <Dummy name="Home" />} />  
    <Tab.Screen name="Chat" children={() => <Dummy name="Chat" />} />
    <Tab.Screen name="Profile" children={() => <Dummy name="Profile" />} />
  </Tab.Navigator>
);

export default AppTabs;