import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  View,
  Text,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Entypo from 'react-native-vector-icons/Entypo';
export default class Slider extends React.Component {
  state = {
    index: 0,
  };
  moveToRight = () => {
    if (this.props.movies.length > this.state.index + 1) {
      this.setState(
        {
          index: this.state.index + 1,
        },
        () => {
          // console.log(this.state.index);
          this.slider.scrollToIndex(this.state);
        },
      );
    } else {
      this.setState(
        {
          index: this.props.movies.length - 1,
        },
        () => {
          // console.log(this.state.index);
          this.slider.scrollToIndex(this.state);
        },
      );
    }
  };
  moveToLeft = () => {
    if (this.state.index) {
      this.setState(
        {
          index: this.state.index - 1,
        },
        () => {
          console.log(this.state.index);
          this.slider.scrollToIndex(this.state);
        },
      );
    } else {
      this.setState(
        {
          index: 0,
        },
        () => {
          console.log(this.state.index);
          this.slider.scrollToIndex(this.state);
        },
      );
    }
  };
  render() {
    const {selectMovie} = this.props;
    if (this.props.movies.length) {
      return (
        <View
          style={{
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 0,
              zIndex: 100,
              backgroundColor: 'rgba(255,255,255,0)',
              height: 120,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={this.moveToLeft}>
            <Entypo
              name="chevron-small-left"
              style={{color: '#ffffff', fontSize: 32}}></Entypo>
          </TouchableOpacity>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ref={(ref) => (this.slider = ref)}
            horizontal={true}
            maxToRenderPerBatch={1}
            // onScroll={(e)=>{
            //     console.log(this.slider.state)
            // }}
            data={[...this.props.movies]}
            style={styles.days}
            keyExtractor={(element, index) => '' + index}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  onPress={() => selectMovie(item.item._id)}
                  style={styles.imageHolder}
                  activeOpacity={0.5}>
                  <Image source={item.item.image} style={styles.day} />
                </TouchableOpacity>
              );
            }}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              zIndex: 100,
              backgroundColor: 'rgba(255,255,255,0)',
              height: 120,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={this.moveToRight}>
            <Entypo
              name="chevron-small-right"
              style={{color: '#ffffff', fontSize: 32}}></Entypo>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.messageHolder}>
          <TouchableOpacity
            onPress={Actions.demand}
            style={{
              paddingVertical: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo style={styles.messageIcon} name="emoji-neutral"></Entypo>
            <Text style={styles.message}>Sorry this Category is empty</Text>
            <Text style={styles.message}>Tap here to place a demand</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  imageHolder: {
    marginHorizontal: 2.5,
    height: 120,
    width: 100,
  },
  day: {
    height: 120,
    width: 100,
    resizeMode: 'cover',
  },
  days: {
    height: 130,
    width: '85%',
    alignSelf: 'center',
  },
  messageHolder: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 3,
  },
  messageIcon: {
    fontSize: 30,
    color: 'rgba(255,255,255,0.5)',
  },
  placeDemand: {
    color: 'rgba(0,0,255,0.5)',
    paddingBottom: 4,
    borderBottomColor: 'rgba(0,0,255,0.5)',
    borderBottomWidth: 1,
  },
});
