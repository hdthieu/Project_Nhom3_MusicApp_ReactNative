import React, { useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArtists } from './Redux/ArtistsSlice'; // Import action để tải dữ liệu
import { useNavigation } from '@react-navigation/native';
import { fetchSongs } from './Redux/SongsSlice';
import HomePlayer from './HomePlayer';

// Hàm loại bỏ dấu tiếng Việt
const removeAccents = (str) =>
  str
    .normalize('NFD') // Chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
    .toLowerCase();

const SearchBar = ({ onSearch }) => {
  const inputRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <View style={styles.searchBarContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={{ uri: 'https://dashboard.codeparrot.ai/api/assets/Z0yAA3FEV176CUhb' }}
          style={styles.backArrow}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Search songs, artist, album or playlist"
        placeholderTextColor="#ffffff40"
        ref={inputRef}
        onChangeText={onSearch} // Gọi callback onSearch khi nhập text
      />
    </View>
  );
};

const RecentSearchItem = ({ imageId, title, subtitle, onClose }) => {
  return (
    <View style={styles.recentSearchItemContainer}>
      <Image
        source={{ uri: `${imageId}` }}
        style={styles.recentSearchImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const NavigationBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.navigationBarContainer}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('HomePlayer')}>
        <Image
          source={require('../assets/footerHome.png')}
          style={navigationBarStyles.icon}
        
        />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Image
          source={require('../assets/kinhLup.png')}
          style={navigationBarStyles.icon}
        />
        <Text style={styles.label}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Image
          source={require('../assets/footerLibrary.png')}
          style={navigationBarStyles.icon}
        />
        <Text style={styles.label}>Your Library</Text>
      </TouchableOpacity>
    </View>
  );
};
const navigationBarStyles = StyleSheet.create({
 
  icon: {
    width: 24,
    height: 24,
    marginTop: 12,
  },

});
const Search = () => {
  const dispatch = useDispatch();
  const artists = useSelector((state) => state.artists.list);
  const songs = useSelector((state) => state.songs.list);
  const [searchResults, setSearchResults] = React.useState([]);
  
  useEffect(() => {
    dispatch(fetchArtists());
    dispatch(fetchSongs()); // Tải danh sách songs
  }, [dispatch]);

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      // Tìm artist có tên chứa từ khóa
      const filteredArtists = artists.filter((artist) =>
        removeAccents(artist.name).includes(removeAccents(query))
      );

      // Tìm song có tên hoặc artist có tên chứa từ khóa
      const filteredSongs = songs.filter((song) => {
        const artist = artists.find((a) => a.id === song.artistId);
        return (
          removeAccents(song.title).includes(removeAccents(query)) || 
          (artist && removeAccents(artist.name).includes(removeAccents(query)))
        );
      });

      setSearchResults({
        artists: filteredArtists,
        songs: filteredSongs,
      });
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <ScrollView style={styles.scrollView}>
        {searchResults.artists && searchResults.artists.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Artist</Text>
            {searchResults.artists.map((artist) => (
              <RecentSearchItem
                key={artist.id}
                imageId={artist.img}
                title={artist.name}
                subtitle={artist.bio || 'Artist'}
                onClose={() => console.log(`Close ${artist.name}`)}
              />
            ))}
          </View>
        )}
        {searchResults.songs && searchResults.songs.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Song</Text>
            {searchResults.songs.map((song) => {
              const artist = artists.find((a) => a.id === song.artistId); // Tìm ca sĩ từ artistId
              return (
                <RecentSearchItem
                  key={song.id}
                  imageId={song.image}
                  title={song.title}
                  subtitle={`${artist ? artist.name : 'Unknown'}`} // Hiển thị tên ca sĩ
                  onClose={() => console.log(`Close ${song.title}`)}
                />
              );
            })}
          </View>
        )}
        {(!searchResults.artists || searchResults.artists.length === 0) && 
         (!searchResults.songs || searchResults.songs.length === 0) && (
          <Text style={styles.noResultsText}>No results found</Text>
        )}
      </ScrollView>
      <NavigationBar />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0000001f',
    padding: 16,
    height: 56,
  },
  backArrow: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  recentSearchItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10,
    marginBottom: 10,
  },
  recentSearchImage: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14,
  },
  subtitle: {
    color: '#ffffff80',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14,
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
  
  navigationBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    paddingVertical: 10,
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  label: {
    color: '#ffffff80',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Inter',
    lineHeight: 12,
    textAlign: 'center',
  },
  sectionTitle:{
    color:'white'
  },
  noResultsText:{
    color:'white'
  }
});

export default Search;
