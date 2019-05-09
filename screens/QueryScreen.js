import React from 'react';
import {
    ScrollView, Image, StyleSheet, View, FlatList, Text, AsyncStorage
} from 'react-native';
import {getComments, getSingleQuery, newComment} from '../utils/MediaAPI';
import {Header, Avatar, Button, Divider} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';


import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-material-cards';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

export default class QueryScreen extends React.Component {
    static navigationOptions = {
        title: 'Query',
    };
    state = {
        query: "",
        commentArray: [],
    };

    postNewComment = async () => {
        let token = await AsyncStorage.getItem("token");
        newComment("ohh dang", 1916, token);
    };

    getNewComments = () => {
        getComments(this.state.query.file_id).then(res => {
            this.setState({commentArray: res,})
        })
    };

    componentDidMount() {
        console.log("component mount");
        const id = this.props.navigation.getParam('id');

        if (this.state.query === "") {
            getSingleQuery(id).then(res => {
                this.setState({query: res,});
                this.getNewComments();
            })
        }
    }

    render() {
        const {description, filename, title, user_id} = this.state.query;
        /*
                const {comment, comment_id, user_id} = this.state.commentArray;
        */
        const comcom = this.state.commentArray[0];

        /*
                const romcom = comcom.time_added;
        */
        const name = ((this.state.commentArray[0]) || {}).comment;

        console.log("QUERY2")
        console.log(this.state.query.file_id);


        return (
            <View styles={styles.container}>
                <Header
                    leftComponent={{
                        icon: 'gamepad', color: '#fff', onPress: () => {
                            this.props.navigation.navigate('App')
                        }
                    }}
                    centerComponent={{text: 'Home', style: {color: '#fff'}, fontSize: 34}}
                />

                <ScrollView>

                    <Card>
                        <CardImage
                            style={styles.imageStyle}
                            source={{uri: mediaUrl + filename}}
                            title=""
                        />

                        <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between', paddingTop: 20}}>

                            <CardContent styles={styles.cardTitleStyle} text={title}/>

                            <Button
                                type={"outline"}
                                buttonStyle={{width: 80}}
                                icon={{
                                    name: "thumb-up",
                                    size: 15,
                                    color: "blue"
                                }}


                            />
                        </View>

                        <Text style={styles.smallTextStyle}>By {user_id}</Text>

                        <Text style={styles.descriptionStyle}>{description}</Text>

                        <CardAction separator={true} inColumn={true}>
                            {this.state.commentArray.map((items, i) => {
                                return (
                                    <View key={i}>

                                        <CardContent style={styles.commentStyle} text={items.comment}/>
                                        {/*                                        <Button
                                            type={"outline"}
                                            buttonStyle={{width: 80}}
                                            icon={{
                                                name: "thumb-up",
                                                size: 15,
                                                color: "blue"
                                            }}
                                            title="Noice"


                                        />*/}
                                        <Divider style={{backgroundColor: '#DDC9C5'}}/>

                                    </View>

                                )
                            })}
                        </CardAction>

                    </Card>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    imageStyle: {
        borderRadius: 10,
        overflow: "hidden",
    },

    titleStyle: {
        textAlign: 'center',
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 28,
        fontWeight: "bold"

    },
    descriptionStyle: {
        paddingTop: 10,
        paddingBottom: 15,
        paddingLeft: 10,
        fontWeight: "bold"
    },
    smallTextStyle: {
        fontSize: 16,
        paddingBottom: 10,
        paddingLeft: 10,
        color: "#DDC9C5"
    },
    commentStyle: {
        padding: 5,
    },

    buttonStyle: {
        flex: 10
    },
    cardTitleStyle: {
        fontSize: 40,
        padding: 0,
    }

});

