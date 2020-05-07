import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Navbar from "../Components/Navbar";
import Grid from "../Components/Grid";
import GenrePicker from "../Components/GenrePicker";
import Tabs from "../Components/Tabs";
export default class Movies extends Component {
  state = {
    movies: [],
    genre: ""
  };
  componentWillMount = () => {
    const movies = this.props.movies.filter(
      element => element.type === "Movie"
    );
    this.setState({
      movies
    });
  };
  genreHandler = value => {
    let movies = [];
    if (value !== "All") {
      movies = this.props.movies.filter(
        element =>
          element.genre.includes(value.trim()) && element.type === "Movie"
      );
    } else {
      movies = this.props.movies.filter(element => element.type === "Movie");
    }
    this.setState({
      genre: value,
      movies
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Navbar></Navbar>
        <GenrePicker
          value={this.state.genre}
          handler={this.genreHandler}
        ></GenrePicker>
        <Grid
          movies={this.state.movies}
          selectMovie={this.props.selectMovie}
        ></Grid>
        <Tabs></Tabs>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414"
  }
});
