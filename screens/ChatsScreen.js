import React from 'react';
import {View, StyleSheet, AsyncStorage, Text, Image} from 'react-native';
import {getJoinedChats, getUserChats} from '../utils/MediaAPI';

export default class ChatsScreen extends React.Component {
  static navigationOptions = {
    title: 'Chats',
  };

  chatArr = [];
  joinedArr = [];

  state = {
    userFiles: '',
    joinedChats: '',
  };

  getChats = async () => {
    let uid;
    const token = await AsyncStorage.getItem('token');
    const settings = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };

    fetch('http://media.mw.metropolia.fi/wbma/users/user', settings).
        then(res => res.json()).
        then(data => {
          uid = data.user_id;

          getUserChats(uid + "Gimli").then(res => {
            this.setState(() => {
              return {
                joinedChats: res
              }
            })
          });

        });

    /*getJoinedChats().then(res => {
      this.setState(() => {
      return {
        joinedChats: res
      }
    })});*/

    getUserChats("GimliKim").then((files) => {
      const userChats = files.filter((file) => {
        let outputFile = null;
        if (file.user_id === uid) {
          outputFile = file;
        }
        return outputFile;
      });
      this.setState((previousState) => {
        return {
          ...previousState.joinedChats,
          userFiles: userChats,
        };
      });
    });

    this.chatArr = this.state.userFiles.map(data => (
      <Text key={data.file_id} style={styles.text}>{data.title}</Text>
  ));

    this.joinedArr = this.state.joinedChats.map(data => (
        <Text key={data.file_id} style={styles.text}>{data.title}</Text>
    ));
  };

  render() {
    this.getChats();
    return (
        <View>
          <Text style={styles.titleText}>Your chats</Text>
          {this.chatArr}
          <Text style={styles.titleText}>Joined chats</Text>
          {this.joinedArr}
        </View>
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
