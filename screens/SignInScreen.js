import React, { Component } from 'react';
import { Alert,  Text, TouchableOpacity, TextInput, View, StyleSheet, AsyncStorage,Button } from 'react-native';

import {login, register, getUser, checkUser} from '../utils/MediaAPI';
import PropTypes from 'prop-types';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
/*import {TextField, Button} from '@material-ui/core';
import {Send} from '@material-ui/icons';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import red from '@material-ui/core/colors/red';*/

/*
import {withStyles} from '@material-ui/core/styles';
*/


export default function SignInScreen() {
    return (
        <PaperProvider>
            <React.Fragment>
                <Text>PEEELELEEL</Text>
            </React.Fragment>
        </PaperProvider>
    );
}


