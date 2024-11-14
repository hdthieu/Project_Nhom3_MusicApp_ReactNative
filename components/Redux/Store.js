// Redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './PlayerSlice';
import userReducer from './UserSlice'; 
import artistsReducer from './ArtistsSlice';
const store = configureStore({
  reducer: {
    player: playerReducer,
    user: userReducer,
    artists: artistsReducer,
  },
});

export default store;
