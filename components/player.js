import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentSong,
  togglePlay,
  skipSong,
  previousSong,
} from './Redux/PlayerSlice';
import IPConfig from './IPConfig';
import Slider from '@react-native-community/slider';
import { fetchArtists } from './Redux/ArtistsSlice';
const Player = () => {
  const { baseUrl } = IPConfig();
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.player.currentSong);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const userDownloadedSongs = useSelector(
    (state) => state.user.downloadedSongs
  );

  const [sound, setSound] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false); // State to control loop functionality
  const [isShuffling, setIsShuffling] = useState(false); // State to control shuffle functionality
  const [artists, setArtists] = useState([]); // Lưu danh sách các nghệ sĩ
  const [artist, setArtist] = useState(null); // Lưu nghệ sĩ của bài hát hiện tại
  // Function to shuffle songs
  const shuffleSongs = (songs) => {
    const shuffled = [...songs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  // Load the song
  useEffect(() => {
    console.log('useEffect1');
    if (currentSong) {
      const audioUrl = `${baseUrl}/audio/${currentSong.id}`;

      const loadSong = async () => {
        if (sound) {
          await sound.stopAsync();
          await sound.unloadAsync();
        }

        try {
          const { sound: newSound, status } = await Audio.Sound.createAsync(
            { uri: audioUrl },
            { shouldPlay: isPlaying, isLooping }
          );

          setSound(newSound);
          setIsLoading(false);

          // Listen for playback status updates
          newSound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) {
              setCurrentTime(status.positionMillis / 1000);
              setDuration(status.durationMillis / 1000);

              // Chuyển bài mới khi bài hiện tại kết thúc
              if (status.didJustFinish) {
                if (isLooping) {
                  newSound.replayAsync(); // Lặp lại nếu đang ở chế độ lặp
                } else {
                  handleSkip(); // Tự động chuyển bài mới khi hết bài
                }
              }
            }
          });
        } catch (error) {
          console.error('Error loading sound:', error);
          setIsLoading(false);
        }
      };

      loadSong();

      return () => {
        if (sound) {
          sound.unloadAsync();
        }
      };
    }
  }, [currentSong, baseUrl, isLooping, handleSkip]);

  // Khi sound được tải xong, sẽ chạy 1 lần
  useEffect(() => {
    console.log('useEffect - Initial sound setup');
    if (sound && !isLoading) {
      const playPauseSound = async () => {
        try {
          if (isPlaying) {
            await sound.playAsync();
          } else {
            await sound.pauseAsync();
          }
        } catch (error) {
          console.error('Error playing or pausing sound:', error);
        }
      };

      playPauseSound();
    }
  }, [sound, isLoading]); // Chỉ chạy lại khi sound hoặc isLoading thay đổi

  // Khi chỉ có isPlaying thay đổi, sẽ kiểm soát play/pause
  useEffect(() => {
    console.log('useEffect - Toggling play/pause');
    if (sound && !isLoading) {
      const togglePlayPause = async () => {
        try {
          if (isPlaying) {
            await sound.playAsync();
          } else {
            await sound.pauseAsync();
          }
        } catch (error) {
          console.error('Error in toggling play/pause:', error);
        }
      };

      togglePlayPause();
    }
  }, [isPlaying]); // Chỉ chạy khi isPlaying thay đổi

  // load artist
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(`${baseUrl}/artists`);
        const data = await response.json();
        setArtists(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Lấy artist của bài hát hiện tại
  useEffect(() => {
    if (currentSong && artists.length > 0) {
      const foundArtist = artists.find(
        (artist) => artist.id === currentSong.artistId
      );
      setArtist(foundArtist);
    }
  }, [currentSong, artists]);

  // Handle skip song (shuffle or normal)
  const handleSkip = () => {
    console.log('skip1   ', userDownloadedSongs);
    if (isShuffling) {
      // If shuffle is on, pick a random song
      const shuffledSongs = shuffleSongs(userDownloadedSongs);
      const nextSong = shuffledSongs.find((song) => song.id !== currentSong.id); // Ensure the song is different
      dispatch(setCurrentSong(nextSong)); // Set the next shuffled song
    } else {
      dispatch(skipSong(userDownloadedSongs)); // Skip to the next song normally
    }
  };

  const handlePrevious = () => {
    if (isShuffling) {
      // If shuffle is on, pick a random previous song
      const shuffledSongs = shuffleSongs(userDownloadedSongs);
      const prevSong = shuffledSongs.find((song) => song.id !== currentSong.id);
      dispatch(setCurrentSong(prevSong));
    } else {
      dispatch(previousSong()); // Go back to the previous song normally
    }
  };

  const handlePlayPause = () => {
    dispatch(togglePlay()); // Toggle play/pause
  };

  const handleSeek = (value) => {
    if (sound) {
      sound.setPositionAsync(value * 1000); // Set position in milliseconds
    }
  };

  const toggleLoop = () => {
    setIsLooping((prevState) => !prevState); // Toggle looping state
  };

  const toggleShuffle = () => {
    setIsShuffling((prevState) => !prevState); // Toggle shuffle state
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  console.log('currentsong', currentSong);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.topBar}>
          <Image
            source={require('../assets/iconDropdown.png')}
            style={styles.icon}
          />
          <Text style={styles.time}>12:00</Text>
          <Image
            source={require('../assets/iconBaCham.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <View style={styles.albumContainer}>
          <Image source={{ uri: currentSong.image }} style={styles.albumArt} />
        </View>

        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{currentSong.title}</Text>
          <Text style={styles.songArtist}>
            {artist ? artist.name : 'Unknown Artist'}
          </Text>
        </View>

        {/* Progress Bar */}
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
            onValueChange={handleSeek} // Seek when the slider is changed
          />
          <Text style={styles.duration}>{formatTime(duration)}</Text>
        </View>

        {/* Control Buttons */}
        <View style={styles.controls}>
          {/* Shuffle Button */}
          <TouchableOpacity onPress={toggleShuffle}>
            <Image
              style={styles.buttonIcon2}
              source={
                isShuffling
                  ? require('../assets/shuffleOn.png') // Shuffle on icon
                  : require('../assets/shuffle.png') // Shuffle off icon
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePrevious}>
            <Image
              style={styles.buttonIcon2}
              source={require('../assets/skip-back-forward.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause} disabled={isLoading}>
            <Image
              source={
                isPlaying
                  ? require('../assets/stopArrow.png')
                  : require('../assets/playArrow.png')
              }
              style={styles.playButtonIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkip}>
            <Image
              style={styles.buttonIconskip}
              source={require('../assets/skip-forward.png')}
            />
          </TouchableOpacity>

          {/* Loop Button */}
          <TouchableOpacity onPress={toggleLoop}>
            <Image
              style={styles.buttonIcon2}
              source={
                isLooping
                  ? require('../assets/repeatOn.png') // Use the repeat on icon
                  : require('../assets/repeat.png') // Use the repeat off icon
              }
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const SongItem = ({ img, songName, artist, onPlay, onMore }) => {
  return (
    <View style={songStyles.container}>
      <Image style={{ width: 56, height: 56 }} source={{ uri: img }} />
      <View style={songStyles.infoContainer}>
        <Text style={songStyles.songName}>{songName}</Text>
        <Text style={songStyles.artist}>{artist}</Text>
      </View>
      <View style={songStyles.actionsContainer}>
        <TouchableOpacity onPress={onPlay} style={songStyles.iconButton}>
          <Text style={songStyles.icon}>🎵</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onMore} style={songStyles.iconButton}>
          <Text style={songStyles.icon}>⋮</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const QueueTitle = () => {
  return (
    <View style={titleStyles.container}>
      <Text style={titleStyles.text}>In Queue</Text>
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
const titleStyles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffffbf',
    lineHeight: 24,
    fontFamily: 'Inter',
  },
});
const songStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: '3%',
  },
  songName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  artist: {
    color: '#777',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  icon: {
    fontSize: 20,
    color: '#fff',
  },
});
export default Player;
