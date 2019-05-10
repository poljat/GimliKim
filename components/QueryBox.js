import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {Card, CardAction, CardButton, CardContent, CardImage} from 'react-native-cards';
import {handleJoin} from '../utils/MediaAPI';

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
    state={
        chat:this.props.loc,
    }

    openQuery = (id) => {

    const chat = this.state.chat;
    this.props.nav(id,chat);

    };

    join = (id) => {
        const user = this.props.user;
        handleJoin(id, user).then(res => {

            this.openQuery(id)
        })
    };

    button=()=>{

        if(this.state.chat==='chats'){
            return  <CardAction
                style={styles.cardButton}
                separator={true}
                inColumn={false}>
             <Text >Joined</Text>
            </CardAction>
        }else{
            return <CardAction
            style={styles.cardButton}
            separator={true}
            inColumn={false}>
            <CardButton
                onPress={() => this.join(items.file_id)}
                title="Join Group"
                color="#FEB557"
            />
        </CardAction>
        }
    }


    render() {
        return this.props.items.slice(0).reverse().map((items, i) => (

            <TouchableNativeFeedback key={i} style={styles.view} onPress={() => this.openQuery(items.file_id)}>
                <View>
                    <Card>
                        <CardImage
                            source={{uri: mediaUrl + items.filename}}
                            description={items.description}
                        >
                            <CardContent text={items.title}/>
                            <CardContent text={items.description}/>
                        </CardImage>

                        <Text style={styles.titleStyle}>{items.title}</Text>
                        {this.button()}
                    </Card>
                </View>

            </TouchableNativeFeedback>


        ));
    }
}

QueryBox.propTypes = {
    items: PropTypes.array,
    nav: PropTypes.func,
    loc:PropTypes.string
};

export default QueryBox;