import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { AsyncStorage } from "react-native"

import {getUser,getAllQueries,getProfilePic} from './utils/MediaAPI';


class App extends React.Component {
    state = {
        signedIn:false,
        checkedSignIn:false,
        isLoadingComplete: false,
        items: [],
        user: null,
        profPic:null,
        location:null,
    };
setLocation=(location)=>{
    this.setState({
        location: location,
    })

    }
    setUser = (user) => {
        this.setState({
            user: user,
            signedIn: true


        });


        const profId = this.state.user.user_id;
        //hea profiilikuva ja siitä se user-objektiin
        getProfilePic(profId).then(profPic => {
            this.setState(prevState => ({
                profPic: profPic
            }))
        })

    };
    getQueries=()=>{
        getAllQueries().then(pics =>{
            this.setState({
                items:pics})

        })
    }
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                // We have data!!
                return value
            }
        } catch (error) {
            // Error retrieving data
        }
    };
    logOut=()=>{
        this.setState({
            user: null,
            signedIn: false
        })
    }
    componentDidMount() {
        this.getQueries()
        if (this.state.user === null  ) {
            this._retrieveData().then(result=>{
                getUser(result).then(response => {

                    if(response !==null){
                        this.setUser(response);
                    }
                })
            })
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
                        profPic:this.state.profPic,
                        queries:this.state.items,
                        logOut:this.logOut,
                    setLocation:this.setLocation,
                    location:this.state.location}} />
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
