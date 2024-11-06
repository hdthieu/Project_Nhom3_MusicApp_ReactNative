// App.js
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

const Artists = ({ route }) => {
  const navigation = useNavigation();
  const { artist } = route.params;
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);

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

  const playlistData = [
    {
      image: require('../assets/artistYou.png'),
      name: 'Maroon 5: Best of the best',
    },
    {
      image: require('../assets/artistYou.png'),
      name: 'This is Maroon 5',
    },
    {
      image: require('../assets/artistYou.png'),
      name: 'Maroon 5 - Top Hits',
    },
    // Add more playlists as needed
  ];
  const currentArtistId = artist.id;
  const filteredSongs = songs.filter(
    (song) => song.artistId === currentArtistId
  );
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
      <View style={styles.header}>
        <Image style={styles.headerImage} source={{ uri: artist.img }} />
        <View style={styles.headerContent}>
          <Icon name="arrow-back" size={24} color="#fff" />
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

      <ScrollView style={{ flex: 8 }} showsHorizontalScrollIndicator={false}>
        <View style={styles.popularReleases}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Popular releases</Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>See more</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            data={filteredSongs}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.releaseItem}
                  onPress={() => handleSongPress(item)}>
                  <Image source={item.image} style={styles.albumCover} />
                  <View>
                    <Text style={styles.releaseTitle}>{item.title}</Text>
                    <Text style={styles.releaseAlbum}>{item.album}</Text>
                  </View>
                  <Icon
                    name="more-vert"
                    size={24}
                    color="#fff"
                    style={styles.moreOptions}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.navBar}>
        {navItems.map((item, index) => (
          <View key={index} style={styles.navItem}>
            <Icon
              name={item.icon}
              size={24}
              color={item.active ? '#fff' : '#ffffff80'}
            />
            <Text style={[styles.navText, item.active && styles.activeNavText]}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const navItems = [
  { icon: 'home', label: 'Home' },
  { icon: 'search', label: 'Search', active: true },
  { icon: 'library-music', label: 'Your Library' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  header: {
    position: 'relative',
    height: 200,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerContent: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  artistName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
  },
  artistType: {
    color: '#ffffffbf',
    fontSize: 12,
    lineHeight: 14,
  },
  listenerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  listenerText: {
    color: '#ffffffbf',
    fontSize: 12,
  },
  followButton: {
    backgroundColor: '#ffffffbf',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  followButtonText: {
    color: '#000',
    fontSize: 16,
  },
  playIcon: {
    marginLeft: 8,
  },
  popularReleases: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flex: 2,
  },
  sectionTitle: {
    color: '#ffffffbf',
    fontSize: 24,
    fontWeight: '500',
  },
  seeMore: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
  },
  releaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  albumCover: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  releaseTitle: {
    color: '#fff',
    fontSize: 12,
  },
  releaseAlbum: {
    color: '#ffffff80',
    fontSize: 12,
  },
  moreOptions: {
    marginLeft: 'auto',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    flex: 1,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#ffffff80',
    fontSize: 10,
    marginTop: 4,
  },
  activeNavText: {
    color: '#fff',
  },
});

export default Artists;
