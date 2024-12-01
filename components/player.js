import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
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
  setPlaybackPosition,
} from './Redux/PlayerSlice';
import { toggleDropdownMini, togglePlayerVisible } from './Redux/UserSlice';
import IPConfig from './IPConfig';
import Slider from '@react-native-community/slider';
import { fetchArtists } from './Redux/ArtistsSlice';
import { setLikedSongs, setDownloadedSongs } from './Redux/UserSlice';
import { useNavigation } from '@react-navigation/native';
const Player = () => {
  const { baseUrl } = IPConfig();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.player.currentSong);
  const isPlaying = useSelector((state) => state.player.isPlaying);

  const userDownloadedSongs = useSelector((state) => {
    console.log(state.user); // Kiểm tra toàn bộ state.user
    return state.user.downloadedSongs;
  });
  const [inQueue, setInQueue] = useState(userDownloadedSongs);
  const [sound, setSound] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false); // State to control loop functionality
  const [isShuffling, setIsShuffling] = useState(false); // State to control shuffle functionality
  const [artists, setArtists] = useState([]); // Lưu danh sách các nghệ sĩ
  const [artist, setArtist] = useState(null); // Lưu nghệ sĩ của bài hát hiện tại
  const currentUser = useSelector((state) => state.user.currentUser);
  const likedSongs = useSelector((state) => {
    console.log("liked ",state.user);
    return state.user.likedSongs;
  });

  const [isLiked, setIsLiked] = useState(false);
  const userId = useSelector((state) => state.user.currentUser?.id);
  // Check if the current song is already downloaded
  const isDownloaded = userDownloadedSongs.some(
    (song) => song.id === currentSong.id
  );
  const shuffleSongs = (songs) => {
    const shuffled = [...songs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    if (currentSong) {
      // Lưu lại thời gian phát hiện tại khi chuyển đến màn hình player
      dispatch(setPlaybackPosition(currentTime));
    }
  }, [currentSong]);
  // Load the song
  useEffect(() => {
    if (currentSong) {
      const audioUrl = `${baseUrl}/audio/${currentSong.id}`;
      const loadSong = async () => {
        if (sound) {
          await sound.stopAsync();
          await sound.unloadAsync();
        }
        try {
          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: audioUrl },
            { shouldPlay: isPlaying, isLooping }
          );
          setSound(newSound);
          setIsLoading(false);

          newSound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) {
              setCurrentTime(status.positionMillis / 1000);
              setDuration(status.durationMillis / 1000);

              if (status.didJustFinish) {
                if (isLooping) {
                  newSound.replayAsync();
                } else {
                  handleSkip();
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
    if (sound && !isLoading) {
      if (isPlaying) {
        sound.playAsync();
      } else {
        sound.pauseAsync();
      }
    }
  }, [isPlaying, sound, isLoading]); // Chỉ chạy khi isPlaying thay đổi

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

  useEffect(() => {
    if (currentSong && !inQueue.some((song) => song.id === currentSong.id)) {
      setInQueue([
        {
          id: currentSong.id,
          title: currentSong.title,
          artist: currentSong.artist, // artist là một đối tượng đầy đủ
          image: currentSong.image,
        },
        ...userDownloadedSongs
          .filter((song) => song.id !== currentSong.id)
          .map((song) => ({
            id: song.id,
            title: song.title,
            artist: song.artist, // artist là đối tượng đầy đủ
            image: song.image,
          })),
      ]);
    }
  }, [currentSong, userDownloadedSongs]);

  // Skip bài hát tiếp theo
  const handleSkip = () => {
    const currentIndex = inQueue.findIndex(
      (song) => song.id === currentSong.id
    );

    if (currentIndex !== -1) {
      let nextSong;
      if (currentIndex === inQueue.length - 1) {
        // Nếu là bài cuối cùng, quay về bài đầu tiên
        nextSong = inQueue[0];
      } else {
        // Chuyển sang bài kế tiếp
        nextSong = inQueue[currentIndex + 1];
      }
      dispatch(setCurrentSong(nextSong));
      dispatch(togglePlay(true)); // Bắt đầu phát bài mới
    }
  };

  // Lui về bài hát trước
  const handlePrevious = () => {
    const currentIndex = inQueue.findIndex(
      (song) => song.id === currentSong.id
    );

    if (currentIndex !== -1) {
      let prevSong;
      if (currentIndex === 0) {
        // Nếu là bài đầu tiên, quay về bài cuối cùng
        prevSong = inQueue[inQueue.length - 1];
      } else {
        // Chuyển về bài trước
        prevSong = inQueue[currentIndex - 1];
      }
      dispatch(setCurrentSong(prevSong));
      dispatch(togglePlay(true)); // Bắt đầu phát bài mới
    }
  };

  const handlePlayPause = () => {
    dispatch(togglePlay());
  };

  const handleSeek = (value) => {
    if (sound) {
      sound.setPositionAsync(value * 1000);
    }
  };

  const toggleLoop = () => {
    setIsLooping((prevState) => !prevState);
  };

  const toggleShuffle = () => {
    setIsShuffling((prevState) => !prevState);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    setIsLiked(likedSongs.includes(currentSong.id));
  }, [likedSongs, currentSong]);

  const handleLike = async () => {
    try {
      const response = await fetch(`${baseUrl}/users/${userId}/likedSongs`, {
        method: isLiked ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songId: currentSong.id }),
      });
      const responseText = await response.text(); // Đọc phản hồi dưới dạng text
      console.log('Server Response:', responseText); // Log thông báo từ server

      if (response.ok) {
        console.log('isLiked:  ', isLiked);
        if (isLiked) {
          dispatch(
            setLikedSongs(likedSongs.filter((id) => id !== currentSong.id))
          );
        } else {
          dispatch(setLikedSongs([...likedSongs, currentSong.id]));
        }
      } else {
        console.error('Failed to update liked songs:', responseText);
      }
    } catch (error) {
      console.error('Error in handleLike:', error);
    }
  };

  const handleDownload = async () => {
    try {
      // Xác định phương thức (POST để thêm, DELETE để xóa)
      const method = isDownloaded ? 'DELETE' : 'POST';

      const response = await fetch(
        `${baseUrl}/users/${userId}/songDownloaded`,
        {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ songId: currentSong.id }),
        }
      );

      const responseText = await response.text(); // Đọc phản hồi từ server dưới dạng văn bản
      console.log('Server Response:', responseText); // Log phản hồi từ server

      if (response.ok) {
        // Nếu yêu cầu thành công
        console.log(`${isDownloaded ? 'Removed' : 'Added'} song successfully`);
        alert(responseText); // Hiển thị thông báo từ server
        // Cập nhật danh sách `songDownloaded`
        if (isDownloaded) {
          dispatch(
            setDownloadedSongs(
              downloadedSongs.filter((id) => id !== currentSong.id)
            )
          );
        } else {
          dispatch(setDownloadedSongs([...downloadedSongs, currentSong.id]));
        }
        await updateUserData(); // Cập nhật dữ liệu người dùng
      } else {
        // Nếu yêu cầu không thành công
        console.error('Failed to update downloaded songs:', responseText);
        alert(`Error: ${responseText}`); // Hiển thị thông báo lỗi từ server
      }
    } catch (error) {
      console.error('Error in handleDownload:', error); // Log lỗi chi tiết
      alert('Error in handleDownload:', error.message); // Hiển thị thông báo lỗi
    }
  };

  const updateUserData = async () => {
    const userResponse = await fetch(`${baseUrl}/users/${userId}`);
    const userData = await userResponse.json();
    setUserData(userData);
    dispatch(
      setUser({
        user: userData.user,
        downloadedSongs: userData.downloadedSongs,
      })
    );
  };
  const handleToggleDropdownMini = () => {
    dispatch(toggleDropdownMini(true)); // Mở MiniPlayer
    dispatch(togglePlayerVisible(false)); // Đóng Player
    navigation.navigate('HomePlayer');
  };

  const renderInQueue = () => (
    <View>
      <QueueTitle />
      <FlatList
        data={inQueue}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SongItem
            img={item.image}
            songName={item.title}
            artist={item.artist ? item.artist.name : 'Unknown Artist'}
            onPlay={() => handlePlayFromQueue(item)}
          />
        )}
      />
    </View>
  );

  // Hàm xử lý khi phát bài hát từ hàng chờ
  const handlePlayFromQueue = (song) => {
    dispatch(setCurrentSong(song)); // Đặt bài hát được chọn làm currentSong
    dispatch(togglePlay(true)); // Đảm bảo bài hát sẽ phát
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.topBar}>
          <TouchableOpacity onPress={handleToggleDropdownMini}>
            <Image
              source={require('../assets/iconDropdown.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
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
          <View style={{ flex: 3 }}>
            <Text style={styles.songTitle}>{currentSong.title}</Text>
            <Text style={styles.songArtist}>
              {artist ? artist.name : 'Unknown Artist'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
            <TouchableOpacity onPress={handleLike}>
              <Image
                style={styles.iconPlayer}
                source={
                  isLiked
                    ? require('../assets/favoriteActive.png') // Hình active
                    : require('../assets/favorite.png') // Hình bình thường
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDownload}
              style={{ marginLeft: '7%' }}>
              <Image
                style={styles.iconPlayer}
                source={
                  userDownloadedSongs.some((song) => song.id === currentSong.id)
                    ? require('../assets/download-for-offline.png')
                    : require('../assets/noDownload.png')
                }
              />
            </TouchableOpacity>
          </View>
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
        {renderInQueue()}
      </ScrollView>
    </View>
  );
};

const SongItem = ({ img, songName, artist, onPlay }) => {
  return (
    <TouchableOpacity onPress={onPlay} style={songStyles.container}>
      <Image style={{ width: 56, height: 56 }} source={{ uri: img }} />
      <View style={songStyles.infoContainer}>
        <Text style={songStyles.songName}>{songName}</Text>
        <Text style={songStyles.artist}>{artist}</Text>
      </View>
      <View style={songStyles.actionsContainer}>
        <Text style={songStyles.icon}>🎵</Text>
      </View>
    </TouchableOpacity>
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
    flexDirection: 'row',
    flex: 1,
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
  iconPlayer: {
    width: 20,
    height: 18,
    borderRadius: 30,
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
