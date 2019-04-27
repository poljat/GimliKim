import React from 'react';

import { createStackNavigator } from 'react-navigation';

import SignInScreen from '../screens/SignInScreen';
import RegisterScreen from '../screens/RegisterScreen';

const loginRegistrationNavigator = createStackNavigator({
    Login: SignInScreen,
    Register: RegisterScreen,
},{
    initialRouteName: "Login",
});


export default loginRegistrationNavigator;
