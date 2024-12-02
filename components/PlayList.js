import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

const PlaylistItem = ({ playlistName, description, imageUrl }) => (
  <View style={styles.playlistItemContainer}>
    <Image source={{ uri: imageUrl }} style={styles.playlistImage} />
    <Text style={styles.playlistName}>{playlistName}</Text>
    <Text style={styles.playlistDescription}>{description}</Text>
  </View>
);

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
      <View style={{ flex: 1, alignItems: 'center', top: '15%' }}>
        <Image source={require('../assets/add.png')} />
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

const Playlists = () => {
  const playlists = [
    {
      id: '1',
      playlistName: 'Maroon 5 Songs',
      description: 'Playlist • Myself',
      imageUrl: 'https://placeholder.pics/svg/148',
    },
    {
      id: '2',
      playlistName: 'Phonk Madness',
      description: 'Playlist',
      imageUrl: 'https://placeholder.pics/svg/148',
    },
    {
      id: '3',
      playlistName: 'Gryffin Collections',
      description: 'Playlist • Myself',
      imageUrl: 'https://placeholder.pics/svg/148',
    },
    {
      id: '4',
      playlistName: 'John Wick Chapter 4',
      description: 'Album',
      imageUrl: 'https://placeholder.pics/svg/148',
    },
    {
      id: '3',
      playlistName: 'Gryffin Collections',
      description: 'Playlist • Myself',
      imageUrl: 'https://placeholder.pics/svg/148',
    },
    {
      id: '4',
      playlistName: 'John Wick Chapter 4',
      description: 'Album',
      imageUrl: 'https://placeholder.pics/svg/148',
    },
    // Add more playlists
  ];

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../assets/iconback.png')} />
        <Text style={styles.title}>Playlists</Text>
      </View>
      <Text style={styles.subtitle}>12 playlists</Text>
      <SearchBar />
      <Text style={styles.recentText}>
        <Image
          style={{ width: 20, height: 12 }}
          source={require('../assets/iconSort.png')}
        />{' '}
        Recents
      </Text>
      <FlatList
        data={playlists}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <PlaylistItem
            playlistName={item.playlistName}
            description={item.description}
            imageUrl={item.imageUrl}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  title: {
    color: '#ffffff',
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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffbf',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
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
  recentText: {
    color: '#ffffffbf',
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 16,
  },
  playlistItemContainer: {
    width: '46%',
    margin: '2%',
    backgroundColor: '#ffffff29',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: 10,
  },
  playlistImage: {
    width: '100%',
    height: 148,
  },
  playlistName: {
    color: '#ffffffff',
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 12,
    marginTop: 8,
  },
  playlistDescription: {
    color: '#ffffff80',
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 12,
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

export default Playlists;
