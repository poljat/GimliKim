import React from 'react';
import {
  SectionList,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types'
import {Constants} from 'expo';
import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-cards';
import {SimpleAnimation} from "react-native-simple-animations";
import SignInScreen from './SignInScreen';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';


export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  logout= async()=> {
     this.props.navigation.navigate('Auth')
    this.removeData()

  }
  removeData = async () => {
    try {
     this.props.screenProps.logOut();
      await AsyncStorage.removeItem('token' );
    } catch (error) {
      // Error saving data
    }
  };
  render() {
    const {username, email, full_name, profilePic} = this.props.screenProps.user;
    const arr = this.props.screenProps.queries[0];
    const profilePicture = arr.filename;

    console.log("PROPS");
    console.log(this.props.screenProps.queries);



    return (

        <SimpleAnimation
            delay={500}
            fade
            duration={1000}
            friction={20}
            tension={5}
            distance={500}
            movementType="spring"
            direction="left">
          <ScrollView>
            <Card>
              <CardImage
                  source={{uri: mediaUrl + profilePicture}}
                  title="Looking Good"
              />

              <CardContent text={username}/>
              <CardContent text={email}/>
              <CardContent text={full_name}/>


              <CardAction
                  separator={true}
                  inColumn={false}>
                <CardButton
                    onPress={() => this.logout()}
                    title="Logout"
                    color="#FEB557"
                />
              </CardAction>
            </Card>
          </ScrollView>
        </SimpleAnimation>
    )

  }
};
ProfileScreen.propTypes = {
  logOut: PropTypes.func,
  user: PropTypes.object
};

const styles = StyleSheet.create({

  title: {
    fontSize: 40,
    alignItems: 'center',
    justifyContent: 'center',
    color: "black",

  },
});