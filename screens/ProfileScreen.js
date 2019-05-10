import React from 'react';
import {
  StyleSheet,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types'
import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-cards';
import {SimpleAnimation} from "react-native-simple-animations";
import {Header} from "react-native-elements";

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';


export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
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
    const {username, email, full_name} = this.props.screenProps.user;
    const arr = this.props.screenProps.queries[0];
    let profilePicture;
    if(!this.props.screenProps.profPic){
      profilePicture = arr.filename;
    }else{
      profilePicture = this.props.screenProps.profPic.filename;
    }





    return (


        <ScrollView>
          <Header
              containerStyle={{
                backgroundColor: '#9c7587',
              }}
              centerComponent={{text: 'Profile', style: {color: 'white', fontSize: 20}}}
          />
          <SimpleAnimation
              fade
              duration={1000}
              friction={20}
              tension={5}
              distance={500}
              movementType="spring"
              direction="down">

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
          </SimpleAnimation>
        </ScrollView>

    )

  }
};
ProfileScreen.propTypes = {
  logOut: PropTypes.func,
  user: PropTypes.object,
  profPic: PropTypes.object
};

const styles = StyleSheet.create({

  title: {
    fontSize: 40,
    alignItems: 'center',
    justifyContent: 'center',
    color: "black",

  },
});