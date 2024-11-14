import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null, 
  downloadedSongs: [], 
  likedSongs: [], 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload.user; // Lưu thông tin người dùng
      state.downloadedSongs = action.payload.downloadedSongs; // Lưu bài hát đã tải về
    },
    setLikedSongs: (state, action) => {
      state.likedSongs = action.payload; // Cập nhật danh sách bài hát yêu thích
    },
    setDownloadedSongs: (state, action) => {
      state.downloadedSongs = action.payload; // Cập nhật danh sách bài hát đã tải về
    },
  },
});

export const { setUser, setLikedSongs, setDownloadedSongs } = userSlice.actions;
export default userSlice.reducer;
