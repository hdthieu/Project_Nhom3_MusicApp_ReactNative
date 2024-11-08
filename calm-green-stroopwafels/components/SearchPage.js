import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IPConfig from './IPConfig';
const Stack = createNativeStackNavigator();
const SearchPage = () => {
  const { baseUrl } = IPConfig();
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(`${baseUrl}/artists`);
        const data = await response.json();
        setArtists(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching artists 1:', error);
      }
    };
    fetchArtists();
  }, [baseUrl]);
  const genres = [
    { name: 'TAMIL', img: require('../assets/tamilbrowse.png') },
    { name: 'INTERNATIONAL', img: require('../assets/internalBrowse.png') },
    { name: 'POP', img: require('../assets/popbrowse.png') },
    { name: 'HIP-HOP', img: require('../assets/hiphopbrowse.png') },
    { name: 'DANCE', img: require('../assets/danceBrowse.png') },
    { name: 'COUNTRY', img: require('../assets/countrybrowse.png') },
    { name: 'INDIE', img: require('../assets/indieBrowse.png') },
    { name: 'JAZZ', img: require('../assets/JazzBrowse.png') },
    { name: 'PUNK', img: require('../assets/PunkBrowse.png') },
    { name: 'R&B', img: require('../assets/R&BBrowse.png') },
    { name: 'DISCO', img: require('../assets/discoBrowse.png') },
    { name: 'ROCK', img: require('../assets/rockBrowse.png') },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image
          source={require('../assets/kinhLup.png')}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search songs, artist, album or..."
          placeholderTextColor="#000000bf"
        />
      </View>

      {/* Trending Artists */}
      <View style={styles.trendingContainer}>
        <View style={styles.trendingHeader}>
          <Image
            source={require('../assets/iconTrendingArtist.png')}
            style={styles.trendingIcon}
          />
          <Text style={styles.trendingTitle}>Trending artists</Text>
        </View>
        <FlatList
          horizontal
          data={artists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.artistContainer}>
              <Image source={{ uri: item.img }} style={styles.artistImage} />
              <Text style={styles.artistName}>{item.name}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Genre Browse Section */}
      <ScrollView
        style={styles.appContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.browseContainer}>
          <Text style={styles.browseTitle}>Browse</Text>
          <View style={styles.gridContainer}>
            {genres.map((genre, index) => (
              <View key={index} style={styles.genreItem}>
                <Image source={genre.img} style={styles.genreImage} />
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={{ flex: 0.2 }}>
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
            <Text style={styles.label}>Search</Text>
          </TouchableOpacity>

          {/* Nút Profile */}
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={() => navigation.navigate('Profile')}>
            <Image
              style={{ color: 'white' }}
              source={require('../assets/footerLibrary.png')}
            />
            <Text style={styles.label}>Your Library</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'black',
    flex: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffbf',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  trendingContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  trendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  trendingIcon: {
    width: 35,
    height: 20,
    marginRight: 8,
  },
  trendingTitle: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 16,
    fontWeight: '500',
  },
  artistContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  artistImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  artistName: {
    marginTop: 8,
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  browseContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  browseTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 0,
  },
  genreItem: {
    width: '48%',
    height: 80,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: '#ffffff1f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  genreImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    position: 'absolute',
  },
  genreText: {
    color: '#ffffffbf',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
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

export default SearchPage;
