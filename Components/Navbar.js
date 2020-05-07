import React from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Navbar extends React.Component {
  state = {
    search: '',
    width: new Animated.Value(0),
    open: false,
  };
  onPress = () => {
    Animated.timing(this.state.width, {
      toValue: this.state.open ? 0 : 130,
      duration: 500,
    }).start(() => this.setState({open: !this.state.open}));
  };
  render() {
    const {title} = this.props;
    return (
      <View style={styles.navContainer}>
        {/* <TouchableOpacity onPress={Actions.drawerOpen} style={styles.button}>
                    <Ionicons name='md-menu' style={styles.leftButton}></Ionicons>
                </TouchableOpacity>  */}
        <Image style={styles.logo} source={require('../Images/uflix.png')} />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: 10,
            paddingRight: 10,
          }}>
          <TouchableOpacity onPress={this.onPress} style={{marginRight: 30}}>
            <Ionicons
              name={this.state.open ? 'ios-close' : 'ios-search'}
              color="#fff"
              size={this.state.open ? 30 : 25}></Ionicons>
          </TouchableOpacity>
          <Animated.View style={{width: this.state.width, overflow: 'hidden'}}>
            <TextInput
              onSubmitEditing={() =>
                this.props.searchHandler(this.state.search)
              }
              onChangeText={(search) => {
                this.setState({search});
              }}
              value={this.state.search}
              placeholder="Search"
              style={styles.searchInput}
              returnKeyType="search"
              keyboardType="web-search"></TextInput>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navContainer: {
    padding: 15,
    paddingTop: StatusBar.currentHeight + 10,
    height: 90,
    width: '100%',
    backgroundColor: '#141414',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftButton: {
    color: '#ffffff',
    fontSize: 40,
  },
  searchInput: {
    width: 130,
    marginRight: 10,
    backgroundColor: '#rgba(255,255,255,0.1)',
    color: '#ffffff',
    borderColor: '#ffffff',
    borderWidth: 1,
    fontSize: 16,
    paddingLeft: 10,
    height: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: '100%',
    alignSelf: 'center',
  },
  logo: {
    marginHorizontal: 14,
    alignSelf: 'center',
    width: 70,
    height: 30,
  },
});
