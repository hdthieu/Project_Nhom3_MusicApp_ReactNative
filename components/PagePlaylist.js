import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';

// Sample data for playlists
const playlists = [
  {
    id: '1',
    title: 'Maroon 5 Songs',
    type: 'Playlist',
    subType: 'Myself',
    image: 'https://placeholder.pics/svg/148x148',
  },
  {
    id: '2',
    title: 'Phonk Madness',
    type: 'Playlist',
    image: 'https://placeholder.pics/svg/148x148',
  },
  // Add more playlists similarly...
];

// SearchBar component
const SearchBar = () => (
  <View style={styles.searchBar}>
    <Image source={{uri: 'https://placeholder.pics/svg/24x24'}} style={styles.icon} />
    <TextInput
      placeholder="Search"
      placeholderTextColor="rgba(0, 0, 0, 0.75)"
      style={styles.input}
    />
    <TouchableOpacity>
      <Image source={{uri: 'https://placeholder.pics/svg/24x24'}} style={styles.icon} />
    </TouchableOpacity>
  </View>
);

// PlaylistItem component
const PlaylistItem = ({ title, type, subType, image }) => (
  <View style={styles.playlistItem}>
    <Image source={{uri: image}} style={styles.playlistImage} />
    <Text style={styles.playlistTitle}>{title}</Text>
    <Text style={styles.playlistType}>
      {type} {subType ? `• ${subType}` : ''}
    </Text>
  </View>
);

// NavigationBar component
const NavigationBar = () => (
  <View style={styles.navigationBar}>
    <View style={styles.navItem}>
      <Image source={{uri: 'https://placeholder.pics/svg/24x24'}} style={styles.icon} />
      <Text style={styles.inactive}>Home</Text>
    </View>
    <View style={styles.navItem}>
      <Image source={{uri: 'https://placeholder.pics/svg/24x24'}} style={styles.icon} />
      <Text style={styles.inactive}>Search</Text>
    </View>
    <View style={styles.navItem}>
      <Image source={{uri: 'https://placeholder.pics/svg/24x24'}} style={styles.icon} />
      <Text style={styles.active}>Your Library</Text>
    </View>
  </View>
);

// Main Component
const PagePlaylist = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{uri: 'https://placeholder.pics/svg/24x24'}} style={styles.backIcon} />
        <Text style={styles.headerTitle}>Playlists</Text>
      </View>
      <Text style={styles.subheader}>12 playlists</Text>
      <SearchBar />
      <FlatList
        data={playlists}
        renderItem={({ item }) => <PlaylistItem {...item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subheader: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 40,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.75)',
  },
  playlistItem: {
    flex: 0.5,
    alignItems: 'center',
    marginBottom: 16,
  },
  playlistImage: {
    width: 148,
    height: 148,
    borderRadius: 5,
    marginBottom: 8,
  },
  playlistTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  playlistType: {
    fontSize: 12,
    color: '#FFFFFF80',
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
  icon: {
    width: 24,
    height: 24,
  },
  row: {
    justifyContent: "space-between"
  }
});

export default PagePlaylist;
