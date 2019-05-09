import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {Card, CardAction, CardButton, CardContent, CardImage} from 'react-native-cards';

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
    },
    titleStyle: {
        fontSize: 26,
        padding: 5,

    },
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
                            source={{uri: mediaUrl + items.thumbnails.w320}}
                            description={items.description}
                        >
                            <CardContent text={items.title}/>
                            <CardContent text={items.description}/>
                        </CardImage>

                        <Text style={styles.titleStyle}>{items.title}</Text>


                        <CardAction
                            style={styles.cardButton}
                            separator={true}
                            inColumn={false}>
                            <CardButton
                                onPress={() => console.log("UPVOTE")}
                                title="Join Group"
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

