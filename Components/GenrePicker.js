import React, { Component } from 'react'
import { View,Picker } from 'react-native'
import {catagories} from '../Config/api'
export default class GenrePicker extends Component {
    render() {
        const catagoriesToShow = catagories.map(element=>{
            return(
                <Picker.Item key={element} label={element} value={element}></Picker.Item>
            );
        })
        return (
            <View style={{backgroundColor:'#141414',padding:15}}>
                <Picker mode='dialog' 
                    onValueChange={(value)=>{
                        this.props.handler(value);
                    }}
                    selectedValue={this.props.value}
                    style={{
                        width:null,
                        backgroundColor:"#rgba(255,255,255,0.1)",
                        color:'#ffffff',
                        borderColor:'#ffffff',
                        borderWidth:1,
                        fontSize:16,
                        paddingLeft:10,
                        height:30
                    }}>
                    <Picker.Item  label="All" value='All'></Picker.Item>
                    {catagoriesToShow}
                </Picker>
            </View>
        )
    }
}
