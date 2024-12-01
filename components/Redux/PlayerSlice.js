import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: {}, // Bài hát hiện tại
  isPlaying: false, // Trạng thái phát nhạc
  isPlayerVisible: true, // Hiển thị Player chính
  songHistory: [], // Lịch sử bài hát
  currentTime: 0, // Thời gian phát hiện tại
  duration: 0, // Thời lượng bài hát
};

const PlayerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlaybackPosition(state, action) {
      state.currentTime = action.payload; // Lưu lại thời gian
    },
    togglePlayerVisibility: (state, action) => {
      state.isPlayerVisible = action.payload ?? !state.isPlayerVisible;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload; // Cập nhật bài hát hiện tại
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload; // Updates current time in Redux store
    },
    skipSong: (state, action) => {
      const userDownloadedSongs = action.payload; // Danh sách bài hát đã tải về từ backend
      if (userDownloadedSongs.length === 0) return; // Nếu không có bài hát đã tải về

      const currentSongIndex = userDownloadedSongs.findIndex(
        (song) => song.id === state.currentSong.id
      );

      const nextSong =
        currentSongIndex + 1 < userDownloadedSongs.length
          ? userDownloadedSongs[currentSongIndex + 1]
          : userDownloadedSongs[0]; // Nếu là bài hát cuối cùng thì quay lại bài hát đầu tiên

      // Lưu bài hát hiện tại vào lịch sử bài hát đã phát
      state.songHistory.push(state.currentSong);
      state.currentSong = nextSong; // Chuyển đến bài hát tiếp theo
    },
    setPlaybackPosition(state, action) {
      state.currentTime = action.payload;
    },
    setPlayingState: (state, action) => {
      state.isPlaying = action.payload; // Cập nhật trạng thái phát
    },
    previousSong: (state) => {
      if (state.songHistory.length > 0) {
        const previousSong = state.songHistory.pop(); // Lấy bài hát cuối cùng trong lịch sử
        state.currentSong = previousSong; // Quay lại bài hát trước đó
      }
    },
  },
});

export const {
  setCurrentSong,
  togglePlay,
  skipSong,
  previousSong,
  togglePlayerVisibility,
  setPlaybackPosition,
} = PlayerSlice.actions;
export default PlayerSlice.reducer;
