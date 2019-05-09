import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';
import QueryScreen from '../screens/QueryScreen';
import UploadScreen from '../screens/UploadScreen';
import CameraScreen from '../screens/CameraScreen';

export default createAppContainer(createSwitchNavigator({
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html

      AuthLoading: AuthLoadingScreen,
      App: MainTabNavigator,
      Auth: AuthNavigator,
      Query: QueryScreen,
      Submit: UploadScreen,
      Camera: CameraScreen,
    },
    {
      initialRouteName: 'AuthLoading',
    },
));