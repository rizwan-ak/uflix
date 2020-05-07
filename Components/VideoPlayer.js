import React, {Component} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Slider,
  StatusBar,
  Modal,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {url} from '../Config/api';
import {Actions} from 'react-native-router-flux';
import RadioButtons from './RadioButtons';
import Orientation from 'react-native-orientation';
import Video from 'react-native-video';

export default class VideoPlayer extends Component {
  state = {
    isPlaying: false,
    isLoaded: false,
    volume: 1.0,
    position: 0,
    language: null,
    video: null,
    videoName: '',
    languageName: '',
    modalVisible: false,
    height: null,
  };
  componentWillUnmount = async () => {
    await this.video.unloadAsync();
    await this.soundObject.unloadAsync();
  };
  playBoth = async () => {
    await this.soundObject.playAsync();
    await this.video.playAsync();
  };
  pauseBoth = async () => {
    await this.soundObject.pauseAsync();
    await this.video.pauseAsync();
  };
  play = async () => {
    try {
      if (this.video && this.soundObject) {
        if (!this.state.isPlaying) {
          if (!this.state.isLoaded) {
            this.setState(
              {
                video: {
                  uri:
                    url +
                    encodeURIComponent(this.props.movie.video[0].video).replace(
                      '%2F',
                      '/',
                    ),
                },
                language: {
                  uri:
                    url +
                    encodeURIComponent(
                      this.props.movie.language[0].audio,
                    ).replace('%2F', '/'),
                },
                videoName: this.props.movie.video[0].resolution,
                languageName: this.props.movie.language[0].language,
              },
              async () => {
                await this.video.loadAsync(
                  this.state.video,
                  {isMuted: true},
                  false,
                );
                await this.soundObject
                  .loadAsync(this.state.language, {isMuted: false}, true)
                  .then(async () => {
                    await this.playBoth();
                  });
              },
            );
          } else {
            await this.playBoth();
          }
          this.setState({
            isLoaded: true,
            isPlaying: true,
          });
        } else {
          this.setState(
            {
              isPlaying: false,
            },
            async () => {
              await this.pauseBoth();
            },
          );
        }
      }
    } catch (error) {
      console.log('error aya');
    }
  };
  changeResolution = async (index) => {
    try {
      if (this.video && this.soundObject) {
        this.setState(
          {
            video: {
              uri:
                url +
                encodeURIComponent(this.props.movie.video[index].video).replace(
                  '%2F',
                  '/',
                ),
            },
            videoName: this.props.movie.video[index].resolution,
          },
          async () => {
            const status = await this.soundObject.getStatusAsync();
            if (status.isLoaded) {
              await this.pauseBoth();
            } else {
              this.setState(
                {
                  language: {
                    uri:
                      url +
                      encodeURIComponent(
                        this.props.movie.language[0].audio,
                      ).replace('%2F', '/'),
                  },
                  languageName: this.props.movie.language[0].language,
                },
                async () => {
                  await this.soundObject.loadAsync(
                    this.state.language,
                    {isMuted: false},
                    true,
                  );
                },
              );
            }
            const videoStatus = await this.video.getStatusAsync();
            if (videoStatus.isLoaded) {
              console.log('error Yahan hai');
              await this.video.unloadAsync();
            }
            await this.video
              .loadAsync(this.state.video, {isMuted: true}, true)
              .then(async () => {
                await this.playBoth();
                await this.changePosition(
                  (status.positionMillis * 100) / status.durationMillis,
                );
              });
          },
        );
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  changeLanguage = async (index) => {
    try {
      if (this.video && this.soundObject) {
        this.setState(
          {
            language: {
              uri:
                url +
                encodeURIComponent(
                  this.props.movie.language[index].audio,
                ).replace('%2F', '/'),
            },
            languageName: this.props.movie.language[index].language,
          },
          async () => {
            const status = await this.video.getStatusAsync();
            if (status.isLoaded) {
              await this.pauseBoth();
            } else {
              this.setState(
                {
                  video: {
                    uri:
                      url +
                      encodeURIComponent(
                        this.props.movie.video[0].video,
                      ).replace('%2F', '/'),
                  },
                  videoName: this.props.movie.video[0].resolution,
                },
                async () => {
                  await this.video.loadAsync(
                    this.state.video,
                    {isMuted: true},
                    false,
                  );
                },
              );
            }
            const soundStatus = await this.soundObject.getStatusAsync();
            if (soundStatus.isLoaded) {
              console.log('error Yahan hai');
              await this.soundObject.unloadAsync();
            }
            await this.soundObject
              .loadAsync(this.state.language, {isMuted: false}, true)
              .then(async () => {
                await this.playBoth();
                await this.changePosition(
                  (status.positionMillis * 100) / status.durationMillis,
                );
              })
              .catch((err) => {
                console.log('error Yahan hai catch me');
              });
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  statusUpdateHandler = async (status) => {
    const soundStatus = await this.soundObject.getStatusAsync();
    if (!status.isPlaying) {
      if (soundStatus.isLoaded) {
        await this.soundObject.pauseAsync();
      }
    } else {
      if (soundStatus.isLoaded) {
        await this.soundObject.playAsync();
      }
      if (status.positionMillis != this.state.position) {
        this.setState({
          position: (status.positionMillis * 100) / status.durationMillis,
        });
      }
    }
  };
  changePosition = async (position) => {
    if (this.video && this.soundObject) {
      this.setState(
        {
          position,
        },
        async () => {
          const status = await this.video.getStatusAsync();
          await this.soundObject.setPositionAsync(
            (position / 100) * status.durationMillis,
          );
          await this.video.setPositionAsync(
            (position / 100) * status.durationMillis,
          );
        },
      );
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}>
        <StatusBar hidden></StatusBar>
        <Modal
          animationType="none"
          transparent={true}
          style={{
            width: Dimensions.get('window').width,
          }}
          visible={this.state.modalVisible}>
          <View
            style={{
              backgroundColor: 'transparent',
              width: Dimensions.get('window').width * 0.2,
              height: Dimensions.get('window').height * 0.65,
              padding: 10,
              justifyContent: 'center',
              zIndex: 10,
              borderBottomRightRadius: 0,
              right: 45,
              position: 'absolute',
              top: 74,
            }}>
            <TouchableHighlight
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                backgroundColor: 'rgba(255,255,255,255.5)',
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
                height: 30,
                zIndex: 999999,
              }}
              onPress={() => {
                this.setState({modalVisible: false});
              }}>
              <Ionicons
                style={{
                  fontSize: 26,
                  color: '#000',
                }}
                name="ios-close"></Ionicons>
            </TouchableHighlight>
            <ScrollView
              contentContainerStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}
              showsVerticalScrollIndicator={false}>
              <RadioButtons
                title="Quality"
                data={this.props.movie.video.map((element) => {
                  return {value: element.resolution};
                })}
                onChange={this.changeResolution}
                value={this.state.videoName}></RadioButtons>
              <RadioButtons
                title="Language"
                data={this.props.movie.language.map((element) => {
                  return {value: element.language};
                })}
                onChange={this.changeLanguage}
                value={this.state.languageName}></RadioButtons>
            </ScrollView>
          </View>
        </Modal>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'transparent',
            zIndex: 10000,
            width: '100%',
            height: 80,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={async () => {
              Orientation.lockToPortrait();
              await this.video.unloadAsync();
              await this.soundObject.unloadAsync();
              Actions.pop();
            }}>
            <Ionicons
              style={{
                fontSize: 40,
                color: '#ffffff',
                marginLeft: 20,
              }}
              name="ios-arrow-round-back"
            />
          </TouchableOpacity>
        </View>
        <Video
          source={{
            uri:
              url +
              encodeURIComponent(this.props.movie.video[0].video).replace(
                '%2F',
                '/',
              ),
          }}
          rate={1.0}
          onPlaybackStatusUpdate={this.statusUpdateHandler}
          ref={(r) => (this.video = r)}
          muted={true}
          volume={0.0}
          resizeMode="cover"
          style={{
            width: '100%',
            height: Dimensions.get('window').height,
            zIndex: 1,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: Dimensions.get('window').height * 0.78,
            left: 0,
            right: 0,
            backgroundColor: 'transparent',
            zIndex: 10000,
            height: 80,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={this.play}>
            <Ionicons
              style={{
                fontSize: 40,
                color: '#ffffff',
                marginLeft: 20,
              }}
              name={!this.state.isPlaying ? 'ios-play' : 'ios-pause'}
            />
          </TouchableOpacity>
          <Slider
            step={1}
            maximumValue={100}
            maximumTrackTintColor="#ffffff"
            minimumTrackTintColor="#ffffff"
            thumbTintColor="#ffffff"
            style={{
              marginHorizontal: 20,
              flex: 1,
            }}
            onValueChange={this.changePosition}
            value={this.state.position}
          />
          <TouchableOpacity
            onPress={async () => {
              this.setState({
                modalVisible: true,
              });
            }}>
            <Ionicons
              style={{
                fontSize: 40,
                color: '#ffffff',
                marginRight: 20,
              }}
              name="ios-settings"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            top: Dimensions.get('window').width * 0.78,
            left: 0,
            right: 0,
            backgroundColor: 'transparent',
            zIndex: 10000,
            height: 80,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={this.play}>
            <Ionicons
              style={{
                fontSize: 40,
                color: '#ffffff',
                marginLeft: 20,
              }}
              name={!this.state.isPlaying ? 'ios-play' : 'ios-pause'}
            />
          </TouchableOpacity>
          <Slider
            step={1}
            maximumValue={100}
            maximumTrackTintColor="#ffffff"
            minimumTrackTintColor="#ffffff"
            thumbTintColor="#ffffff"
            style={{
              marginHorizontal: 20,
              flex: 1,
            }}
            onValueChange={this.changePosition}
            value={this.state.position}
          />
          <TouchableOpacity
            onPress={async () => {
              this.setState({
                modalVisible: true,
              });
            }}>
            <Ionicons
              style={{
                fontSize: 40,
                color: '#ffffff',
                marginRight: 20,
              }}
              name="ios-settings"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
