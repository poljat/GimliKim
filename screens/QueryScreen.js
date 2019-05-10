import React from 'react';
import {AsyncStorage, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert} from 'react-native';
import {getComments, getSingleQuery, getUserId, newComment} from '../utils/MediaAPI';
import {Divider, Header} from "react-native-elements";
import PropTypes from 'prop-types';

import {Card, CardAction, CardContent, CardImage} from 'react-native-material-cards';
import QueryBox from "../components/QueryBox";

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
    let token = await AsyncStorage.getItem('token');
    newComment(this.state.newComment, this.state.query.file_id, token).then(json => {
      alert(json.message);
    })
  };

  handleCommentChange = (text) => {
    this.setState(previousState => ({
      ...previousState, newComment: text,
    }));
  };

  getNewComments = () => {
    getComments(this.state.query.file_id).then(res => {
      this.setState({commentArray: res,})
    })
  };

  getPostsUser = async () => {
    let token = await AsyncStorage.getItem("token");
    getUserId(this.state.query.user_id, token).then(res => {

      this.setState({postsUsername: res,})


    })

  };

  componentDidMount() {

    const id = this.props.navigation.getParam('id');

    if (this.state.query === "") {
      getSingleQuery(id).then(res => {
        this.setState({query: res,});
        this.getNewComments();
        this.getPostsUser();
      })
    }
  }
navigate=()=>{
  const chat = this.props.screenProps.location;
  console.log(chat)
if(chat==='chats') {
  this.props.navigation.navigate('chat')
}else{
  this.props.navigation.navigate('App')
}
}
  render() {

    console.log(this.props.navigation.getParam('id'))
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
                  icon: 'arrow-back', color: '#fff', onPress: () => {this.navigate()}
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

              <TextInput
                  name={'comment'}
                  placeholder={'Write here...'}
                  value={this.state.newComment}
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(data) => {
                    this.handleCommentChange(data);
                  }}
                  placeholderTextColor='grey'
                  style={styles.input}
              />

              <TouchableOpacity
                  style={styles.button}
                  onPress={() => {this.postNewComment()}}
              >
                <Text style={styles.buttonText}>Leave a comment</Text>
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
QueryScreen.propTypes = {
  location:PropTypes.string
};

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