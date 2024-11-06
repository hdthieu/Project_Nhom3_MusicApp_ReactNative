import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { Audio } from 'expo-av';
import LikedSongPage from './components/LikedSongPage';
import Player from './components/player';
import Artist from './components/Artist'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
   <Artist />
  );
};

export default App;
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