import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import { Audio } from 'expo-av';

const MusicPlayer = ({ route }) => {
  const [currentSound, setCurrentSound] = useState(null);
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

    // Hủy bỏ âm thanh khi component bị huỷ
    return () => {
      if (currentSound) {
        currentSound.unloadAsync();
      }
    };
  }, []);

  const playAudio = async (songId) => {
    try {
      // URL của file âm thanh
      const audioUrl = "http://localhost:3000/audio/${songId}";

      // Nếu có âm thanh đang phát thì dừng nó
      if (currentSound) {
        await currentSound.stopAsync();
        await currentSound.unloadAsync();
      }

      // Tạo âm thanh mới từ URL và phát
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      setCurrentSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const stopAudio = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      setCurrentSound(null);
    }
  };

  const handleSongPress = () => {
    if (currentSound) { stopAudio();
     
    } else {
      playAudio(song.id);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Image
            source={require('../assets/iconDropdown.png')}
            style={styles.icon}
          />
          <Text style={styles.time}>12:00</Text>
          <Image
            source={require('../assets/iconBaCham.png')}
            style={styles.icon}
          />
        </View>

        {/* Album Art and Title */}
        <View style={styles.albumContainer}>
          <Image source={{ uri: song.image }} style={styles.albumArt} />
        </View>

        {/* Song Info */}
        <View style={styles.songInfo}>
          <View style={{ flex: 2 }}>
            <Text style={styles.songTitle}>{song.title}</Text>
            <Text style={styles.songArtist}>
              {song.artist ? song.artist.name : <Text>Unknown Artist</Text>}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Image source={require('../assets/iconTim.png')} />
            <Image source={require('../assets/icondownload.png')} />
            <Image source={require('../assets/iconshare.png')} />
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <Text style={styles.controlIcon}>⏮</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity onPress={handleSongPress}>
              <Image
                source={
                  currentSound
                    ? require('../assets/stopArrow.png') 
                    : require('../assets/playArrow.png')
                }
                style={styles.playButtonIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.controlIcon}>⏭</Text>
        </View>

        {/* Current Time and Duration */}
        <View style={styles.timeInfo}>
          <Text style={styles.currentTime}>0:25</Text>
          <Text style={styles.duration}>3:15</Text>
        </View>
      </ScrollView>
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
  time: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto',
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
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  controlIcon: {
    fontSize: 24,
    color: 'white',
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentTime: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  duration: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  playButtonIcon: {
    borderRadius: 70,
    width: 40,
    height: 40
  }
});

export default MusicPlayer;