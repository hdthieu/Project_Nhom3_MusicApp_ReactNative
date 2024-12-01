import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';  
import IPConfig from './IPConfig';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong } from './Redux/PlayerSlice';
import { setLikedSongs } from './Redux/UserSlice';
// SearchBar component
const SearchBar = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View style={styles.searchBar}>
      <Image source={require('../assets/kinhLup.png')} style={styles.icon} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="rgba(0, 0, 0, 0.75)"
        style={styles.input}
      />
    </View>
    <View style={{ flex: 1 }}>
      <Image source={require('../assets/iconSort.png')} style={styles.icon} />
    </View>
  </View>
);

const SongItem = ({ id, title, artist, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.songItem} onPress={() => onPress(id)}>
      <Image source={{ uri: image }} style={styles.songImage} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{title}</Text>
        <Text style={styles.songArtist}>{artist}</Text>
      </View>
      <View style={styles.actionIcons}>
        <TouchableOpacity>
          <Image
            source={require('../assets/icondownload.png')}
            style={styles.iconItem}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../assets/iconBaCham.png')}
            style={styles.iconItem}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// NavigationBar component
const NavigationBar = () => (
  <View style={styles.navigationBar}>
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => navigation.navigate('HomePlayer')}>
      <Image
        source={require('../assets/footerHome.png')}
        style={styles.iconFooter}
      />
      <Text style={styles.inactive}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => navigation.navigate('SearchScreen')}>
      <Image
        source={require('../assets/footerSearch.png')}
        style={styles.iconFooter}
      />
      <Text style={styles.inactive}>Search</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => navigation.navigate('LibraryScreen')}>
      <Image
        source={require('../assets/footerLibrary.png')}
        style={styles.iconFooter}
      />
      <Text style={styles.active}>Your Library</Text>
    </TouchableOpacity>
  </View>
);

const LikedSongPage = () => {
  const { baseUrl } = IPConfig();
  const dispatch = useDispatch();
  const likedSongs = useSelector((state) => state.user.likedSongs);
  const user = useSelector((state) => state.user.currentUser);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(`${baseUrl}/songs`);
        const data = await response.json();

        if (user?.profile?.likedSongs) {
          const likedSongsData = data.filter((song) =>
            user.profile.likedSongs.includes(song.id)
          );
          dispatch(setLikedSongs(likedSongsData)); // Cập nhật likedSongs vào Redux
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, [baseUrl, user, dispatch]);

  const handleSongPress = (songId) => {
    const selectedSong = likedSongs.find((song) => song.id === songId);
    if (selectedSong) {
      dispatch(setCurrentSong(selectedSong)); // Cập nhật bài hát hiện tại trong PlayerSlice
      navigation.navigate('MusicPlayer'); // Điều hướng đến MusicPlayer
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('LibraryScreen')}>
          <Image
            source={require('../assets/iconback.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Liked Songs</Text>
      </View>
      <Text style={styles.subheader}>{likedSongs.length} liked songs</Text>
      <SearchBar />
      <FlatList
        data={likedSongs}
        renderItem={({ item }) => (
          <SongItem
            id={item.id}
            title={item.title}
            artist={item.artist}
            image={item.image}
            onPress={handleSongPress}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backIcon: {
    width: 15,
    height: 15,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subheader: {
    paddingLeft: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 8,
    paddingHorizontal: 16,
    margin: 16,
    height: 40,
    flex: 5,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.75)',
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  songImage: {
    width: 32,
    height: 32,
    borderRadius: 5,
    marginRight: 8,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  songArtist: {
    fontSize: 12,
    color: '#FFFFFF80',
  },
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 8,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  navItem: {
    alignItems: 'center',
  },
  inactive: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.25)',
    marginTop: 4,
  },
  active: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 4,
  },
  iconFooter: {
    width: 20,
    height: 20,
    // marginLeft: 8,
  },
  iconItem: {
    width: 15,
    height: 15,
    marginLeft: 8,
  },
});

export default LikedSongPage;
