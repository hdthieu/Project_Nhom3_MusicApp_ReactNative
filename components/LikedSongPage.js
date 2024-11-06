import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

const SongItem = ({ songName, artist, albumArtUrl }) => {
  return (
    <View style={styles.songItemContainer}>
      <Image
        source={{ uri: albumArtUrl || 'https://picsum.photos/id/237/200/300' }}
        style={styles.albumArt}
      />
      <View style={styles.textContainer}>
        <Text style={styles.songName}>{songName}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('../assets/check_circle.png')}
            style={styles.actionIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('../assets/baChamLikedSong.png')}
            style={styles.actionIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SearchBar = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.searchBarContainer}>
        <Image
          style={styles.searchIcon}
          source={require('../assets/kinhLup.png')}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#000000bf"
        />{' '}
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../assets/iconSort.png')} />
      </View>
    </View>
  );
};

const NavigationBar = () => {
  return (
    <View style={{ flex: 1, marginBottom: 40 }}>
      <View style={styles.footer}>
        {/* Nút Home */}
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/footerHome.png')} />
          <Text style={styles.label}>Home</Text>
        </TouchableOpacity>

        {/* Nút Explore */}
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => navigation.navigate('Explore')}>
          <Image source={require('../assets/footerSearch.png')} />
          <Text style={styles.label}>Explore</Text>
        </TouchableOpacity>

        {/* Nút Profile */}
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            style={{ color: 'white' }}
            source={require('../assets/footerLibrary.png')}
          />
          <Text style={styles.label}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LikedSongPage = ({ navigation }) => {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
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

    const fetchArtists = async () => {
      try {
        const response = await fetch('http://localhost:3000/artists');
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
    const artist = artists.find((artist) => artist.id === song.artistId);
    const songWithArtist = {
      ...song,
      artist: artist
        ? {
            name: artist.name,
            bio: artist.bio,
            img: artist.img,
          }
        : null,
    };

    // Điều hướng sang MusicPlayer và truyền songWithArtist
    navigation.navigate('MusicPlayer', { song: songWithArtist });
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../assets/iconback.png')} />
        <Text style={styles.title}>Liked Songs</Text>
      </View>
      <Text style={styles.subtitle}>120 liked songs</Text>
      <SearchBar />
      <FlatList
        data={songs}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const artist = artists.find((artist) => artist.id === item.artistId);
          const liked = item.liked === true;
          if (liked) {
            return (
              <TouchableOpacity onPress={() => handleSongPress(item)}>
                <SongItem
                  songName={item.title}
                  artist={artist ? artist.name : 'Unknown Artist'}
                  albumArtUrl={item.image}
                />
              </TouchableOpacity>
            );
          }
        }}
        keyExtractor={(item) => item.id}
      />
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  songItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 8,
    height: 48,
    width: '100%',
  },
  albumArt: {
    width: 32,
    height: 32,
    borderRadius: 5,
    marginLeft: 24,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  songName: {
    color: '#ffffffff',
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
  },
  artist: {
    color: '#ffffff80',
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionButton: {
    marginLeft: 8,
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffffbf',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 16,
    flex: 5,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 20,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    color: '#000000bf',
  },
  title: {
    color: '#fff',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'left',
    marginBottom: 4,
    marginLeft: '5%',
  },
  subtitle: {
    color: '#ffffff80',
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'black',
    borderTopWidth: 1,
    borderColor: 'grey',
  },
  label: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },
});

export default LikedSongPage;
