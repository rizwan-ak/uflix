import React, {Component} from 'react';
import {Text, View} from 'react-native';
import VideoPlayer from '../Components/VideoPlayer';
import Orientation from 'react-native-orientation';

export default class Movie extends Component {
  componentDidMount = () => {
    this.changeScreenOrientation();
  };
  changeScreenOrientation() {
    Orientation.lockToLandscapeLeft();
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#141414'}}>
        <VideoPlayer movie={this.props.movie}></VideoPlayer>
      </View>
    );
  }
}
