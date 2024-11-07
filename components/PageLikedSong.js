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

// Sample data for songs
const songs = [
  {
    id: '1',
    title: 'Inside Out',
    artist: 'The Chainsmokers, Charlee',
    image: 'https://placeholder.pics/svg/32x32',
  },
  {
    id: '2',
    title: 'Young',
    artist: 'The Chainsmokers',
    image: 'https://placeholder.pics/svg/32x32',
  },
 
];

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
      {' '}
      <Image source={require('../assets/iconSort.png')} style={styles.icon} />
    </View>
  </View>
);

// SongItem component
const SongItem = ({ title, artist, image }) => (
  <TouchableOpacity style={styles.songItem}>
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

// NavigationBar component
const NavigationBar = () => (
  <View style={styles.navigationBar}>
    <View style={styles.navItem}>
      <Image source={require('../assets/footerHome.png')} style={styles.iconFooter} />
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
const PageLikedSong = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require('../assets/iconback.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Liked Songs</Text>
      </View>
      <Text style={styles.subheader}>120 liked songs</Text>
      <SearchBar />
      <FlatList
        data={songs}
        renderItem={({ item }) => <SongItem {...item} />}
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
  }
});

export default PageLikedSong;
