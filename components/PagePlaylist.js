import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// Sample data for playlists
const playlists = [
  {
    id: '1',
    title: 'Maroon 5 Songs',
    type: 'Playlist',
    subType: 'Myself',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Maroon_5%2C_2011.jpg/640px-Maroon_5%2C_2011.jpg',
  },
  {
    id: '2',
    title: 'Phonk Madness',
    type: 'Playlist',
    image:
      'https://www.gryffinofficial.com/cdn/shop/collections/Untitled-1.png?v=1669396799&width=1080',
  },
  {
    id: '3',
    title: 'Hospital Playlist',
    type: 'Playlist',
    image:
      'https://cdn.kphude.com/wp-content/uploads/2023/06/Hospital-Playlist-2-Poster.webp',
  },
  {
    id: '4',
    title: '5 Củ',
    type: 'Playlist',
    image:
      'https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/c/b/5/2/cb5210a2f85409e2bfb4275b0dfefc26.jpg',
  },
  {
    id: '5',
    title: 'Justin Bieber',
    type: 'Playlist',
    image:
      'https://i.ytimg.com/vi/Vxwpdx9BB0w/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCYaL_UjP6gPLCtqssU6WRBgfOGqw',
  },
  {
    id: '6',
    title: 'Sơn tùng',
    type: 'Playlist',
    image:
      'https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/e/7/7/e/e77e66089e244c0c61188189be25f8ba.jpg',
  },
  {
    id: '7',
    title: 'Thanh Hưng',
    type: 'Playlist',
    image:
      'https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/7/5/c/e/75ce7a22d799c555689d01b5a2b782d3.jpg',
  }
];

// SearchBar component
const SearchBar = () => (
  <View style={{ flexDirection: 'row' }}>
    <View style={styles.searchBar}>
      <Image source={require('../assets/kinhLup.png')} style={styles.icon} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="rgba(0, 0, 0, 0.75)"
        style={styles.input}
      />
    </View>
    <TouchableOpacity
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('../assets/iconSort.png')} style={styles.icon} />
    </TouchableOpacity>
  </View>
);

// PlaylistItem component
const PlaylistItem = ({ title, type, subType, image }) => (
  <View style={styles.playlistItem}>
    <Image source={{ uri: image }} style={styles.playlistImage} />
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
      <Image
        source={require('../assets/footerHome.png')}
        style={styles.iconFooter}
      />
      <Text style={styles.inactive}>Home</Text>
    </View>
    <View style={styles.navItem}>
      <Image
        source={require('../assets/footerSearch.png')}
        style={styles.iconFooter}
      />
      <Text style={styles.inactive}>Search</Text>
    </View>
    <View style={styles.navItem}>
      <Image
        source={require('../assets/footerLibrary.png')}
        style={styles.iconFooter}
      />
      <Text style={styles.active}>Your Library</Text>
    </View>
  </View>
);

// Main Component
const PagePlaylist = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require('../assets/iconback.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Playlists</Text>
      </View>

      <Text style={styles.subheader}>12 playlists</Text>
      <SearchBar />
      <FlatList
        data={playlists}
        renderItem={({ item }) => <PlaylistItem {...item} />}
        keyExtractor={(item) => item.id}
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
    flex: 5,
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
    width: 30,
    height: 30,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default PagePlaylist;
