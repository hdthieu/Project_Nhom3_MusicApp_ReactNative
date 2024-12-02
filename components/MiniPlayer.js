import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Slider,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDropdownMini } from './Redux/UserSlice'; // Import actions từ Redux slice
import {
  togglePlay,
  togglePlayerVisibility,
  setPlaybackPosition,
} from './Redux/PlayerSlice';
import { useNavigation } from '@react-navigation/native';
const MiniPlayer = () => {
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.player.currentSong);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currentTime = useSelector((state) => state.player.currentTime); // Thời gian hiện tại
  const navigation = useNavigation();

  const handleExpandPlayer = () => {
    // Lưu lại trạng thái và thời gian phát hiện tại khi mở rộng Player
    dispatch(setPlaybackPosition(currentTime)); // Lưu thời gian phát hiện tại
    dispatch(togglePlay(isPlaying)); // Lưu trạng thái phát hiện tại

    // Đảm bảo hiển thị Player và đóng MiniPlayer
    dispatch(toggleDropdownMini(false)); // Đóng MiniPlayer
    dispatch(togglePlayerVisibility(true)); // Hiển thị Player

    // Điều hướng tới màn hình player chính
    navigation.navigate('MusicPlayer');
  };

  const handleTogglePlayback = () => {
    dispatch(togglePlay()); // Thực hiện phát hoặc tạm dừng bài hát
  };

  return (
    <TouchableOpacity onPress={handleExpandPlayer} style={styles.miniPlayer}>
      <Image source={{ uri: currentSong?.image }} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.title}>{currentSong?.title || 'Unknown Song'}</Text>
        <Text style={styles.artist}>
          {currentSong?.artist?.name || 'Unknown Artist'}
        </Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={handleTogglePlayback}>
          <Image
            source={
              isPlaying
                ? require('../assets/stopArrow.png')
                : require('../assets/playArrow.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  miniPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#222',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  artist: {
    color: '#aaa',
    fontSize: 14,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 40,
  },
  controls: {
    marginLeft: 10,
  },
  progressBar: {
    width: 100,
    marginTop: 5,
  },
});

export default MiniPlayer;
