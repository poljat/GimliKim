<Button title={'logout'} onPress={()=>this.props.navigation.navigate('Auth')}/>


import {Button, Text, TextInput, TouchableOpacity, View} from "react-native";

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