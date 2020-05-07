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
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {api, getUser, getToken} from '../Config/api';

export default class DemandMovies extends Component {
  state = {
    title: '',
    review: '',
    name: '',
  };
  updateState = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  submit = async () => {
    const {_id} = await getUser();
    api
      .post(
        '/user/demand/' + _id,
        {review: this.state.review, titles: [this.state.title]},
        {
          headers: {
            Authorization: await getToken(),
          },
        },
      )
      .then((result) => {
        console.log(result.data);
        Actions.home();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.navContainer}>
          <TouchableOpacity onPress={Actions.home} style={styles.navbutton}>
            <Ionicons name="md-arrow-back" style={styles.leftButton}></Ionicons>
          </TouchableOpacity>
          <Text style={styles.title}>Demand Movies</Text>
        </View>
        <View style={styles.container}>
          <KeyboardAvoidingView style={styles.cockpit} behavior="padding">
            <Text style={styles.first}>
              Want to watch your favourite TV show or
            </Text>
            <Text style={styles.first}>Movie on demand?</Text>
            <Text style={styles.second}>Please send us request.</Text>
            <TextInput
              placeholder="Name"
              onChangeText={(text) => this.updateState('name', text)}
              style={styles.input}></TextInput>
            <TextInput
              placeholder="Title Suggestion"
              onChangeText={(text) => this.updateState('title', text)}
              style={styles.input}></TextInput>
            <TextInput
              multiline
              placeholder="Review"
              onChangeText={(text) => this.updateState('review', text)}
              style={{
                ...styles.input,
                height: 160,
                textAlignVertical: 'top',
              }}></TextInput>
            <TouchableOpacity onPress={this.submit} style={styles.button}>
              <Text style={styles.buttonText}>Demand Movie</Text>
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
    height: Dimensions.get('window').height,
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
    height: Dimensions.get('window').height * 0.9,
    backgroundColor: 'rgba(0,0,0,0.8)',
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
    color: '#f21b0c',
    fontSize: 100,
    alignSelf: 'center',
    marginVertical: 10,
  },
  first: {
    color: '#ffffff',
    fontSize: 18,
    width: Dimensions.get('window').width * 0.7,
    marginVertical: 5,
    textAlign: 'center',
  },
  second: {
    color: '#ffffff',
    fontSize: 18,
    width: Dimensions.get('window').width * 0.7,
    marginVertical: 5,
    marginTop: 10,
    textAlign: 'center',
  },
});
