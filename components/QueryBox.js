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


const styles = StyleSheet.create({
    view:{
        minHeight: 90,
        minWidth: 90,
        backgroundColor:'purple',
        margin:1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 2,
        alignItems: 'stretch'
    },
    text:{
        flex:3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pic:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});


class QueryBox extends Component {
openQuery=()=>{
    console.log('avataan')
    this.navigate
}

    render() {
        console.log('ny pijäs thoimia');
console.log(this.props.items);
        return this.props.items.map((items, i) => (
            <TouchableOpacity  key={i} style={styles.view}  onPressonPress={()=>this.openQuery()} >

                        <View style={styles.pic}>
                    <Image style={{width:80, height: 80}} source={{uri:'http://media.mw.metropolia.fi/wbma/uploads/' + items.thumbnails.w160}} />
                        </View>
                    <View style={styles.text}>
                    <Text h1>{items.title}</Text>
                    <Text>{getDescription(items.description)}</Text>
                    </View>

                </TouchableOpacity>

        ));
    }
}
QueryBox.propTypes ={
    items: PropTypes.array,
    nav:PropTypes.func
}

export default QueryBox;

