import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import Display from "./Display";

export default class DisplaySlider extends Component {
  state = { index: 0 };
  componentDidMount = () => {
    this.start();
  };
  start = () => {
    const length = this.props.movies.length;
    const index = this.state.index != length - 1 ? this.state.index + 1 : 0;
    this.timeout = setTimeout(() => {
      this.list.scrollToIndex({
        animated: true,
        index
      });
      this.setState({
        index
      });
      this.start();
    }, 5000);
  };
  componentWillUnmount = () => {
    clearTimeout(this.timeout);
  };
  render() {
    return (
      <View style={{ width: "100%" }}>
        <FlatList
          ref={ref => (this.list = ref)}
          horizontal
          data={this.props.movies}
          keyExtractor={(item, index) => {
            return index + "";
          }}
          maxToRenderPerBatch={1}
          pagingEnabled
          style={{ width: "100%" }}
          renderItem={({ item }) => {
            return (
              <Display
                selectMovieToPlay={this.props.selectMovieToPlay}
                favouriteHandler={this.props.favouriteHandler}
                movie={item}
              ></Display>
            );
          }}
        ></FlatList>
      </View>
    );
  }
}
