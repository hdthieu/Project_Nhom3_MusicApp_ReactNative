import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setCurrentSong } from './Redux/PlayerSlice'; // import action
import IPConfig from './IPConfig';

const { baseUrl } = IPConfig();

const Artists = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { artist } = route.params;
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(`${baseUrl}/songs`);
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    const fetchArtists = async () => {
      try {
        const response = await fetch(`${baseUrl}/artists`);
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchSongs();
    fetchArtists();
  }, []);

  const handleSongPress = (song) => {
    const artistData = artists.find((a) => a.id === song.artistId);
    const songWithArtist = {
      ...song,
      artist: artistData
        ? { name: artistData.name, bio: artistData.bio, img: artistData.img }
        : null,
    };
    dispatch(setCurrentSong(songWithArtist)); // Lưu bài hát vào Redux
    navigation.navigate('MusicPlayer'); // Điều hướng đến trang phát nhạc
  };

  const currentArtistId = artist.id;
  const filteredSongs = songs.filter(
    (song) => song.artistId === currentArtistId
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: artist.img }} style={styles.headerImage} />
        <View style={styles.headerContent}>
          <Icon
            name="arrow-back"
            size={24}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.artistName}>{artist.name}</Text>
          <Text style={styles.artistType}>Artist</Text>
        </View>
      </View>

      <View style={styles.listenerSection}>
        <Text style={styles.listenerText}>2.3 L monthly listeners</Text>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
        <Icon name="share" size={24} color="#fff" />
        <Icon
          name="play-arrow"
          size={24}
          color="#fff"
          style={styles.playIcon}
        />
      </View>

      <ScrollView style={styles.popularReleases}>
        <FlatList
          data={filteredSongs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.releaseItem}
              onPress={() => handleSongPress(item)}>
              <Image source={{ uri: item.image }} style={styles.albumCover} />
              <View>
                <Text style={styles.releaseTitle}>{item.title}</Text>
                <Text style={styles.releaseAlbum}>{item.album}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  header: {
    position: 'relative',
    height: 250,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerContent: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  artistName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  artistType: {
    color: '#ffffffbf',
    fontSize: 12,
    textAlign: 'center',
  },
  listenerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  listenerText: {
    color: '#ffffffbf',
    fontSize: 12,
  },
  followButton: {
    backgroundColor: '#1db954',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  popularReleases: {
    padding: 16,
  },
  releaseItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  releaseTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  releaseAlbum: {
    color: '#ffffffbf',
    fontSize: 12,
  },
  playIcon: {
    marginLeft: 8,
  },
});

export default Artists;
