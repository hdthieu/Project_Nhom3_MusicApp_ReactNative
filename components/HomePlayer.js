import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomePlayer() {
  const navigation = useNavigation();
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('http://localhost:3000/artists');
        const data = await response.json();
        setArtists(data);
        console.log(artists);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };
    fetchArtists();
  }, []);
  const handleArtistPress = (song) => {
    const artist = artists.find((artist) => artist.id === song.artistId);
    const songWithArtist = {
      ...song,
      artist: artist
        ? {
            name: artist.name,
            bio: artist.bio,
            img: artist.img,
          }
        : null,
    };
    console.log(songWithArtist)
    navigation.navigate('Artist', { artist: songWithArtist });
  };
  const type = [
    {
      name: 'For You',
    },
    {
      name: 'Relax',
    },
    {
      name: 'Workout',
    },
    {
      name: 'Name',
    },
  ];
  const dataFToday = [
    {
      bannerFT: require('../assets/bannerFT1.png'),
    },
    {
      bannerFT: require('../assets/bannerFT2.png'),
    },
  ];

  const dataRecentlyPlayed = [
    {
      img: require('../assets/recentlyplayed1.png'),
      name: 'Inside out',
    },
    {
      img: require('../assets/recentlyplayed2.png'),
      name: 'Young',
    },
    {
      img: require('../assets/recentlyplayed3.png'),
      name: 'Beach House',
    },
    {
      img: require('../assets/recentlyplayed4.png'),
      name: 'Kills You',
    },
  ];

  const dataMixesForYou = [
    {
      img: require('../assets/mixCover1.png'),
      name: 'Calvin Harris, Martin Garrix, Dewain Whi...',
    },
    {
      img: require('../assets/mixCover2.png'),
      name: 'A R Rahman, Harris Jeyaraj, Yuvan Sha...',
    },
    {
      img: require('../assets/mixCover3.png'),
      name: 'Maroon 5, Imagine Dragons, C',
    },
  ];
  const dataArtisYou = [
    {
      img: require('../assets/artistYou.png'),
      name: 'Maroon 5: Best of the best',
    },
    {
      img: require('../assets/artistYou2.png'),
      name: 'This is Maroon 5',
    },
    {
      img: require('../assets/artistYou3.png'),
      name: 'Maroon 5 - Top Hits',
    },
  ];
  return (
    <View style={{ marginTop: 20, backgroundColor: 'black', flex: 1 }}>
      <View style={{ padding: 10, backgroundColor: 'black', flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'column',
              flex: 2,
              justifyContent: 'center',
            }}>
            <View style={styles.styleChung}>
              <Image
                source={require('../assets/Hi_icon.png')}
                style={styles.reactLogo}
              />
              <Text
                style={[styles.styleChungTxt, { color: 'grey', fontSize: 20 }]}>
                Hi Logan,
              </Text>
            </View>
            <Text style={styles.styleChungTxt}>Good Evening</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}></View>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{ width: 60, height: 60 }}
              source={require('../assets/chuong.png')}
            />
            <Image
              style={{ width: 60, height: 60 }}
              source={require('../assets/faceHome.png')}
            />
          </View>
        </View>
        <View style={styles.styleFlatListCommon}>
          <FlatList
            data={type}
            horizontal
            renderItem={({ item }) => (
              <View
                style={{
                  marginHorizontal: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    styles.styleChungTxt,
                    { fontSize: 20, color: 'grey' },
                  ]}>
                  {item.name}
                </Text>
              </View>
            )}
          />
        </View>

        <View style={{ flex: 8 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Featuring Today Section */}
            <View style={{ marginTop: 10 }}>
              <Text style={[styles.styleChungTxt, { fontSize: 28 }]}>
                Featuring Today
              </Text>
              <FlatList
                data={dataFToday}
                horizontal
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ marginHorizontal: 15, marginTop: 10 }}>
                    <Image source={item.bannerFT} />
                  </TouchableOpacity>
                )}
              />
            </View>

            {/* Recently Played Section */}
            <View style={{ marginTop: 10 }}>
              <Text style={[styles.styleChungTxt, { fontSize: 28 }]}>
                Recently Played
              </Text>
              <FlatList
                data={dataRecentlyPlayed}
                horizontal
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ marginHorizontal: 15, marginTop: 10 }}>
                    <Image source={item.img} />
                    <Text
                      style={[
                        styles.styleChungTxt,
                        { fontSize: 14, color: 'white' },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View>
              <Text style={[styles.styleChungTxt, { fontSize: 28 }]}>
                Recently Played
              </Text>
              <FlatList
                data={dataMixesForYou}
                horizontal
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ marginHorizontal: 0, marginTop: 10 }}>
                    <Image source={item.img} />
                    <Text
                      style={[
                        styles.styleChungTxt,
                        { fontSize: 14, color: 'white', width: 150 },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={[styles.styleChungTxt, { fontSize: 28 }]}>
                Recently Played
              </Text>
              <FlatList
                data={dataArtisYou}
                horizontal
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ marginHorizontal: 0, marginTop: 10 }}>
                    <Image source={item.img} />
                    <Text
                      style={[
                        styles.styleChungTxt,
                        { fontSize: 14, color: 'white', width: 150 },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={[styles.styleChungTxt, { fontSize: 28 }]}>
                Artist
              </Text>
              <FlatList
                data={artists}
                horizontal
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleArtistPress(item)}
                    style={{ marginHorizontal: 0, marginTop: 10 }}>
                    <Image
                      source={{ uri: item.img }}
                      style={{ width: 120, height: 120, borderRadius: 5 }}
                    />
                    <Text
                      style={[
                        styles.styleChungTxt,
                        { fontSize: 14, color: 'white', width: 150 },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 30,
    width: 30,
  },
  styleUser: {
    color: 'white',
  },
  styleChung: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  styleChungTxt: {
    // fontFamily: 'Inter',
    fontSize: 24,
    color: 'white',
  },
  styleFlatListCommon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
