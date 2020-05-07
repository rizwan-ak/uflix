import React, { Component } from "react";
import { Text, View, Image } from "react-native";

export default class SplashScreen extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: "#000",
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          style={{
            width: "90%",
            resizeMode: "contain"
          }}
          source={require("../Images/change.gif")}
        ></Image>
      </View>
    );
  }
}
