import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { api, logout, getToken, getUser } from "../Config/api";
import { Actions } from "react-native-router-flux";

export default class NeedToPay extends Component {
  componentDidMount = async () => {
    const { _id } = await getUser();
    const token = await getToken();
    await api.post(
      "/user/logout",
      { user: _id },
      { headers: { Authorization: token } }
    );
    await logout();
    // this.props.signOut();
    Linking.openURL("http://uflix.world");
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    console.log("kuch nahi krna");
    return true;
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#141414"
        }}
      >
        <Image
          style={{ resizeMode: "contain", width: "80%", marginBottom: 10 }}
          source={require("../Images/uflix.png")}
        ></Image>
        <Text
          style={{
            marginBottom: 5,
            fontSize: 17,
            color: "#fff",
            width: "80%",
            textAlign: "center"
          }}
        >
          {" "}
          You have not paid your monthly dues.{" "}
        </Text>
        <TouchableOpacity
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => Linking.openURL("http://uflix.world")}
        >
          <Text
            style={{
              marginBottom: 5,
              fontSize: 17,
              color: "#fff",
              width: "80%",
              textAlign: "center"
            }}
          >
            {" "}
            Please log on to our website (http://uflix.world) to pay your dues.{" "}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
