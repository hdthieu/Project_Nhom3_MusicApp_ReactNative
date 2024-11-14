import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './components/Redux/Store.js';

// Các màn hình của ứng dụng
import Player from './components/player';
import Artist from './components/Artist';
import HomePlayer from './components/HomePlayer';
import LoginScreen from './components/LoginScreen';
import ProfileScreen from './components/ProfileScreen';
import LibraryScreen from './components/LibraryScreen';
import LikedSongPage from './components/LikedSongPage';
import DownloadSongsPage from './components/DownloadSongsPage';
const Stack = createNativeStackNavigator();
console.log('store:  ', store);
const App = () => {
  return (
    <Provider store={store}>
      {/* Bọc ứng dụng bằng Provider để redux hoạt động */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
