import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Display extends Component {
  render() {
    const {movie} = this.props;
    // console.log(movie);
    return (
      <ImageBackground
        source={movie.image}
        imageStyle={styles.displayImage}
        style={styles.display}>
        <View style={styles.displayData}>
          {/* <Image style={styles.displayLogo} source={movie.artwork} /> */}
          {/* <Text style={styles.displayActors}>IMDB Rating: {movie.rating}</Text> */}
          <TouchableOpacity
            onPress={() => this.props.selectMovieToPlay(movie._id)}
            style={styles.displayButton}>
            <Ionicons
              name="md-play"
              style={{
                fontSize: 20,
                color: '#ffffff',
                marginRight: 10,
              }}></Ionicons>
            <Text style={styles.displayButtonText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.favouriteHandler(movie._id)}
            style={styles.displayButton}>
            {movie.isFav ? (
              <Ionicons
                name="md-heart"
                style={{
                  fontSize: 20,
                  color: '#ffffff',
                  marginRight: 10,
                }}></Ionicons>
            ) : (
              <Ionicons
                name="md-heart-empty"
                style={{
                  fontSize: 20,
                  color: '#ffffff',
                  marginRight: 10,
                }}></Ionicons>
            )}
            <Text style={styles.displayButtonText}>Favourite</Text>
          </TouchableOpacity>
        </View>
        {/* <Image  /> */}
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  display: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: 165,
  },
  displayImage: {
    resizeMode: 'cover',
    width: '100%',
  },
  displayData: {
    width: '45%',
    height: 165,
    zIndex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  displayLogo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  displayActors: {
    fontSize: 11,
    color: '#ffffff',
    marginVertical: 10,
  },
  displayButton: {
    backgroundColor: 'rgba(255,0,0,0.4)',
    width: 100,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 5,
  },
  displayButtonText: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
