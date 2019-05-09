import React from 'react';
import {Text, View, TouchableOpacity, CameraRoll} from 'react-native';
import {Camera, Permissions, Icon} from 'expo';

export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    hasCameraRollPermission: null,
  };

  async componentDidMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({onPictureSaved: this.onPictureSaved});
    }
  };

  onPictureSaved = async photo => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      throw new Error('Denied CAMERA_ROLL permissions!');
    }
    CameraRoll.saveToCameraRoll(photo.uri);
    this.props.navigation.navigate('Submit');
  };

  render() {
    const {hasCameraPermission} = this.state;
    if (hasCameraPermission === null) {
      return <View/>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
          <View style={{flex: 1}}>
            <Camera ref={ref => {
              this.camera = ref;
            }} style={{flex: 1}} type={this.state.type}>
              <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                  }}>

                <TouchableOpacity style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }} onPress={() => {
                  this.props.navigation.navigate('Submit');
                }}>
                  <Icon.Ionicons name={'md-arrow-back'} size={32}
                                 color={'white'}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                      flex: 0.2,
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      this.setState({
                        type: this.state.type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back,
                      });
                    }}>
                  <Icon.Ionicons name={'md-reverse-camera'} size={32}
                                 color={'white'}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                      this.takePicture();
                    }}
                    style={{
                      flex: 0.4,
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                    }}
                >
                  <Icon.MaterialIcons name="camera" size={70} color="white"/>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
      );
    }
  }
}


