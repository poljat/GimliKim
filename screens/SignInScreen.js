import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Alert,  Text, TouchableOpacity, TextInput, View, StyleSheet, AsyncStorage,Button,} from 'react-native';
import {getUser, login} from '../utils/MediaAPI';


export default class SignInScreen extends Component {

    state = {
        user: {
            username: '',
            password: '',
        },

            toggleForm: true,
            validUser: true,

        };
    onLogin(evt) {
        const { username, password } = this.state.user;

        Alert.alert('Credentials', `email: ${username} + password: ${password}`);
        evt.preventDefault();
        this.doLogin();
    }
    doLogin =  () => {
        login(this.state.user.username, this.state.user.password).then(async (response) => {
            console.log(response);
            if(!response.token) {
                alert(response.message)
            }else{
                await AsyncStorage.setItem('token', response.token);
                this.props.screenProps.setUser(response.user)
                this.props.navigation.navigate('App',{data:this.state});
            }
        });
    };
    handlePasswordChange = (text) => {

  console.log(text)

        this.setState(previousState => ({
            user:{
                ...previousState.user, password: text,
            },}));
    };
    handleUsernameChange = (text) => {

        console.log(text)
        this.setState(previousState => ({
            user:{
                ...previousState.user, username: text,
            },}));
    };

    componentDidMount() {
        if (this.state.user === null && AsyncStorage.getItem('token') !== null) {
            getUser(AsyncStorage.getItem('token')).then(response => {
                this.setUser(response);
                console.log(this.state.user)
                console.log('moiieliii')
            });
        }


    }


    render() {

        return (

            <View style={styles.container}>
                <Text style={styles.titleText}>Hi, Welcome To</Text>
                <Text style={styles.titleText}>GimliKim</Text>
                <TextInput
                    name={'username'}
                    value={this.state.user.username}
                    keyboardType = 'email-address'
                    onChangeText={ (text)=>{this.handleUsernameChange(text)}}
                    placeholder={'username'}
                    placeholderTextColor = 'white'
                    style={styles.input}
                />
                <TextInput
                    name={'password'}
                    value={this.state.user.password}
                    onChangeText={(text)=>{this.handlePasswordChange(text)}}
                    placeholder={'password'}
                    secureTextEntry={true}
                    placeholderTextColor = 'white'
                    style={styles.input}
                />


                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onLogin.bind(this)}
                >
                    <Text style={styles.buttonText}> Sign Up / Login </Text>
                </TouchableOpacity>
                <Button title={'Register'} onPress={()=> this.props.navigation.navigate('Register')} />

            </View>
        );
    }
}

SignInScreen.propTypes = {
    setUser: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#273142',

    },
    titleText:{
        fontSize: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#254954',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#254954',
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 25,
        marginBottom: 10,
    },
    buttonText:{
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 200,
        fontSize: 20,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        marginVertical: 10,
        backgroundColor: '#254954',
    },
});
