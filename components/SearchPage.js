import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArtists } from './Redux/ArtistsSlice'; // Import action để tải dữ liệu
import { useNavigation } from '@react-navigation/native';
import HomePlayer from './HomePlayer';
import Search from './Search'


const SearchBar = () => {

  const navigation = useNavigation();

  // Hàm điều hướng khi nhấn vào ô TextInput
  const handleFocus = () => {
    navigation.navigate('Search');  // Điều hướng đến trang tìm kiếm
  };
  return (
    <View style={searchBarStyles.container}>
      <Image
        source={{ uri: 'https://dashboard.codeparrot.ai/api/assets/Z0xeWnFEV176CUg7' }}
        style={searchBarStyles.icon}
      />
      <TextInput
        style={searchBarStyles.input}
        placeholder="Search songs, artist, album o..."
        placeholderTextColor="#000000bf"
        onFocus={handleFocus}  // Khi nhấn vào ô TextInput, điều hướng đến trang tìm kiếm
      />
    </View>
  );
};

const searchBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffbf',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    color: '#000000bf',
  },
});

const TrendingArtists = () => {
  
  const dispatch = useDispatch();

  // Lấy trạng thái từ Redux store
  const { list: artists, status, error } = useSelector((state) => state.artists);

  // Tự động tải dữ liệu khi component được render
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchArtists());
    }
  }, [status, dispatch]);

  return (
    <View style={trendingArtistsStyles.container}>
      <View style={trendingArtistsStyles.header}>
        <Image
          source={{ uri: 'https://dashboard.codeparrot.ai/api/assets/Z0xeYHFEV176CUg8' }}
          style={trendingArtistsStyles.icon}
        />
        <Text style={trendingArtistsStyles.title}>Trending artists</Text>
      </View>

      {status === 'loading' && <Text style={trendingArtistsStyles.loading}>Loading...</Text>}
      {status === 'failed' && <Text style={trendingArtistsStyles.error}>Error: {error}</Text>}

      {status === 'succeeded' && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {artists.map((artist) => (
            <View key={artist.id} style={trendingArtistsStyles.artistContainer}>
              <Image
                source={{ uri: artist.img }} // Thay đổi nếu ảnh nằm trong thuộc tính khác
                style={trendingArtistsStyles.image}
              />
              <Text style={trendingArtistsStyles.name}>{artist.name}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const trendingArtistsStyles = StyleSheet.create({
  container: {
    backgroundColor: '#242723',
    padding: 10,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  title: {
    color: '#ffffffbf',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
  },
  artistContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 5,
  },
  name: {
    color: '#ffffffbf',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 14,
  },
  loading: {
    color: '#ffffffbf',
    textAlign: 'center',
    marginTop: 10,
  },
  error: {
    color: '#ff6b6b',
    textAlign: 'center',
    marginTop: 10,
  },
});

const GenreCard = ({ genre, imageId }) => {
  return (
    <View style={genreCardStyles.card}>
      <Image
        source={{ uri: `https://placeholder.pics/svg?${imageId}` }}
        style={genreCardStyles.image}
      />
      <View style={genreCardStyles.overlay}>
        <Text style={genreCardStyles.text}>{genre}</Text>
      </View>
    </View>
  );
};

const genreCardStyles = StyleSheet.create({
  card: {
    width: 148,
    height: 80,
    margin: 10,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff1f',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffffbf',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 20,
  },
});


const NavigationBar = () => {
  const navigation = useNavigation();
  return (
    <View style={navigationBarStyles.container}>
      <TouchableOpacity style={navigationBarStyles.iconContainer} onPress={() => navigation.navigate('HomePlayer')}>
        <Image
          source={require('../assets/footerHome.png')}
          style={navigationBarStyles.icon}
          
        />
        <Text style={navigationBarStyles.label}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={navigationBarStyles.iconContainer}>
        <Image
          source={require('../assets/footerSearch.png')}
          style={navigationBarStyles.icon}
        />
        <Text style={navigationBarStyles.label}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={navigationBarStyles.iconContainer}>
        <Image
          source={require('../assets/footerLibrary.png')}
          style={navigationBarStyles.icon}
        />
        <Text style={navigationBarStyles.label}>Your Library</Text>
      </TouchableOpacity>
    </View>
  );
};

const navigationBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff33',
    paddingVertical: 10,
    width: '100%',
    height: 72,
  },
  iconContainer: {
    alignItems: 'center',
    width: 64,
    height: 72,
  },
  icon: {
    width: 24,
    height: 24,
    marginTop: 12,
  },
  label: {
    color: '#ffffff80',
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});

const SearchPage = () => {
  const genres = [
    { genre: 'TAMIL', imageId: '29' },
    { genre: 'INTERNATIONAL', imageId: '28' },
    { genre: 'POP', imageId: '33' },
    { genre: 'HIP-HOP', imageId: '8' },
    { genre: 'DANCE', imageId: '31' },
    { genre: 'COUNTRY', imageId: '32' },
    { genre: 'INDIE', imageId: '30' },
    { genre: 'JAZZ', imageId: '7' },
    { genre: 'PUNK', imageId: '34' },
    { genre: 'ROCK', imageId: '84' },
  ];

  return (
    <View style={appStyles.container}>
      <SearchBar />
      <TrendingArtists />
      <ScrollView contentContainerStyle={appStyles.genreContainer}>
        {genres.map((item, index) => (
          <GenreCard key={index} genre={item.genre} imageId={item.imageId} />
        ))}
      </ScrollView>
      <NavigationBar />
    </View>
  );
};

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 20,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default SearchPage;

