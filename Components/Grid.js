import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Dimensions
} from "react-native";
export default class Grid extends React.Component {
  render() {
    const { selectMovie } = this.props;
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={[...this.props.movies]}
        style={styles.days}
        contentContainerStyle={{
          // flexDirection: "row",
          // flexWrap: "wrap",
          // alignSelf: "center"
          width: "100%"
        }}
        style
        numColumns={2}
        keyExtractor={(element, index) => "" + index}
        renderItem={item => {
          return (
            <TouchableOpacity
              onPress={() => selectMovie(item.item._id)}
              style={styles.imageHolder}
              activeOpacity={0.5}
            >
              <Image source={item.item.image} style={styles.day} />
            </TouchableOpacity>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  imageHolder: {
    marginRight: 5,
    height: Dimensions.get("window").width * 0.35,
    width: Dimensions.get("window").width * 0.5,
    marginBottom: 5
  },
  day: {
    height: Dimensions.get("window").width * 0.35,
    width: Dimensions.get("window").width * 0.5,
    resizeMode: "cover"
  },
  days: {
    height: 180,
    width: "100%",
    paddingHorizontal: 10
  }
});
