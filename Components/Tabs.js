import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';

export default class Tabs extends Component {
  render() {
    return (
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={Actions.home} style={styles.button}>
          <Ionicons style={styles.icon} name="md-home"></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.movies} style={styles.button}>
          <Ionicons style={styles.icon} name="ios-videocam"></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.tv} style={styles.button}>
          <Ionicons style={styles.icon} name="ios-tv"></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.fav} style={styles.button}>
          <Ionicons style={styles.icon} name="ios-heart"></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.drawerOpen} style={styles.button}>
          <Ionicons style={styles.icon} name="md-menu"></Ionicons>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  tabsContainer: {
    height: 50,
    backgroundColor: '#0d0d0d',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopColor: 'rgba(0,0,0,0.2)',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#fff',
    fontSize: 24,
  },
});
