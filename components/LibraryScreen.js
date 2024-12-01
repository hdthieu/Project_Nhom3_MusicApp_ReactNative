import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import IPConfig from './IPConfig';
const NavigationBar = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <View style={navBarStyles.footer}>
        {/* Nút Home */}
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => navigation.navigate('HomePlayer')}>
          <Image source={require('../assets/footerHome.png')} />
          <Text style={navBarStyles.label}>Home</Text>
        </TouchableOpacity>

        {/* Nút Explore */}
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => navigation.navigate('Explore')}>
          <Image source={require('../assets/footerSearch.png')} />
          <Text style={navBarStyles.label}>Explore</Text>
        </TouchableOpacity>

        {/* Nút Profile */}
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => navigation.navigate('LibraryScreen')}>
          <Image
            style={{ color: 'white' }}
            source={require('../assets/footerLibrary.png')}
          />
          <Text style={navBarStyles.label}>Library</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const navBarStyles = StyleSheet.create({
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

const CategorySection = () => {
  const navigation = useNavigation();
  const likedSongs = useSelector(
    (state) => state.user.currentUser.profile.likedSongs
  );
  const songDownloads = useSelector(
    (state) => state.user.currentUser.profile.songDownloaded
  );
  return (
    <View style={categorySectionStyles.container}>
      <TouchableOpacity
        style={categorySectionStyles.categoryContainer}
        onPress={() => navigation.navigate('LikedSongPage')}>
        <Image
          source={require('../assets/favorite.png')}
          style={categorySectionStyles.icon}
        />
        <Text style={categorySectionStyles.categoryTitle}>Liked Songs</Text>
        <Text style={categorySectionStyles.categoryCount}>
          {likedSongs ? `${likedSongs.length} songs` : '0 songs'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={categorySectionStyles.categoryContainer}
        onPress={() => navigation.navigate('DownloadSongsPage')}>
        <Image
          source={require('../assets/download-for-offline.png')}
          style={categorySectionStyles.icon}
        />
        <Text style={categorySectionStyles.categoryTitle}>Downloads</Text>
        <Text style={categorySectionStyles.categoryCount}>
          {songDownloads ? `${songDownloads.length} songs` : '0 songs'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={categorySectionStyles.categoryContainer}>
        <Image
          source={require('../assets/queue-music.png')}
          style={categorySectionStyles.icon}
        />
        <Text style={categorySectionStyles.categoryTitle}>Playlists</Text>
        <Text style={categorySectionStyles.categoryCount}>210 songs</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ArtistFollowed')}
        style={categorySectionStyles.categoryContainer}>
        <Image
          source={require('../assets/mdi-account-music-outline.png')}
          style={categorySectionStyles.icon}
        />
        <Text style={categorySectionStyles.categoryTitle}>Artists</Text>
        <Text style={categorySectionStyles.categoryCount}>210 songs</Text>
      </TouchableOpacity>
    </View>
  );
};

const categorySectionStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  categoryContainer: {
    width: 148,
    height: 110,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 8,
    borderColor: '#ffffff14',
    borderWidth: 0.5,
    padding: 16,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 18,
    marginBottom: 10,
  },
  categoryTitle: {
    color: '#FFFFFFFF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
  categoryCount: {
    color: '#FFFFFF80',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
  },
});

const RecentlyPlayed = () => {
  const songs = [
    {
      title: 'Inside Out',
      artist: 'The Chainsmokers, Charlee',
      imageUrl: 'https://picsum.photos/200/300',
    },
    {
      title: 'Young',
      artist: 'The Chainsmokers',
      imageUrl: 'https://picsum.photos/200/300',
    },
    {
      title: 'Beach House',
      artist: 'The Chainsmokers - Sick',
      imageUrl: 'https://picsum.photos/200/300',
    },
    {
      title: 'Kills You Slowly',
      artist: 'The Chainsmokers - World',
      imageUrl: 'https://picsum.photos/200/300',
    },
    {
      title: 'Setting Fires',
      artist: 'The Chainsmokers, XYLO -',
      imageUrl: 'https://picsum.photos/200/300',
    },
    {
      title: 'Somebody',
      artist: 'The Chainsmokers, Drew',
      imageUrl: 'https://picsum.photos/200/300',
    },
  ];

  return (
    <View style={recentlyPlayedStyles.container}>
      <View style={recentlyPlayedStyles.Header}>
        <Text style={recentlyPlayedStyles.headerText}>Recently Played</Text>
        <Text style={recentlyPlayedStyles.seeMoreText}>See more</Text>
      </View>
      {songs.map((song, index) => (
        <View key={index} style={recentlyPlayedStyles.SongContainer}>
          <Image
            source={{ uri: song.imageUrl }}
            style={recentlyPlayedStyles.ImageStyle}
          />
          <View style={recentlyPlayedStyles.TextContainer}>
            <Text style={recentlyPlayedStyles.TitleText}>{song.title}</Text>
            <Text style={recentlyPlayedStyles.ArtistText}>{song.artist}</Text>
          </View>
          <Text style={recentlyPlayedStyles.MoreIcon}>⋮</Text>
        </View>
      ))}
    </View>
  );
};

const recentlyPlayedStyles = StyleSheet.create({
  container: {
    padding: 10,
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
    color: '#ffffffbf',
  },
  seeMoreText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14,
    color: '#ffffffbf',
  },
  SongContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  TextContainer: {
    flex: 1,
  },
  TitleText: {
    color: '#ffffffff',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
  },
  ArtistText: {
    color: '#ffffff80',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14,
  },
  ImageStyle: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  MoreIcon: {
    color: '#fff',
    fontSize: 24,
  },
});

const LibraryScreen = () => {
  return (
    <View style={screenStyles.container}>
      <ScrollView style={{ padding: 10 }}>
        <Text style={screenStyles.libraryHeader}>Your Library</Text>
        <CategorySection />
        <RecentlyPlayed />
      </ScrollView>
      <NavigationBar />
    </View>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  libraryHeader: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    color: '#FFFFFFFF',
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default LibraryScreen;
