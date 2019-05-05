import React from 'react';
import {Button, ScrollView, StyleSheet} from 'react-native';


export default class ChatsScreen extends React.Component {
  static navigationOptions = {
    title: 'Chats',
  };
  state={
    moi:  this.props.screenProps,
}
  render() {
    console.log(this.state)
    return (

      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <Button title={'logout'} onPress={()=>this.props.navigation.navigate('Auth')}/>
        <Button title={'logout'} onPress={()=>this.props.navigation.navigate('Auth')}/>
        <Button title={'logout'} onPress={()=>this.props.navigation.navigate('Auth')}/>
        <Button title={'logout'} onPress={()=>this.props.navigation.navigate('Auth')}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
