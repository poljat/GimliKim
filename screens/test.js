import {ScrollView, View} from "react-native";
import {Header} from "react-native-elements";
import {Card, CardAction, CardContent, CardImage} from "react-native-cards";

return  (
    <View>
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
                    source={{uri: mediaUrl + filename}}
                    title=" "

                />

                <CardContent text={title} style={{fontWeight: "bold"}}/>
                <CardContent text={description}/>



                <CardAction separator={true} inColumn={true}>
                    {this.state.commentArray.map((items, i) => {
                        return <CardContent CardAction separator={true} inColumn={true} key={i} text={items.comment}/>
                    })}
                </CardAction >

            </Card>



        </ScrollView>
    </View>

)
}
}
