import React, { Component } from 'react';
import {Alert, Text, TouchableOpacity, TextInput, View, StyleSheet, AsyncStorage, Button} from 'react-native';
import {login, register, getUser, checkUser} from '../utils/MediaAPI';


export default class SignInScreen extends Component {

    state = {
        user: {
            username: '',
            password: '',
            repeatPassword:'',
            email:'',
            full_name:'',
        },

        toggleForm: true,
        validUser: true,

    };


    onRegister(evt) {
        const { username, password } = this.state.user;

        Alert.alert('Credentials', `email: ${username} + password: ${password}`);
        evt.preventDefault();
        this.handleRegisterSubmit();
    }

    handleRegisterSubmit = () => {
        register(this.state.user).then(user => {
            console.log(user);
            this.doLogin();
        });
    };

    doLogin =  () => {
        login(this.state.user.username, this.state.user.password).then(async (response) => {
            console.log(response);
            if(!response.token) {
                alert(response.message)
            }else{
                await AsyncStorage.setItem('token', response.token);
                this.props.navigation.navigate('App');
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
    handleRepeatPasswordChange = (text) => {

        console.log(text)

        this.setState(previousState => ({
            user:{
                ...previousState.user, repeatPassword: text,
            },}));
    };
    handleEmailChange = (text) => {

        console.log(text)
        this.setState(previousState => ({
            user:{
                ...previousState.user, email: text,
            },}));
    };
    handleFullNameChange = (text) => {

        console.log(text)
        this.setState(previousState => ({
            user:{
                ...previousState.user, full_name: text,
            },}));
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Hi, Welcome To</Text>
                <Text style={styles.titleText}>GimliKim</Text>
                <TextInput
                    name={'username'}
                    value={this.state.user.username}
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

                <TextInput
                    value={this.state.user.repeatPassword}
                    onChangeText={ (text)=>{this.handleRepeatPasswordChange(text)}}
                    placeholder={'repeat password'}
                    placeholderTextColor = 'white'
                    style={styles.input}
                />
                <TextInput

                    keyboardType = 'email-address'
                    value={this.state.user.email}
                    onChangeText={(text)=>{this.handleEmailChange(text)}}
                    placeholder={'email'}
                    secureTextEntry={true}
                    placeholderTextColor = 'white'
                    style={styles.input}
                />
                <TextInput

                    value={this.state.user.full_name}
                    onChangeText={(text)=>{this.handleFullNameChange(text)}}
                    placeholder={'full name'}
                    secureTextEntry={true}
                    placeholderTextColor = 'white'
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onRegister.bind(this)}
                >
                    <Text style={styles.buttonText}> Sign Up / Login </Text>
                </TouchableOpacity>
                <Button title={'Login'} onPress={()=> this.props.navigation.navigate('Login')} />

            </View>
        );
    }
}

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