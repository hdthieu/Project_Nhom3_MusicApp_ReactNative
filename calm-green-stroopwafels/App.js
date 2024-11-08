import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { Audio } from 'expo-av';
import Player from './components/player';
import Artist from './components/Artist';
import HomePlayer from './components/HomePlayer';
import YourLibrary from './components/LibraryScreen';
import PageDownload from './components/PageDownload';
import PageLikedSong from './components/PageLikedSong';
import PagePlaylist from './components/PagePlaylist';
import WelcomeScr1 from './components/WelcomeScreen';
import WelcomeScr2 from './components/WelcomeScreen2';
import SignUpScreen from './components/SignUpScreen';
import LoginScreen from './components/LoginScreen';
import SearchScreen from './components/SearchPage';
import ProfileScreen from './components/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="WelcomeScreen1"
          component={WelcomeScr1}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WelcomeScreen2"
          component={WelcomeScr2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomePlayer"
          component={HomePlayer}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Artist"
          component={Artist}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MusicPlayer"
          component={Player}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="YourLibrary"
          component={YourLibrary}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PageLikedSong"
          component={PageLikedSong}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
// <NavigationContainer>
//       <Stack.Navigator initialRouteName="HomePlayer">
//         <Stack.Screen
//           name="HomePlayer"
//           component={HomePlayer}
//           options={{
//             headerShown: false,
//           }}
//         />
//         <Stack.Screen
//           name="MusicPlayer"
//           component={Player}
//           options={{
//             headerShown: false,
//           }}
//         />
//         <Stack.Screen
//           name="Artist"
//           component={Artist}
//           options={{
//             headerShown: false,
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );

//  <Artist />
// <NavigationContainer>
//   <Stack.Navigator initialRouteName="LikedSongs">
//     <Stack.Screen
//       name="LikedSongs"
//       component={LikedSongPage}
//       options={{
//         headerShown: false,
//       }}
//     />
//     <Stack.Screen
//       name="MusicPlayer"
//       component={Player}
//       options={{
//         headerShown: false,
//       }}
//     />
//   </Stack.Navigator>
// </NavigationContainer>
