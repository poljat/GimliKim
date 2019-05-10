import React from 'react';
import {ScrollView, StyleSheet, Text, View,} from 'react-native';
import {getUserChats} from '../utils/MediaAPI';
import QueryBox from '../components/QueryBox';
import {SimpleAnimation} from 'react-native-simple-animations';
import {Header} from "react-native-elements";

import PropTypes from "prop-types";

export default class ChatsScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    chatArr;
    joinedArr;

    state = {
        userFiles: '',
        joinedChats: '',
    };

    navigate = (id) => {

        this.props.navigation.navigate('Query', {id: id});
    };

    getChats = async () => {
        getUserChats(this.props.screenProps.user.user_id + 'Gimli').then(res => {
            this.setState( {
              joinedChats: res,
            });

                this.joinedArr =
                    <QueryBox loc={'chats'} nav={this.navigate} user={this.props.screenProps.user.user_id} items={this.state.joinedChats}/>;

        });

        getUserChats('GimliKim').then((files) => {
            const userChats = files.filter((file) => {
                let outputFile = null;
                if (file.user_id === this.props.screenProps.user.user_id) {
                    outputFile = file;
                }
                return outputFile;
            });
            this.setState({
                    userFiles: userChats,
            });

                this.chatArr =
                    <QueryBox loc={'chats'} nav={this.navigate} user={this.props.screenProps.user.user_id} items={this.state.userFiles}/>;


        });

    };
    componentDidMount() {
        this.props.screenProps.setLocation('chats')
    }

    render() {
        if (this.state.userFiles.length <= 0 || this.state.joinedChats.length <=
            0) {
            this.getChats();
        }
        return (
            <View>
                <ScrollView>
                <Header
                    containerStyle={{
                        backgroundColor: '#56b69b',
                    }}
                    centerComponent={{text: 'Chats', style: {color: 'white', fontSize: 20}}}
                />
            <SimpleAnimation
                fade
                duration={1000}
                friction={20}
                tension={5}
                distance={500}
                movementType="spring"
                direction="down"
            >

                    {this.chatArr}
                    {this.joinedArr}
            </SimpleAnimation>
                </ScrollView>

            </View>
        );
    }
}
ChatsScreen.propTypes = {
    setLocation: PropTypes.func,
    location: PropTypes.object

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    titleText: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,

    },
});
