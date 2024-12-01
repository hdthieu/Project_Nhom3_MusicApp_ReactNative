import React, { useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArtists } from './Redux/ArtistsSlice'; // Import action để tải dữ liệu
import { useNavigation } from '@react-navigation/native';
import HomePlayer from './HomePlayer';

const SearchBar = () => {

  const inputRef = useRef(null);  // Tạo một reference cho TextInput
const navigation = useNavigation();
  // Tự động focus khi trang được hiển thị
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
        ref={inputRef}  // Gán reference cho TextInput
      />
    </View>
  );
};

const RecentSearchItem = ({ imageId, title, subtitle, onClose }) => {
  return (
    <View style={styles.recentSearchItemContainer}>
      <Image
        source={{ uri: `https://placeholder.pics/svg?${imageId}&` }}
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
  return (
    <View style={styles.navigationBarContainer}>
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: 'https://dashboard.codeparrot.ai/api/assets/Z0yAA3FEV176CUhc' }}
          style={styles.icon}
        />
        <Text style={styles.label}>Home</Text>
      </View>
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: 'https://dashboard.codeparrot.ai/api/assets/Z0yAA3FEV176CUhd' }}
          style={styles.icon}
        />
        <Text style={styles.label}>Search</Text>
      </View>
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: 'https://dashboard.codeparrot.ai/api/assets/Z0yAA3FEV176CUhe' }}
          style={styles.icon}
        />
        <Text style={styles.label}>Your Library</Text>
      </View>
    </View>
  );
};

const Search = () => {
  return (
    <View style={styles.container}>
      <SearchBar />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.recentSearchesTitle}>Recent searches</Text>
        <RecentSearchItem 
          imageId="7:69734" 
          title="You (feat. Travis Scott)" 
          subtitle="Song • Don Toliver" 
          onClose={() => console.log('Close pressed')} 
        />
        <RecentSearchItem 
          imageId="7:69735" 
          title="John Wick: Chapter 4 (Original Soundtrack)" 
          subtitle="Album • Tyler Bates, Joel J. Richard" 
          onClose={() => console.log('Close pressed')} 
        />
        <RecentSearchItem 
          imageId="7:69736" 
          title="Maroon 5" 
          subtitle="Artist" 
          onClose={() => console.log('Close pressed')} 
        />
        <RecentSearchItem 
          imageId="7:69737" 
          title="Phonk Madness" 
          subtitle="Playlist" 
          onClose={() => console.log('Close pressed')} 
        />
        <Text style={styles.clearHistory}>Clear history</Text>
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
  recentSearchesTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 16,
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
  clearHistory: {
    color: '#ffffff80',
    fontSize: 14,
    textAlign: 'right',
    marginVertical: 16,
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
});

export default Search;

