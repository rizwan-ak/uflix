import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Navbar from '../Components/Navbar';
import Display from '../Components/Display';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {api, getToken, getUser} from '../Config/api';
import Tabs from '../Components/Tabs';
export default class InfoPage extends Component {
  state = {
    rating: 1,
    arr: [
      'md-star',
      'md-star-outline',
      'md-star-outline',
      'md-star-outline',
      'md-star-outline',
    ],
    userRating: 1,
  };
  componentDidMount = async () => {
    const {_id} = await getUser();
    console.log('id===', _id);
    await this.setRating(
      this.props.movie.ratingByUsers.find((element) => element.user_id === _id)
        .rating,
    );
    this.setState({
      userRating: this.props.movie.userRating,
    });
  };
  setRating = async (rating) => {
    let arr = [
      'md-star',
      'md-star-outline',
      'md-star-outline',
      'md-star-outline',
      'md-star-outline',
    ];
    arr = arr.fill('md-star', 0, rating);
    const {_id} = await getUser();
    const response = await api.patch(
      '/user/movies/rating/' + this.props.movie._id,
      {
        userId: _id,
        rating,
      },
      {
        headers: {
          authorization: await getToken(),
        },
      },
    );
    console.log(response.data);
    this.setState({
      rating,
      arr,
      userRating: response.data.movie.userRating,
    });
  };
  render() {
    const stars = this.state.arr.map((element, index) => {
      return (
        <TouchableOpacity
          key={index + ''}
          onPress={() => this.setRating(index + 1)}
          style={styles.starButton}>
          <Ionicons size={35} name={element} color="#deb009"></Ionicons>
        </TouchableOpacity>
      );
    });
    const {movie} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#141414'}}>
        <Navbar
          search={this.props.search}
          searchHandler={this.props.searchHandler}></Navbar>
        <Display
          selectMovieToPlay={this.props.selectMovieToPlay}
          favouriteHandler={this.props.favouriteHandler}
          movie={movie}></Display>
        <ScrollView style={{marginHorizontal: 20, paddingBottom: 70}}>
          <Text style={styles.title}>{movie.title}</Text>
          <View style={styles.inline}>
            <Text style={styles.label}>Cast:</Text>
            <Text style={styles.cast}>{movie.cast.join(', ')}</Text>
          </View>
          <View style={styles.inline}>
            <Text style={styles.label}>Genre:</Text>
            <Text style={styles.genre}>{movie.genre.join(', ')}</Text>
          </View>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.description}>{movie.description}</Text>
          <View style={[styles.inline, {marginTop: 10}]}>
            <Text style={styles.label}>As rated by other Uflix users:</Text>
            <Text style={styles.genre}>
              {Number(this.state.userRating).toFixed(2)}/5.00
            </Text>
          </View>
          <View style={{marginTop: 30}}>
            <Text style={styles.label}>Rate the movie:</Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>{stars}</View>
          </View>
        </ScrollView>
        <Tabs></Tabs>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    color: '#ffffff',
    marginVertical: 10,
    fontSize: 24,
    fontWeight: '700',
  },
  cast: {
    color: '#ffffff',
  },
  genre: {
    color: '#ffffff',
  },
  description: {
    color: '#ffffff',
  },
  inline: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 10,
  },
  starButton: {
    marginRight: 5,
  },
});
