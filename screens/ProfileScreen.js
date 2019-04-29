import React from 'react';
import {SectionList, Image, StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import { Constants } from 'expo';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };
  state={
    moi: this.props.screenProps,
  }
  render() {
    console.log(this.state)
    return (
        <Button title={'logout'} onPress={()=>this.props.navigation.navigate('Auth')}/>
    )

  }
};