import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    View, Button
} from 'react-native';
import {getDescription} from "../utils/MediaAPI";
import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-cards';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const styles = StyleSheet.create({
    view: {
        minHeight: 90,
        minWidth: 90,
        backgroundColor: 'purple',
        margin: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 2,
        alignItems: 'stretch'
    },
    text: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pic: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardButton: {
        flex: 1,
        justifyContent: "space-between"
    }
});


class QueryBox extends Component {
    openQuery = (id) => {
        console.log(id)
        this.props.nav(id)
    };

    render() {
        console.log('ny pijäs thoimia');
        console.log(this.props.items);
        return this.props.items.map((items, i) => (

            <TouchableNativeFeedback key={i} style={styles.view} onPress={() => this.openQuery(items.file_id)}>
                <View>
                    <Card>
                        <CardImage
                            source={{uri: mediaUrl + items.thumbnails.w160}}
                            title={items.title}
                            description={items.description}
                        >
                            <CardContent text={items.title}/>
                            <CardContent text={items.description}/>
                        </CardImage>


                        <CardAction
                            style={styles.cardButton}
                            separator={true}
                            inColumn={false}>
                            <CardButton
                                onPress={() => console.log("UPVOTE")}
                                title="Sharts"
                                color="#FEB557"
                            />

                            <CardButton
                                onPress={() => console.log("UPVOTE")}
                                title="Upvote"
                                color="#FEB557"
                            />
                        </CardAction>

                        <CardImage
                            source={{uri: mediaUrl + items.thumbnails.w160}}
                            title={items.title}
                            description={items.description}
                        >
                            <CardContent text={items.title}/>
                            <CardContent text={items.description}/>
                        </CardImage>


                        <CardAction
                            style={styles.cardButton}
                            separator={true}
                            inColumn={false}>
                            <CardButton
                                onPress={() => console.log("UPVOTE")}
                                title="Sharts"
                                color="#FEB557"
                            />

                            <CardButton
                                onPress={() => console.log("UPVOTE")}
                                title="Upvote"
                                color="#FEB557"
                            />
                        </CardAction>
                    </Card>
                </View>

            </TouchableNativeFeedback>


        ));
    }
}

QueryBox.propTypes = {
    items: PropTypes.array,
    nav: PropTypes.func
}

export default QueryBox;

