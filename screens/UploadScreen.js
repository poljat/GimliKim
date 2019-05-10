import React from 'react';
import {
  Text,
  View,
  Button,
  Image,
  TextInput, StyleSheet, AsyncStorage, TouchableOpacity, ScrollView,
} from 'react-native';
import {ImagePicker, Icon} from 'expo';
import {Header} from "react-native-elements/src/index";
import {Card} from "react-native-material-cards";

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
        body: JSON.stringify({file_id: fileId, tag: 'GimliKim'}),
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
        this.props.navigation.navigate('App');
      });

    });
  };

  render() {
    return (
        <View style={styles.container}>

          <Header
              containerStyle={{
                backgroundColor: '#92bab2',
              }}
              leftComponent={{
                icon: 'arrow-back', color: '#fff', onPress: () => {
                  this.props.navigation.navigate('App')
                }
              }}
              centerComponent={{text: 'Upload', style: {color: 'white', fontSize: 20}}}
          />

{/*          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('App');
          }}>
            <Icon.Ionicons name={'md-arrow-back'} size={32}
                           color={'black'}/>
            <Text style={{color: 'black'}}>Back to home</Text>
          </TouchableOpacity>*/}

          <View style={styles.buttons}>
{/*            <Button
                title="Pick a picture from you phone"
                style={styles.button}
                onPress={this._pickImage}
            />
            <Button title={'Or take a new one'}
                    style={styles.button}
                    onPress={() => {
                      this.props.navigation.navigate('Camera');
                    }}>
            </Button>*/}

            <TouchableOpacity
                style={styles.buttonUpload2}
                onPress={this._pickImage}
            >
              <Text style={styles.buttonText}>Pick a picture from you phone</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonUpload2}
                onPress={() => {this.props.navigation.navigate('Camera')}}
            >
              <Text style={styles.buttonText}>Or take a new one</Text>
            </TouchableOpacity>



          </View>

          <View style={{paddingTop: 1}}>
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

            <TouchableOpacity
                style={styles.buttonUpload}
                onPress={() => {this.handleUpload()}}
            >
              <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>
          </View>




        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 40,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
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
  input: {
    width: 300,
    fontSize: 20,
    height: 44,
    padding: 10,
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
  buttons: {
    flexDirection: 'column',
  },
  buttonUpload: {
    width: 300,
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 44,
    borderWidth: 1,
    borderColor: '#DDC9C5',
    borderRadius: 5,
    marginBottom: 10,
    padding: 8,
  },
  buttonText: {
    color: "#DDC9C5",
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonUpload2: {
    width: 300,
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 44,
    borderWidth: 1,
    borderColor: '#DDC9C5',
    borderRadius: 5,
    paddingTop: 8,
    marginTop: 4
  },
  buttonUpload3: {
    width: 300,
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 44,
    borderWidth: 1,
    borderColor: '#DDC9C5',
    borderRadius: 5,
    marginBottom: 10,
    paddingBottom: 8,
  }

});
