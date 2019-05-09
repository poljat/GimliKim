import React from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage,
    Text,
    Image,
    Platform, ScrollView,
} from 'react-native';
import {getUserChats} from '../utils/MediaAPI';
import QueryBox from '../components/QueryBox';
import {SimpleAnimation} from 'react-native-simple-animations';

export default class ChatsScreen extends React.Component {
    static navigationOptions = {
        title: 'Chats',
    };

    chatArr;
    joinedArr;

    state = {
        userFiles: '',
        joinedChats: '',
    };

    getChats = async () => {
        getUserChats(this.props.screenProps.user.user_id + 'Gimli').then(res => {
            this.setState( {
              joinedChats: res,

            });
            this.joinedArr =
                <QueryBox nav={this.navigate} items={this.state.joinedChats}/>;
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
                <QueryBox nav={this.navigate} items={this.state.userFiles}/>;
        });

    };

    render() {
        if (this.state.userFiles.length <= 0 || this.state.joinedChats.length <=
            0) {
            this.getChats();
        }
        return (
            <SimpleAnimation
                delay={500}
                fade
                duration={1000}
                friction={20}
                tension={5}
                distance={500}
                movementType="spring"
                direction="left"
            >
                <ScrollView>
                    <Text style={styles.titleText}>Your chats</Text>
                    {this.chatArr}
                    <Text style={styles.titleText}>Joined chats</Text>
                    {this.joinedArr}
                </ScrollView>
            </SimpleAnimation>
        );
    }
}

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
