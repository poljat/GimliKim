import React from 'react';
import {

    ScrollView,
    StyleSheet,
    View,Button,FlatList,Text
} from 'react-native';


export default class QueryScreen extends React.Component {
    static navigationOptions = {
        title: 'Query',
    };
    state = {
        moi: this.props.screenProps,
    }

    render() {
        console.log(this.state)
        return (
            <View style={styles.container}>
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

