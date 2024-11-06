import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

const MusicPlayer = ({ route }) => {
  const [currentSound, setCurrentSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(true); // State để điều khiển chế độ full screen và mini player
  const { song } = route.params;

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:3000/songs');
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();

    return () => {
      if (currentSound) {
        currentSound.unloadAsync();
      }
    };
  }, []);

  const playAudio = async () => {
    try {
      if (currentSound) {
        const status = await currentSound.getStatusAsync();
        if (status.isPlaying) {
          await currentSound.pauseAsync();
          setIsPlaying(false);
        } else {
          await currentSound.playAsync();
          setIsPlaying(true);
        }
      } else {
        const audioUrl = `http://localhost:3000/audio/${song.id}`;
        const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
        setCurrentSound(sound);

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setCurrentTime(status.positionMillis);
            setDuration(status.durationMillis);
            setIsPlaying(status.isPlaying);
          }
        });

        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const stopAudio = async () => {
    if (currentSound) {
      await currentSound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const handleSongPress = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio();
    }
  };

  const formatTime = (millis) => {
    if (!millis || millis <= 0) return '0:00';
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <View style={styles.container}>
      {isFullScreen ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Nút để thu nhỏ giao diện */}
          <TouchableOpacity onPress={toggleFullScreen} style={styles.topBar}>
            <Image source={require('../assets/iconDropdown.png')} style={styles.icon} />
            <Text style={styles.time}>12:00</Text>
            <Image source={require('../assets/iconBaCham.png')} style={styles.icon} />
          </TouchableOpacity>

          {/* Album Art và Thông tin bài hát */}
          <View style={styles.albumContainer}>
            <Image source={{ uri: song.image }} style={styles.albumArt} />
          </View>

          <View style={styles.songInfo}>
            <Text style={styles.songTitle}>{song.title}</Text>
            <Text style={styles.songArtist}>
              {song.artist ? song.artist.name : 'Unknown Artist'}
            </Text>
          </View>

          {/* Thanh tiến trình */}
          <View style={styles.progressBarContainer}>
            <Text style={styles.currentTime}>{formatTime(currentTime)}</Text>
            <Slider
              style={styles.progressBar}
              minimumValue={0}
              maximumValue={duration}
              value={currentTime}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#888888"
              thumbTintColor="#FFFFFF"
              onValueChange={(value) => {
                if (currentSound) {
                  currentSound.setPositionAsync(value);
                }
              }}
            />
            <Text style={styles.duration}>{formatTime(duration)}</Text>
          </View>

          {/* Nút điều khiển */}
          <View style={styles.controls}>
            <TouchableOpacity>
              <Image style={styles.buttonIcon2} source={require('../assets/TronBai.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.buttonIconskip} source={require('../assets/skip-back-forward.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSongPress}>
              <Image
                source={isPlaying ? require('../assets/stopArrow.png') : require('../assets/playArrow.png')}
                style={styles.playButtonIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.buttonIconskip} source={require('../assets/skip-forward.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.buttonIcon2} source={require('../assets/repeat.png')} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        // Mini Player hiển thị ở dưới cùng màn hình
        <TouchableOpacity onPress={toggleFullScreen} style={styles.miniPlayer}>
          <Image source={{ uri: song.image }} style={styles.miniAlbumArt} />
          <View style={styles.miniInfo}>
            <Text style={styles.miniSongTitle}>{song.title}</Text>
            <Text style={styles.miniSongArtist}>{song.artist ? song.artist.name : 'Unknown Artist'}</Text>
          </View>
          <TouchableOpacity onPress={handleSongPress}>
            <Image
              source={isPlaying ? require('../assets/stopArrow.png') : require('../assets/playArrow.png')}
              style={styles.miniPlayButtonIcon}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0D0D',
    flex: 1,
    padding: 24,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 32,
    backgroundColor: '#0000001f',
  },
  icon: {
    width: 15,
    height: 15,
  },
  albumContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  albumArt: {
    width: 312,
    height: 312,
    borderRadius: 16,
  },
  songInfo: {
    alignItems: 'center',
    marginVertical: 16,
  },
  songTitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 24,
    fontWeight: '700',
  },
  songArtist: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  progressBar: {
    flex: 1,
    marginHorizontal: 10,
  },
  currentTime: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  duration: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    alignItems: 'center',
  },
  playButtonIcon: {
    borderRadius: 70,
    width: 40,
    height: 40,
  },
  buttonIconskip: {
    borderRadius: 70,
    width: 30,
    height: 30,
  },
  buttonIcon2: {
    borderRadius: 70,
    width: 20,
    height: 20,
  },
  miniPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  miniAlbumArt: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  miniInfo: {
    flex: 1,
    marginLeft: 8,
  },
  miniSongTitle: {
    color: '#FFF',
    fontSize: 16,
  },
  miniSongArtist: {
    color: '#AAA',
    fontSize: 12,
  },
  miniPlayButtonIcon: {
    width: 24,
    height: 24,
  },
});

export default MusicPlayer;
