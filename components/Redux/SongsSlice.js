import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import IPConfig from '../IPConfig';

const { baseUrl } = IPConfig();

// Async thunk để lấy danh sách songs từ API
export const fetchSongs = createAsyncThunk(
  'songs/fetchSongs',
  async () => {
    const response = await fetch(`${baseUrl}/songs`);
    const data = await response.json();
    return data;
  }
);

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    list: [], // Lưu danh sách songs
    status: 'idle', // Trạng thái để theo dõi quá trình tải
    error: null, // Lưu lỗi nếu có
  },
  reducers: {
    // Bạn có thể định nghĩa thêm các reducer nếu cần
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = 'loading'; // Đang tải dữ liệu
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Dữ liệu đã tải thành công
        state.list = action.payload; // Lưu danh sách bài hát vào list
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = 'failed'; // Xử lý lỗi khi tải dữ liệu
        state.error = action.error.message; // Lưu thông tin lỗi
      });
  },
});

export default songsSlice.reducer;
