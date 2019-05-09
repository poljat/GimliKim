import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';


import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ChatsScreen from '../screens/ChatsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SingleScreen from '../screens/SingleScreen';


const HomeStack = createStackNavigator({
  Home: {screen:HomeScreen},
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : 'md-home'}`
          : 'md-home'
      }
    />
  ),
};

const ChatStack = createStackNavigator({
    Chats: {screen:ChatsScreen},
});

ChatStack.navigationOptions = {
    tabBarLabel: 'Chats',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-link' : 'md-chatboxes'}
        />
    ),
};

const ProfileStack = createStackNavigator({
  Profile: {screen:ProfileScreen},
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
    ChatStack,
    HomeStack,
    ProfileStack,
});
