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

    navigate = (id) => {

        this.props.navigation.navigate('Query', {id: id});
    };

    getChats = async () => {
        getUserChats(this.props.screenProps.user.user_id + 'Gimli').then(res => {
            this.setState( {
              joinedChats: res,
            });
            if (this.state.joinedChats.length <= 0) {
                this.joinedArr =
                    <Text style={styles.empty}>Nothing here</Text>;
            } else {
                this.joinedArr =
                    <QueryBox nav={this.navigate} user={this.props.screenProps.user.user_id} items={this.state.joinedChats}/>;
                this.found=1;
            }
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
            if (this.state.userFiles.length <= 0) {
                this.chatArr =
                    <Text style={styles.empty}>It sure feels empty here...</Text>;
            } else {
                this.chatArr =
                    <QueryBox nav={this.navigate} user={this.props.screenProps.user.user_id} items={this.state.userFiles}/>;
                this.found=1;
            }
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
