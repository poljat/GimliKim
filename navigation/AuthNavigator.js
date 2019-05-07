import React from 'react';

import { createStackNavigator } from 'react-navigation';

import SignInScreen from '../screens/SignInScreen';
import RegisterScreen from '../screens/RegisterScreen';

const loginRegistrationNavigator = createStackNavigator({
    Login: {screen:SignInScreen},
    Register: {screen:RegisterScreen},

},{
    initialRouteName: "Login",
});


export default loginRegistrationNavigator;
