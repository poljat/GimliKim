import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { AsyncStorage } from "react-native"

import {getUser,getAllQueries} from './utils/MediaAPI';


 class App extends React.Component {
  state = {
    signedIn:false,
    checkedSignIn:false,
    isLoadingComplete: false,
      items: [],
      user: null,
  };

     setUser = (user) => {
         this.setState({
             user: user


         });
         console.log(this.state);

        /* const profId = this.state.user.info.user_id;
         //hea profiilikuva ja siitä se user-objektiin
         getProfilePic(profId).then(profPic => {

             this.setState(prevState => ({
                 user: {
                     ...prevState.user,
                     profPic: profPic
                 }
             }))
         })*/

     };
     getQueries=()=>{
         getAllQueries().then(pics =>{
             this.setState({
                 items:pics})

         })
     }
   componentDidMount() {
         this.getQueries()
     if (this.state.user === null && AsyncStorage.getItem('token') !== null) {
       getUser(AsyncStorage.getItem('token')).then(response => {
         this.setUser(response);
         console.log(this.state.user)
       });
     }


   }

   _loadResourcesAsync = async () => {
     return Promise.all([
       Asset.loadAsync([
         require('./assets/images/robot-dev.png'),
         require('./assets/images/robot-prod.png'),
       ]),
       Font.loadAsync({
         // This is the font that we are using for our tab bar
         ...Icon.Ionicons.font,
         // We include SpaceMono because we use it in HomeScreen.js. Feel free
         // to remove this if you are not using it in your app
         'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
       }),
     ]);
   };

   _handleLoadingError = error => {
     // In this case, you might want to report the error to your error
     // reporting service, for example Sentry
     console.warn(error);
   };

   _handleFinishLoading = () => {
     this.setState({ isLoadingComplete: true });
   };
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'android' && <StatusBar barStyle="default" />}
          <AppNavigator screenProps={{
              setUser:this.setUser,
          user:this.state.user,
          queries:this.state.items}} />
        </View>
      );
    }
  }


}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
      margin:0,

  },
});
