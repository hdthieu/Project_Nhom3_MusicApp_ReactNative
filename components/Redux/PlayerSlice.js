import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null,  // Bài hát hiện tại
  isPlaying: false,   // Trạng thái phát nhạc
  songHistory: [],    // Lịch sử các bài hát đã phát
};

const PlayerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;  // Cập nhật bài hát hiện tại
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;  // Chuyển đổi trạng thái phát/pause
    },
    skipSong: (state, action) => {
      const userDownloadedSongs = action.payload;  // Danh sách bài hát đã tải về từ backend
      if (userDownloadedSongs.length === 0) return;  // Nếu không có bài hát đã tải về

      const currentSongIndex = userDownloadedSongs.findIndex(
        (song) => song.id === state.currentSong.id
      );

      const nextSong =
        currentSongIndex + 1 < userDownloadedSongs.length
          ? userDownloadedSongs[currentSongIndex + 1]
          : userDownloadedSongs[0];  // Nếu là bài hát cuối cùng thì quay lại bài hát đầu tiên

      // Lưu bài hát hiện tại vào lịch sử bài hát đã phát
      state.songHistory.push(state.currentSong);
      state.currentSong = nextSong;  // Chuyển đến bài hát tiếp theo
    },
    previousSong: (state) => {
      if (state.songHistory.length > 0) {
        const previousSong = state.songHistory.pop();  // Lấy bài hát cuối cùng trong lịch sử
        state.currentSong = previousSong;  // Quay lại bài hát trước đó
      }
    },
  },
});

export const { setCurrentSong, togglePlay, skipSong, previousSong } = PlayerSlice.actions;
export default PlayerSlice.reducer;
