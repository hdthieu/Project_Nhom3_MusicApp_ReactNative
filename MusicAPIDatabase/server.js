const express = require('express');
const cors = require('cors');
const path = require('path');
const albums = require('./data/album.json');   // Đường dẫn đến tệp album.json
const artists = require('./data/artist.json'); // Đường dẫn đến tệp artist.json
const songs = require('./data/songs.json');     // Đường dẫn đến tệp songs.json

const app = express();
const PORT = 3000;

// Sử dụng CORS để cho phép kết nối từ ứng dụng React Native
app.use(cors());

// Endpoint để lấy danh sách album
app.get('/albums', (req, res) => {
  res.json(albums);
});

// Endpoint để lấy danh sách nghệ sĩ
app.get('/artists', (req, res) => {
  res.json(artists);
});

// Endpoint để lấy danh sách bài hát
app.get('/songs', (req, res) => {
  res.json(songs);
});

// Endpoint để phát âm thanh
app.get('/audio/:songId', (req, res) => {
  const songId = req.params.songId;
  const song = songs.find(s => s.id === songId);
  
  if (song) {
    const filePath = path.join(__dirname, song.url); // Đường dẫn đến tệp âm thanh
    res.sendFile(filePath);
  } else {
    res.status(404).send('Song not found');
  }
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
