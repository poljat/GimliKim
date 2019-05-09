import React from 'react';
import {AsyncStorage, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getComments, getSingleQuery, getUserId, newComment} from '../utils/MediaAPI';
import {Divider, Header} from "react-native-elements";


import {Card, CardAction, CardContent, CardImage} from 'react-native-material-cards';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

export default class QueryScreen extends React.Component {
    static navigationOptions = {
        title: 'Query',
    };
    state = {
        query: "",
        commentArray: [],
        postsUsername: "",
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

    getPostsUser = async () => {
        console.log(this.state.query.user_id);
        let token = await AsyncStorage.getItem("token");
        getUserId(this.state.query.user_id, token).then(res => {
            console.log("SUCCES");

            this.setState({postsUsername: res,})
            console.log(this.state.postsUsername);

        })

    };

    componentDidMount() {
        console.log("component mount");
        const id = this.props.navigation.getParam('id');

        if (this.state.query === "") {
            getSingleQuery(id).then(res => {
                this.setState({query: res,});
                this.getNewComments();
                this.getPostsUser();
            })
        }
    }

    render() {
        const {description, filename, title, user_id} = this.state.query;
        const postersusername = this.state.postsUsername.username;

        return (

            <View styles={styles.container}>
                <ScrollView>

                    <Header
                        containerStyle={{
                            backgroundColor: '#92bab2',
                        }}
                        leftComponent={{
                            icon: 'arrow-back', color: '#fff', onPress: () => {
                                this.props.navigation.navigate('App')
                            }
                        }}
                        centerComponent={{text: 'Event', style: {color: 'white', fontSize: 20}}}
                    />

                    <Card>
                        <CardImage
                            style={styles.imageStyle}
                            source={{uri: mediaUrl + filename}}
                            title=""
                        />

                        {/*                        <View style={{flex: 1, flexDirection: "row", flexWrap: 'wrap', justifyContent: 'space-between'}}>

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

                        </View>*/}

                        <Text style={styles.titleStyle}>{title}</Text>


                        <Text style={styles.smallTextStyle}>By {postersusername}</Text>

                        <Text style={styles.descriptionStyle}>{description}</Text>

                        <Divider style={{backgroundColor: '#DDC9C5'}}/>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={console.log("KOK")}
                        >
                            <Text style={styles.buttonText}>Join Group</Text>
                        </TouchableOpacity>

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
    },
    button: {
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

});

