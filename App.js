import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux'; // Import Provider
import store from './components/Redux/Store'; // Import store từ Store.js
import Player from './components/player';
import Artist from './components/Artist';
import HomePlayer from './components/HomePlayer';
import LoginScreen from './components/LoginScreen';
import ProfileScreen from './components/ProfileScreen';
import LibraryScreen from './components/LibraryScreen';
import LikedSongPage from './components/LikedSongPage';
import SignUpScreen from './components/SignUpScreen';
import DownloadSongsPage from './components/DownloadSongsPage';
import ArtistFollowed from './components/ArtistFollowed';
import SearchPage from './components/SearchPage'
import MiniPlayer from './components/MiniPlayer';
import Search from './components/Search'
import { useSelector } from 'react-redux'; // Import useSelector

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
            name="Search"
            component={Search}
            options={{ headerShown: false }}
          />
        <Stack.Screen
            name="SearchPage"
            component={SearchPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomePlayer"
            component={HomePlayer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Artist"
            component={Artist}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MusicPlayer"
            component={Player}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LibraryScreen"
            component={LibraryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LikedSongPage"
            component={LikedSongPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DownloadSongsPage"
            component={DownloadSongsPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ArtistFollowed"
            component={ArtistFollowed}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
