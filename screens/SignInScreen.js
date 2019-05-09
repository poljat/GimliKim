import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Text,
    TouchableOpacity,
    TextInput,
    View,
    StyleSheet,
    AsyncStorage,
    Button, ScrollView,
} from 'react-native';
import {LinearGradient} from 'expo';
import {getUser, login} from '../utils/MediaAPI';


export default class SignInScreen extends Component {
    static navigationOptions = {
 header:null,
    };
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
            <LinearGradient
                colors={["#56b69b", "#9eb8b3", "#9c7587"]}
                style={{flex: 1}}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>

                        <Text style={styles.titleText}>GimliKim</Text>
                        <TextInput
                            name={'username'}
                            value={this.state.user.username}
                            keyboardType='email-address'
                            onChangeText={(text) => {
                                this.handleUsernameChange(text)
                            }}
                            placeholder={'username'}
                            placeholderTextColor='white'
                            style={styles.input}
                        />
                        <TextInput
                            name={'password'}
                            value={this.state.user.password}
                            onChangeText={(text) => {
                                this.handlePasswordChange(text)
                            }}
                            placeholder={'password'}
                            secureTextEntry={true}
                            placeholderTextColor='white'
                            style={styles.input}
                        />


                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onLogin.bind(this)}
                        >
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                        <Button title={'Register'} onPress={() => this.props.navigation.navigate('Register')}/>
                    </View>
                </TouchableWithoutFeedback>
            </LinearGradient>
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
    },
    titleText: {
        fontSize: 40,
        alignItems: 'center',
        justifyContent: 'center',
        color: "white",
        /*
                backgroundColor: '#254954',
        */
    },
    button: {
        alignItems: 'center',
        width: 300,
        height: 44,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        marginBottom: 10,
        padding: 8,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        color: "white",
        width: 300,
        fontSize: 20,
        height: 44,
        padding: 10,
        /*        borderWidth: 1,
                borderColor: 'white',*/
        borderRadius: 5,
        marginVertical: 10,
        backgroundColor: 'rgba(192,192,192,0.3)',
    },
});

