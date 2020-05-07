import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Dimensions,
  Image,
  KeyboardAvoidingView
} from "react-native";
import { Actions } from "react-native-router-flux";
import { api, setToken, setUser } from "../Config/api";
import * as Validation from "../Config/validation";
import Error from "../Components/error";
export default class Login extends Component {
  state = {
    email: "",
    password: "",
    emailValid: false,
    success: true
  };
  emailValid = () => {
    this.setState({
      emailValid: Validation.validateEmail(this.state.email)
    });
  };
  validate = name => {
    if (name == "email") {
      this.emailValid();
      return;
    }
  };
  handler = (name, value) => {
    this.setState(
      {
        [name]: value
      },
      () => {
        this.validate(name);
      }
    );
  };
  submit = async () => {
    const { email, password, emailValid } = this.state;
    console.log(email, password, emailValid);
    if (emailValid) {
      console.log("andar");
      await api
        .post("/user/login", { email, password })
        .then(async response => {
          console.log("andar1");
          const { success } = response.data;
          if (success) {
            console.log("andar2");
            const { currentUser, token } = response.data;
            await setToken(token);
            await setUser(currentUser);
            Actions.home();
            this.props.signIn();
          } else {
            console.log("andar3");
            this.setState({
              success
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            success: false
          });
        });
    }
  };
  render() {
    return (
      <ImageBackground
        source={require("../Images/bg.jpg")}
        style={styles.container}
      >
        <KeyboardAvoidingView style={styles.layer} behavior="height">
          <View style={styles.cockpit}>
            <Image
              source={require("../Images/uflix.png")}
              style={styles.image}
            ></Image>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
              onChangeText={text => this.handler("email", text)}
              value={this.state.email}
              keyboardType="email-address"
              placeholder="Email"
              style={styles.input}
            ></TextInput>
            <Error isValid={this.state.emailValid}>
              Email should be a valid email address
            </Error>
            <TextInput
              onChangeText={text => this.handler("password", text)}
              value={this.state.password}
              placeholder="Password"
              style={styles.input}
              secureTextEntry
            ></TextInput>
            <TouchableOpacity onPress={this.submit} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Error style={{ textAlign: "center" }} isValid={this.state.success}>
              Login Failed!
            </Error>
            <TouchableOpacity
              onPress={Actions.register}
              style={{ flexDirection: "row", paddingTop: 10 }}
            >
              <Text style={styles.simpleText}>Don't have an account?</Text>
              <Text style={styles.signInText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    resizeMode: "center"
  },
  layer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
    justifyContent: "center"
  },
  cockpit: {
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").height * 0.65,
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  image: {
    width: 150,
    height: 60,
    resizeMode: "stretch",
    marginBottom: 30
  },
  title: {
    fontSize: 28,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
    marginBottom: 20
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    width: "90%",
    padding: 5,
    paddingVertical: 10,
    color: "#ffffff",
    marginVertical: 5,
    borderRadius: 4,
    borderColor: "#000000",
    borderWidth: 1
  },
  button: {
    marginVertical: 10,
    width: "90%",
    backgroundColor: "#f21b0c",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000000"
  },
  buttonText: {
    color: "#ffffff"
  },
  simpleText: {
    color: "#ffffff",
    marginRight: 5
  },
  signInText: {
    color: "#f21b0c"
  }
});
