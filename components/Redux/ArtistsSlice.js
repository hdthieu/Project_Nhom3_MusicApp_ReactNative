// Redux/artistsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import IPConfig from '../IPConfig';

const { baseUrl } = IPConfig();

// Async thunk để lấy danh sách artists từ API
export const fetchArtists = createAsyncThunk(
  'artists/fetchArtists',
  async () => {
    const response = await fetch(`${baseUrl}/artists`);
    const data = await response.json();
    return data;
  }
);

const artistsSlice = createSlice({
  name: 'artists',
  initialState: {
    list: [], // Lưu danh sách artists
    status: 'idle', // Trạng thái để theo dõi quá trình tải
    error: null, // Lưu lỗi nếu có
  },
  reducers: {
    // Bạn có thể định nghĩa thêm các reducer nếu cần
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload; // Lưu dữ liệu artists vào list
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default artistsSlice.reducer;
