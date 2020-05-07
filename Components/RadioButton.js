import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default class RadioButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.handler} style={styles.container}>
        <Feather
          name="check"
          style={{
            fontSize: 25,
            color: this.props.isSelected ? '#e01624' : 'transparent',
          }}></Feather>
        {/* <View style={[styles.radio,{backgroundColor:this.props.isSelected?'blue':'transparent'}]}></View> */}
        <Text style={styles.label}>{this.props.value}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  radio: {
    borderRadius: 13,
    width: 13,
    height: 13,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  label: {
    // marginLeft:20,
    fontSize: 15,
    color: 'rgba(255,255,255,0.5)',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    // paddingLeft:25
    // justifyContent:"space-evenly"
  },
});
