import React from 'react';
import {SectionList, Image, StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import { Constants } from 'expo';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {

    return (
        <Button title={'logout'} onPress={()=>this.props.navigation.navigate('Auth')}/>
    )

  }
};