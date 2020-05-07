import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  Image
} from "react-native";
import { Actions } from "react-native-router-flux";
import { api, getToken, url } from "../Config/api";
import Display from "../Components/DisplaySlider";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import Tabs from "../Components/Tabs";
export default class Home extends Component {
  state = {
    isSearching: true,
    movies: []
  };
  componentDidMount = async () => {
    this.setState({
      movies: this.props.movies
    });
  };
  render() {
    let display = null;
    let movies = this.state.movies.filter((item, index) => index < 5);
    if (this.state.movies.length) {
      display = (
        <Display
          selectMovieToPlay={this.props.selectMovieToPlay}
          favouriteHandler={this.props.favouriteHandler}
          movies={movies}
        ></Display>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Navbar
          search={this.props.search}
          searchHandler={this.props.searchHandler}
        ></Navbar>
        <ScrollView contentContainerStyle={styles.container}>
          {display}
          <Text style={{ ...styles.movieCatTitle, marginTop: 20 }}>
            Recent Movies
          </Text>
          <Slider
            selectMovie={this.props.selectMovie}
            movies={this.state.movies}
          ></Slider>
          <Text style={{ ...styles.movieCatTitle, marginTop: 20 }}>
            Recent TV Shows
          </Text>
          <Slider
            selectMovie={this.props.selectMovie}
            movies={this.state.movies.filter(
              element => element.type !== "Movie"
            )}
          ></Slider>
          <Text style={{ ...styles.movieCatTitle, marginTop: 20 }}>Action</Text>
          <Slider
            selectMovie={this.props.selectMovie}
            movies={this.state.movies.filter(element =>
              element.genre.includes("Action")
            )}
          ></Slider>
          <Text style={{ ...styles.movieCatTitle, marginTop: 20 }}>Comedy</Text>
          <Slider
            selectMovie={this.props.selectMovie}
            movies={this.state.movies.filter(element =>
              element.genre.includes("Comedy")
            )}
          ></Slider>
          <Text style={{ ...styles.movieCatTitle, marginTop: 20 }}>Crime</Text>
          <Slider
            selectMovie={this.props.selectMovie}
            movies={this.state.movies.filter(element =>
              element.genre.includes("Crime")
            )}
          ></Slider>
          <Text style={{ ...styles.movieCatTitle, marginTop: 20 }}>
            Science Fiction
          </Text>
          <Slider
            selectMovie={this.props.selectMovie}
            movies={this.state.movies.filter(element =>
              element.genre.includes("Science Fiction")
            )}
          ></Slider>
        </ScrollView>
        <Tabs></Tabs>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    width: "100%",
    minHeight: Dimensions.get("window").height,
    paddingBottom: 70
  },
  title: {
    fontSize: 18,
    flex: 1,
    color: "#ffffff",
    textAlign: "center",
    textAlignVertical: "center"
  },
  rightButton: {
    color: "#ffffff",
    fontSize: 40
  },
  searchBar: {
    position: "absolute",
    width: Dimensions.get("window").width,
    left: 0,
    backgroundColor: "#ffffff",
    top: StatusBar.currentHeight,
    height: Dimensions.get("window").height * 0.1,
    flexDirection: "row",
    zIndex: 4,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  closeButton: {
    color: "rgba(0,0,0,0.4)",
    fontSize: 30,
    position: "relative",
    bottom: 10
  },
  movie: {
    width: "40%",
    height: 100,
    margin: 10,
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 2
  },
  circularButton: {
    margin: 5,
    borderRadius: 100,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.12,
    borderColor: "rgba(0,0,0,0.07)",
    borderWidth: 1
  },
  movieCatTitle: {
    fontSize: 18,
    color: "rgba(255,255,255,0.8)",
    textAlign: "left",
    margin: 20,
    fontWeight: "900",
    marginLeft: 0,
    width: "100%",
    marginBottom: 10,
    paddingLeft: 12
  }
});
