import React, {Component} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {logout, getUser, api, getToken} from '../Config/api';
export default class DrawerComponent extends Component {
  render() {
    let homeButtonStyle = styles.accountSettingsOptions;
    let supportButtonStyle = styles.accountSettingsOptions;
    let demandButtonStyle = styles.accountSettingsOptions;
    let movieButtonStyle = styles.accountSettingsOptions;
    let loginButtonStyle = styles.accountSettingsOptions;
    let feedbackButtonStyle = styles.accountSettingsOptions;
    let complaintButtonStyle = styles.accountSettingsOptions;

    let homeTextStyle = styles.accountSettingsText;
    let supportTextStyle = styles.accountSettingsText;
    let demandTextStyle = styles.accountSettingsText;
    let movieTextStyle = styles.accountSettingsText;
    let loginTextStyle = styles.accountSettingsText;
    let feedbackTextStyle = styles.accountSettingsText;
    let complaintTextStyle = styles.accountSettingsText;
    switch (Actions.currentScene) {
      case '_home': {
        homeButtonStyle = {...styles.button, backgroundColor: '#641912'};
        homeTextStyle = {...styles.text, color: '#000000'};
        break;
      }
      case '_support': {
        supportButtonStyle = {...styles.button, backgroundColor: '#641912'};
        supportTextStyle = {...styles.text, color: '#000000'};
        break;
      }
      case '_demand': {
        demandButtonStyle = {...styles.button, backgroundColor: '#641912'};
        demandTextStyle = {...styles.text, color: '#000000'};
        break;
      }
      case '_movie': {
        movieButtonStyle = {...styles.button, backgroundColor: '#641912'};
        movieTextStyle = {...styles.text, color: '#000000'};
        break;
      }
      case '_feedback': {
        feedbackButtonStyle = {...styles.button, backgroundColor: '#641912'};
        feedbackTextStyle = {...styles.text, color: '#000000'};
        break;
      }
      case '_complaint': {
        complaintButtonStyle = {...styles.button, backgroundColor: '#641912'};
        complaintTextStyle = {...styles.text, color: '#000000'};
        break;
      }
      case '_login': {
        loginButtonStyle = {...styles.button, backgroundColor: '#641912'};
        loginTextStyle = {...styles.text, color: '#000000'};
        break;
      }
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageHolder}>
          <TouchableOpacity
            style={styles.closeIconHolder}
            onPress={Actions.drawerClose}>
            <Ionicons
              name="ios-close"
              style={[styles.icon, {fontSize: 40}]}></Ionicons>
          </TouchableOpacity>
          <Image
            style={styles.image}
            source={require('../Images/uflix.png')}></Image>
        </View>
        <View style={styles.accountSettings}>
          <Text style={styles.username}>{this.props.name}</Text>
          <TouchableOpacity
            onPress={async () => {
              const {_id} = await getUser();
              const token = await getToken();
              await api.post(
                '/user/logout',
                {user: _id},
                {headers: {Authorization: token}},
              );
              await logout();
              this.props.signOut();
              Actions.login();
            }}
            style={loginButtonStyle}>
            <Text style={loginTextStyle}>Signout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={Actions.support}
            style={supportButtonStyle}>
            <Text style={supportTextStyle}>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Actions.demand} style={demandButtonStyle}>
            <Text style={demandTextStyle}>Demands</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={Actions.feedback}
            style={feedbackButtonStyle}>
            <Text style={feedbackTextStyle}>Feedbacks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={Actions.complaint}
            style={complaintButtonStyle}>
            <Text style={complaintTextStyle}>Complaints</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={Actions.update}
            style={complaintButtonStyle}>
            <Text style={complaintTextStyle}>Edit Profile</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={Actions.account}
            style={complaintButtonStyle}
          >
            <Text style={complaintTextStyle}>Payment Settings</Text>
          </TouchableOpacity> */}
        </View>
        {/* <View style={styles.categories}>
          <TouchableOpacity onPress={Actions.home} style={homeButtonStyle}>
            <Text style={homeTextStyle}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Actions.movies} style={homeButtonStyle}>
            <Text style={homeTextStyle}>Movies</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Actions.tv} style={homeButtonStyle}>
            <Text style={homeTextStyle}>TV Shows</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Actions.fav} style={homeButtonStyle}>
            <Text style={homeTextStyle}>Favourites</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    paddingTop: StatusBar.currentHeight + 10,
  },
  imageHolder: {
    alignItems: 'center',
    padding: 10,
    paddingBottom: 20,
    paddingTop: 0,
    flexDirection: 'row',
    width: '100%',
  },
  image: {
    width: 70,
    height: 30,
    resizeMode: 'stretch',
  },
  button: {
    flexDirection: 'row',
    padding: 10,
  },
  iconHolder: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  icon: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 30,
  },
  text: {
    color: '#ffffff',
    textAlignVertical: 'center',
  },
  closeIconHolder: {
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  accountSettingsOptions: {
    justifyContent: 'center',
    paddingVertical: 2,
    height: 33,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  username: {
    fontSize: 17,
    color: 'rgba(255,255,255,1)',
    paddingVertical: 2,
    height: 33,
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  accountSettings: {
    paddingLeft: 20,
    paddingVertical: 15,
  },
  accountSettingsText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 17,
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  categories: {
    paddingLeft: 20,
    paddingVertical: 15,
  },
});
