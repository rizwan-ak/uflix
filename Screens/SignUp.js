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
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { Actions } from "react-native-router-flux";
import { api } from "../Config/api";
import * as Validation from "../Config/validation";
import Error from "../Components/error";
export default class SignUp extends Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    confPassword: "",
    passValid: false,
    fnameValid: false,
    emailValid: false,
    lnameValid: false,
    success: true
  };
  fnameValid = () => {
    this.setState({
      fnameValid: Validation.nameValidation(this.state.fname)
    });
  };
  lnameValid = () => {
    this.setState({
      lnameValid: Validation.nameValidation(this.state.lname)
    });
  };
  emailValid = () => {
    this.setState({
      emailValid: Validation.validateEmail(this.state.email)
    });
  };
  passwordValidation = () => {
    this.setState({
      passValid: this.state.confPassword == this.state.password
    });
  };
  validate = name => {
    if (name == "fname") {
      this.fnameValid();
      return;
    } else if (name == "lname") {
      this.lnameValid();
      return;
    } else if (name == "email") {
      this.emailValid();
      return;
    } else if (name == "password" || name == "confPassword") {
      this.passwordValidation();
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
    console.log(123);
    const {
      email,
      fname,
      lname,
      password,
      passValid,
      emailValid,
      fnameValid,
      lnameValid
    } = this.state;
    if (passValid && emailValid && fnameValid && lnameValid) {
      console.log(123123123);
      api
        .post("/user/", {
          email: this.state.email,
          lname: this.state.lname,
          fname: this.state.fname,
          password: this.state.password,
          confirmPassword: this.state.confPassword
        })
        .then(response => {
          console.log(response);
          const { success } = response.data;
          if (success) {
            Actions.login("email", { email });
          } else {
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
          {/* <ScrollView> */}

          <View style={styles.cockpit}>
            <ScrollView
              style={{ flex: 1, width: "100%" }}
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                source={require("../Images/uflix.png")}
                style={styles.image}
              ></Image>
              <Text style={styles.title}>Sign Up</Text>
              <TextInput
                value={this.state.fname}
                onChangeText={text => this.handler("fname", text)}
                placeholder="First Name"
                style={styles.input}
                returnKeyType="next"
                onSubmitEditing={() => this.second.focus()}
              ></TextInput>
              <Error isValid={this.state.fnameValid}>
                First Name should only contain letters
              </Error>
              <TextInput
                value={this.state.lname}
                onChangeText={text => this.handler("lname", text)}
                ref={ref => (this.second = ref)}
                placeholder="Last Name"
                style={styles.input}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.third.focus();
                }}
              ></TextInput>
              <Error isValid={this.state.lnameValid}>
                Last Name should only contain letters
              </Error>
              <TextInput
                value={this.state.email}
                onChangeText={text => this.handler("email", text)}
                returnKeyType="next"
                keyboardType="email-address"
                placeholder="Email"
                style={styles.input}
                ref={ref => (this.third = ref)}
                onSubmitEditing={() => {
                  this.fourth.focus();
                }}
              ></TextInput>
              <Error isValid={this.state.emailValid}>
                Email should be a valid email address
              </Error>
              <TextInput
                value={this.state.password}
                onChangeText={text => this.handler("password", text)}
                returnKeyType="next"
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                ref={ref => (this.fourth = ref)}
                onSubmitEditing={() => {
                  this.fifth.focus();
                }}
              ></TextInput>
              <TextInput
                value={this.state.confPassword}
                onChangeText={text => this.handler("confPassword", text)}
                returnKeyType="send"
                placeholder="Confirm Password"
                style={styles.input}
                secureTextEntry
                ref={ref => (this.fifth = ref)}
              ></TextInput>
              <Error isValid={this.state.passValid}>
                Passwords should match
              </Error>
              <TouchableOpacity onPress={this.submit} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              <Error
                style={{ textAlign: "center" }}
                isValid={this.state.success}
              >
                Sign Up Failed!
              </Error>
              <TouchableOpacity
                onPress={Actions.login}
                style={{ flexDirection: "row", paddingVertical: 15 }}
              >
                <Text style={styles.simpleText}>Already have an account?</Text>
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* </ScrollView> */}
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
    paddingTop: StatusBar.currentHeight + 20,
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
    justifyContent: "center"
  },
  cockpit: {
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").height * 0.9,
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 10,
    alignItems: "center",
    overflow: "hidden"
  },
  image: {
    width: 150,
    height: 60,
    resizeMode: "stretch",
    marginVertical: 30
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
