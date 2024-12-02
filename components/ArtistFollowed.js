import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import IPConfig from './IPConfig';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong } from './Redux/PlayerSlice';
import { setLikedSongs } from './Redux/UserSlice';

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
      <Image source={require('../assets/iconSort.png')} style={styles.icon} />
    </View>
  </View>
);

// NavigationBar component
const NavigationBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('HomePlayer')}>
        <Image
          source={require('../assets/footerHome.png')}
          style={styles.iconFooter}
        />
        <Text style={styles.inactive}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('SearchScreen')}>
        <Image
          source={require('../assets/footerSearch.png')}
          style={styles.iconFooter}
        />
        <Text style={styles.inactive}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('LibraryScreen')}>
        <Image
          source={require('../assets/footerLibrary.png')}
          style={styles.iconFooter}
        />
        <Text style={styles.active}>Your Library</Text>
      </TouchableOpacity>
    </View>
  );
};

const ArtistFollowed = () => {
  const { baseUrl } = IPConfig();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [followedArtists, setFollowedArtists] = useState([]); // Lưu danh sách artist đã follow
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFollowedArtists = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/user/${user.id}/followed-artists`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch followed artists');
        }
        const data = await response.json();
        setFollowedArtists(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching followed artists:', error);
      }
    };

    fetchFollowedArtists();
  }, [baseUrl, user]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.img }} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('LibraryScreen')}>
          <Image
            source={require('../assets/iconback.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Followed Artists</Text>
      </View>
      <Text style={styles.subheader}>
        {followedArtists.length} followed artists
      </Text>
      <SearchBar />
      <FlatList
        data={[
          ...followedArtists,
          { id: 'add', name: 'Add More', image: null },
        ]} // Thêm nút "Add More"
        renderItem={({ item }) =>
          item.img ? ( // Đúng trường "img" như trong dữ liệu
            renderItem({ item })
          ) : (
            <TouchableOpacity style={styles.itemContainer}>
              <View style={styles.addMore}>
                <Text style={styles.addMoreText}>+</Text>
              </View>
              <Text style={styles.name}>Add More</Text>
            </TouchableOpacity>
          )
        }
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.list}
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
  list: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40, // Tạo hình tròn
    marginBottom: 8,
  },
  name: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    width: 80,
  },
  addMore: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMoreText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default ArtistFollowed;
