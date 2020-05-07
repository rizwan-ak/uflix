import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Radio from './RadioButton';
export default class RadioButtons extends Component {
  onSelect;
  render() {
    // console.log(this.props)
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* <MaterialIcons name={this.props.title=='Quality'?'equalizer':'language'} style={{color:'rgba(0,0,0,0.5)',fontSize:30,marginLeft:10}}></MaterialIcons> */}
          <Text
            style={{
              fontSize: 20,
              color: 'rgba(255,255,255,0.5)',
              fontWeight: 'bold',
            }}>
            {this.props.title}
          </Text>
        </View>
        {this.props.data.map((element, index) => {
          return (
            <Radio
              key={'' + index}
              handler={() => {
                this.props.onChange(index);
              }}
              isSelected={this.props.value === element.value}
              value={element.value}></Radio>
          );
        })}
      </View>
    );
  }
}
