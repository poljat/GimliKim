import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,  TouchableWithoutFeedback, RefreshControl,
} from 'react-native';
import {Header, SearchBar} from 'react-native-elements';
import QueryBox from '../components/QueryBox';
import PropTypes from "prop-types";
import ProfileScreen from "./ProfileScreen";
import {SimpleAnimation} from "react-native-simple-animations";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,

  };
  state = {
    search: '',
    toggle: false,
    queries: this.props.screenProps.queries,
    refreshing: false,
  };

  updateSearch = search => {
    this.setState({search: search});
    this.search(search);
  };

  search = (search) => {
    const query = [];
    const queries = this.props.screenProps.queries;
    queries.map((items) => {

      const q = ((items.title).toUpperCase()).includes((search.toUpperCase()));

      if (q === true) {
        query.push(items);
      } else {
      }
      this.setState({queries: query});
    });
  };

  openSearch = () => {
    this.setState({toggle: true});
    setTimeout(this.focus, 200);
  };
  focus = () => {
    this.ref.focus();
  };
  closeSearch = () => {
    if (!this.state.search) {
      this.setState({toggle: false});
    }

  };

  navigate = (id) => {

    this.props.navigation.navigate('Query', {id: id});
  };


  componentDidMount() {
      this.props.screenProps.setLocation('home')
    if(!this.props.screenProps.user){
      this.props.navigation.navigate('Auth');
    }

  }

    render() {


    let search;
    if (!this.state.toggle) {
      search = null;

    } else {
      search =

          <SearchBar
              ref={ref => this.ref = ref}
              placeholder="Search"
              onChangeText={search => {
                this.updateSearch(search);
              }}
              value={this.state.search}
              accessible={true}
              lightTheme
              onBlur={() => this.closeSearch()}

          />;
    }
    return (

        <TouchableWithoutFeedback onPress={() => {
          this.closeSearch();
        }} accessible={false}>
          <View>

            <ScrollView >
              <Header
                  containerStyle={{
                    backgroundColor: '#92bab2',
                  }}
                  rightComponent={{icon: 'add', color: '#fff',onPress:()=>{this.props.navigation.navigate("Submit")}}}
                  centerComponent={{
                    text: 'Home',
                    style: {color: '#fff', fontSize: 20},
                  }}
                  leftComponent={{
                    icon: 'search', color: '#fff', onPress: () => {
                      this.openSearch();
                    },
                  }}/>
              {search}
              <SimpleAnimation
                  fade
                  duration={1000}
                  friction={20}
                  tension={5}
                  distance={500}
                  movementType="spring"
                  direction="down"
              >
              <QueryBox nav={this.navigate}
                        user={this.props.screenProps.user.user_id}
                        items={this.state.queries}/>
              </SimpleAnimation>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
    );

  }
}
ProfileScreen.propTypes = {
  setLocation: PropTypes.func,
    location: PropTypes.object

};
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