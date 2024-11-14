// Redux/UserSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null, // Thông tin người dùng hiện tại
  downloadedSongs: [], // Danh sách bài hát đã tải về
  likedSongs: [], // Danh sách bài hát yêu thích
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
  },
});

export const { setUser, setLikedSongs } = userSlice.actions;
export default userSlice.reducer;
