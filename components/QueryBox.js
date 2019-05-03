import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,Button
} from 'react-native';

import {getDescription} from "../utils/MediaAPI";

const style = {
    maxHeight: "30%",
    maxWidth: "90%",
    minHeight: "90%",
    minWidth: "90%",
    margin: "1em",
    textAlign: 'center',
    display: 'inline-block',
};


class QueryBox extends Component {


    render() {

        return this.props.item.map((items, i) => (


                <TouchableOpacity onPressonPress={()=>this.props.navigation.navigate('Query')} style={style}>
                    <Text h1>{items.title}</Text>
                    {(items.thumbnails !== undefined
                        &&
                        <Image source={{uri:'http://media.mw.metropolia.fi/wbma/uploads/' + items.thumbnails.w160}} alt={"kuva"}/>)
                    ||
                    (items.screenshot !== undefined
                        &&
                        <Image source={{uri:'http://media.mw.metropolia.fi/wbma/uploads/' + items.screenshot}} alt={"kuva"}/>)
                    ||
                    <Image source={{uri:"http://placekitten.com/400/400"}} alt={items.title}/>
                    }
                    <Text>{getDescription(items.description)}</Text>

                </TouchableOpacity>

        ));
    }
}
QueryBox.propTypes ={
    item: PropTypes.array
}

export default QueryBox;

