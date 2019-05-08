import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput, StyleSheet, AsyncStorage,
} from 'react-native';
import {ImagePicker, Camera, Permissions} from 'expo';

export default class UploadScreen extends React.Component {
  state = {
    file: {
      title: '',
      description: '',
      filedata: null,
    },
  };

  handleTitleChange = (text) => {

    console.log(text);
    this.setState(previousState => ({
      file: {
        ...previousState.file, title: text,
      },
    }));
  };
  handleDescChange = (text) => {

    console.log(text);
    this.setState(previousState => ({
      file: {
        ...previousState.file, description: text,
      },
    }));
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState(previousState => ({
        file: {
          ...previousState.file, filedata: result.uri,
        },
      }));
    }
  };

  handleUpload = async () => {
    let token = await AsyncStorage.getItem('token');
    const fd = new FormData();
    let filename = this.state.file.filedata.split('/').pop();
    let fileId;
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    fd.append('title', this.state.file.title);
    fd.append('description', this.state.file.description);
    fd.append('file', {uri: this.state.file.filedata, name: filename, type});
    const options = {
      method: 'POST',
      body: fd,
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
    };
    fetch('http://media.mw.metropolia.fi/wbma/media', options).
        then(response => {
          return response.json();
        }).
        then(json => {
          console.log(json);
          fileId = json.file_id;
          return fileId;
        }).then(fileId => {

      console.log(fileId);
      const settings = {
        method: 'POST',
        body: JSON.stringify({ file_id: fileId, tag: "GimliKim"}),
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
      };
      console.log(settings);

      fetch('http://media.mw.metropolia.fi/wbma/tags', settings).then(res => {
        return res.json();
      }).then(json => {
        console.log(json);
      });

    });
  };

  render() {
    let {filedata} = this.state.file;
    return (
        <View style={styles.container}>

          {filedata &&
          <Image source={{uri: filedata}} style={{width: 200, height: 200}}/>}
          <Button
              title="Pick an image from camera roll"
              onPress={this._pickImage}
          />

          <TextInput
              name={'Title'}
              value={this.state.file.title}
              keyboardType='email-address'
              onChangeText={(text) => {
                this.handleTitleChange(text);
              }}
              placeholder={'Title'}
              placeholderTextColor='white'
              style={styles.input}
          />

          <TextInput
              multiline={true}
              numberOfLines={4}
              name={'Description'}
              value={this.state.file.description}
              keyboardType='email-address'
              onChangeText={(text) => {
                this.handleDescChange(text);
              }}
              placeholder={'Description'}
              placeholderTextColor='white'
              style={styles.descinput}
          />
          <Button title={'Upload'} onPress={() => this.handleUpload()}/>
        </View>
    );
  }
}

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
    color: 'white',
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
    color: 'white',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
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
  descinput: {
    width: 300,
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: 'rgba(192,192,192,0.3)',
  },
});
