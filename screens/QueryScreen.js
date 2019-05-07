import React from 'react';
import {

    ScrollView,Image,
    StyleSheet,
    View,Button,FlatList,Text
} from 'react-native';
import {getSingleQuery} from '../utils/MediaAPI';
import {Header} from "react-native-elements";

export default class QueryScreen extends React.Component {
    static navigationOptions = {
        title: 'Query',
    };
    state = {
      query:'' ,
    }
componentDidMount() {
  const id = this.props.navigation.getParam('id');
  console.log(id);
  console.log(id);
  getSingleQuery(id).then(res =>{
  console.log(res)
    console.log('something')
    this.setState({query:res,})

  })
}
    render() {
        console.log(this.state)
        return (
            <View >
                <Header
                    leftComponent={{ icon: 'back', color: '#fff', onPress:()=>{this.props.navigation.navigate('App') }}}
                    centerComponent={{ text: 'Home', style: { color: '#fff' } }}
                    />

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
   <Text>Tähän kaikki</Text>
                </ScrollView>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    }})

