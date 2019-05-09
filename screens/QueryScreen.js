import React from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  FlatList,
  Text,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {getComments, getSingleQuery, newComment, getUserId} from '../utils/MediaAPI';
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
    newComment: "",
  };

  postNewComment = async () => {
    let token = await AsyncStorage.getItem('token');
    newComment(this.state.newComment, this.state.query.file_id, token).then(json => {
      console.log(json);
      this.props.navigation.navigate('Auth');
    })
  };

  getNewComments = () => {
    getComments(this.state.query.file_id).then(res => {
      this.setState({commentArray: res});
    });
  };

  handleCommentChange = (text) => {

    console.log(text);
    this.setState(previousState => ({
      ...previousState, newComment: text,
    }));
  };

  /*    getPostsUser = async () => {
          let token = await AsyncStorage.getItem("token");
          getUserId()
      };*/

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


              <Text style={styles.smallTextStyle}>By {user_id}</Text>

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

  input: {
    alignSelf: 'stretch',
    color: "black",
    fontSize: 15,
    padding: 8,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: 'rgba(192,192,192,0.3)',
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