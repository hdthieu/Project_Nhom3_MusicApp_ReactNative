import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  currentUser: {},
  downloadedSongs: [],
  likedSongs: [],
  isDropdownMini: false,
  isPlayerVisible: false, // Thêm trạng thái cho trình phát
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload.user;
      state.downloadedSongs = action.payload.downloadedSongs;
    },
    setLikedSongs: (state, action) => {
      state.likedSongs = action.payload;
    },
    setDownloadedSongs: (state, action) => {
      state.downloadedSongs = action.payload;
    },
    toggleDropdownMini: (state) => {
      state.isDropdownMini = !state.isDropdownMini;
    },
    togglePlayerVisible: (state) => {
      state.isPlayerVisible = !state.isPlayerVisible; // Chuyển đổi trạng thái hiển thị trình phát
    },
  },
});

export const {
  setUser,
  setLikedSongs,
  setDownloadedSongs,
  toggleDropdownMini,
  togglePlayerVisible, // Export thêm action này
} = userSlice.actions;
export default userSlice.reducer;
