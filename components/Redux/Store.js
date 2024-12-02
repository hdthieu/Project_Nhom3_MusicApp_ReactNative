// Redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './PlayerSlice';
import userReducer from './UserSlice';
import artistsReducer from './ArtistsSlice';
import songsReducer from './SongsSlice'
const store = configureStore({
  reducer: {
    player: playerReducer,
    user: userReducer,
    artists: artistsReducer,
    songs: songsReducer,
  },
});
console.log(store);
export default store;
