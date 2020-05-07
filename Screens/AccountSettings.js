import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Image,
  Switch,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {api, getUser, getToken, setUser} from '../Config/api';
export default class AccountSettings extends Component {
  state = {
    cvv: '',
    ccNo: '',
    expYear: '',
    expMonth: '',
    willPay: false,
  };
  // componentDidMount = async () => {
  //   const user = await getUser();
  //   const date = new Date(user.cardExpirationDate);
  //   this.setState({
  //     cvv: "" + user.cardCVV,
  //     ccNo: "" + user.cardNumber,
  //     expYear: "" + date.getFullYear(),
  //     expMonth: "" + (date.getMonth() + 1),
  //     willPay: user.willPay
  //   });
  // };
  updateState = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  submit = async () => {
    const {_id} = await getUser();
    const response = await api.patch(
      '/payment/details/' + _id,
      {
        cvv: Number(this.state.cvv),
        ccNo: Number(this.state.ccNo),
        expYear: Number(this.state.expYear),
        expMonth: Number(this.state.expMonth),
        willPay: this.state.willPay,
      },
      {
        headers: {
          Authorization: await getToken(),
        },
      },
    );
    await setUser(response.data.user);
    Actions.home();
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.navContainer}>
          <TouchableOpacity onPress={Actions.home} style={styles.navbutton}>
            <Ionicons name="md-arrow-back" style={styles.leftButton}></Ionicons>
          </TouchableOpacity>
          <Text style={styles.title}>Payment Settings</Text>
        </View>
        <View style={styles.container}>
          <KeyboardAvoidingView style={styles.cockpit} behavior="padding">
            <Ionicons name="ios-card" style={styles.icon}></Ionicons>
            <TextInput
              value={this.state.cvv}
              onChangeText={(text) => {
                this.updateState('cvv', text);
              }}
              placeholder="CVV (On the back of the card)"
              style={styles.input}></TextInput>
            <TextInput
              value={this.state.ccNo}
              onChangeText={(text) => {
                this.updateState('ccNo', text);
              }}
              placeholder="Credit Card Number"
              style={styles.input}></TextInput>
            <TextInput
              value={this.state.expMonth}
              onChangeText={(text) => {
                this.updateState('expMonth', text);
              }}
              placeholder="Expiry Month"
              style={styles.input}></TextInput>
            <TextInput
              value={this.state.expYear}
              onChangeText={(text) => {
                this.updateState('expYear', text);
              }}
              placeholder="Expiry Year"
              style={styles.input}></TextInput>
            <View
              style={{
                flexDirection: 'row',
                width: Dimensions.get('window').width * 0.74,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '500',
                }}>
                Subscribe Automatically
              </Text>
              <Switch
                value={this.state.willPay}
                onValueChange={(value) => this.updateState('willPay', value)}
                thumbColor="red"
                tintColor="white"
                trackColor="white"></Switch>
            </View>
            <TouchableOpacity onPress={this.submit} style={styles.button}>
              <Text style={styles.buttonText}>Update Credit Card Details</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    width: '100%',
    height: Dimensions.get('window').height * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navContainer: {
    padding: 10,
    paddingTop: StatusBar.currentHeight,
    height: Dimensions.get('window').height * 0.1,
    width: '100%',
    backgroundColor: '#141414',
    flexDirection: 'row',
  },
  leftButton: {
    color: '#ffffff',
    fontSize: 30,
  },
  title: {
    fontSize: 18,
    flex: 1,
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  rightButton: {
    color: '#ffffff',
    fontSize: 30,
  },
  navbutton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    left: 0,
    backgroundColor: '#ffffff',
    top: StatusBar.currentHeight,
    height: Dimensions.get('window').height * 0.1,
    flexDirection: 'row',
    zIndex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  searchInput: {
    flex: 1,
    position: 'relative',
    bottom: 10,
  },
  closeButton: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 30,
    position: 'relative',
    bottom: 10,
  },
  movie: {
    width: '40%',
    height: 100,
    margin: 10,
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 2,
  },
  circularButton: {
    margin: 5,
    borderRadius: 100,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.12,
    borderColor: 'rgba(0,0,0,0.07)',
    borderWidth: 1,
  },
  day: {
    borderRadius: 10,
    marginRight: 15,
    height: 200,
    width: 150,
    borderWidth: 1,
    borderColor: '#000000',
  },
  days: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    padding: 10,
    height: 240,
  },
  movieCatTitle: {
    fontSize: 20,
    color: '#ffffff',
    padding: 10,
    backgroundColor: '#c91e1e',
    width: '40%',
    transform: [{skewY: '-3deg'}],
    textAlign: 'center',
    margin: 20,
    fontWeight: '900',
  },
  cockpit: {
    width: Dimensions.get('window').width * 0.85,
    height: Dimensions.get('window').height * 0.8,
    backgroundColor: '#000000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: 150,
    height: 60,
    resizeMode: 'stretch',
    marginVertical: 30,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: Dimensions.get('window').width * 0.74,
    padding: 10,
    paddingVertical: 10,
    color: '#ffffff',
    marginVertical: 5,
    borderRadius: 4,
    borderColor: '#000000',
    borderWidth: 1,
  },
  button: {
    marginVertical: 10,
    width: Dimensions.get('window').width * 0.74,
    backgroundColor: '#f21b0c',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000000',
  },
  buttonText: {
    color: '#ffffff',
  },
  simpleText: {
    color: '#ffffff',
    marginRight: 5,
  },
  signInText: {
    color: '#f21b0c',
  },
  layer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#ffffff',
    fontSize: 100,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
