import React from 'react';
import {Keyboard, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Header, SearchBar} from 'react-native-elements';
import QueryBox from '../components/QueryBox'


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,

    };
    state = {
        search: '',
        toggle: false,
    };
    updateSearch = search => {
        this.setState({search: search});
    };


    openSearch() {
        this.setState({toggle: true});
        this.search.focus();
    }

    closeSearch() {
        this.setState({toggle: false});
        Keyboard.dismiss
    }

    navigate = (id) => {
        console.log(id)
        console.log('moikkuu')
        this.props.navigation.navigate('Query', {id: id,})
    }

    render() {

        let search;
        if (!this.state.toggle) {
            search = null

        } else {
            search =

                <SearchBar
                    ref={search => this.search = search}
                    lightTheme
                    searchIcon
                    clearIcon

                />

        }
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.closeSearch()
            }} accessible={false}>
                <View>

                    <ScrollView>
                        <Header
                            containerStyle={{
                                backgroundColor: '#92bab2',
                            }}
                            rightComponent={{icon: 'add', color: '#fff'}}
                            centerComponent={{text: 'Home', style: {color: '#fff', fontSize: 20}}}
                            leftComponent={{
                                icon: 'search', color: '#fff', onPress: () => {
                                    this.openSearch()
                                }
                            }}/>
                        {search}
                        <QueryBox nav={this.navigate} items={this.props.screenProps.queries}/>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        );

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    none: {
        display: null,
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});