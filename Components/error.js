import React from 'react'
import { View, Text , StyleSheet} from 'react-native'

const error = ({isValid,children,style}) => {
    return isValid?null:<Text style={[styles.text,style]}>{children}</Text>;
}
const styles = StyleSheet.create({
    text:{
        color:'red',
        fontSize:10,
        width:'90%'
    }
})
export default error
