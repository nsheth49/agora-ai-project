
import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'; 
import AIChatScreen from '../screens/AIChatScreen';
import FeedScreen from '../screens/FeedScreen'; 
import NotificationsScreen from '../screens/NotificationsScreen'; 
import ProfileScreen from '../screens/ProfileScreen'; 
import AntDesign from 'react-native-vector-icons/AntDesign';
// @ts-ignore: no type declarations for react-native-vector-icons submodules
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const Tab = createBottomTabNavigator();

const Dummy = ({ name } : { name: string}) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{name} Screen</Text>
  </View>
);

const AppTabs = () => (
  <Tab.Navigator initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        if (route.name === 'Home') {
          return <AntDesign name="home" size={size} color={color} />;
        }
        if (route.name === 'Feed') {
          return <AntDesign name="team" size={size} color={color} />;
        }
        if (route.name === 'AI Chat') {
          // Center tab, styled differently
          // return <AntDesign name="plus" size={28} color="#FFD600" style={{ backgroundColor: '#fff', borderRadius: 12, padding: 8 }} />;
          // return (
          //   <MaterialIcons
          //     name="10k"
          //     size={36}
          //     color="#FFD600"
          //     style={{
          //       backgroundColor: '#fff',
          //       borderRadius: 18,
          //       padding: 10,
          //       marginBottom: 6,
          //       alignSelf: 'center',
          //     }}
          //   />
          // );
          return <AntDesign name="plus" size={size} color={color} />;
        }
        if (route.name === 'Notifications') {
          return <AntDesign name="bells" size={size} color={color} />;
        }
        if (route.name === 'Profile') {
          return <AntDesign name="smileo" size={size} color={color} />;
        }
        return null;
      },
      tabBarShowLabel: true,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
    <Tab.Screen name="Feed" component={FeedScreen} options={{headerShown: false}} />
    <Tab.Screen name="AI Chat" component={AIChatScreen} options={{headerShown: false}} /> 
    <Tab.Screen name="Notifications" component={NotificationsScreen} options={{headerShown: false}} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
  </Tab.Navigator>
);

export default AppTabs;

// tarBarLabel: ''