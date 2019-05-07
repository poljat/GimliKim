import React from 'react';
import {Text, Button, ScrollView, StyleSheet} from 'react-native';
import { SimpleAnimation } from 'react-native-simple-animations';



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
                    <Text>Hello, world!</Text>
                </SimpleAnimation>
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
