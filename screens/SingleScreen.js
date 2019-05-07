import React, {Component} from 'react';
import {SectionList, Image, StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import {getOwner, getSingleMedia, getUser, getUserMedia, getUsername} from '../utils/MediaAPI';
import {Card, CardAction, CardButton, CardContent, CardImage} from "react-native-cards";

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';


class SingleScreen extends Component {

    static navigationOptions = {
        title: 'Thread',
    };

    state = {
        file: 'http://placekitten.com/200/200',
        name: "",
        bool: false,
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        getSingleMedia(id).then(pic => {
            console.log("SINGLE MOUNTED");
            console.log(pic);
                this.setState({
                    file: pic,
                });


        });
    }

    render() {
        return (
            <div>
                <Text>
                    Buncho stuff
                </Text>

{/*                <Card>
                    <CardImage
                        source={{uri: mediaUrl + this.state.file.filename}}
                        title="Looking Good"
                    />
                </Card>*/}

            </div>
        );
    }
}

export default SingleScreen;