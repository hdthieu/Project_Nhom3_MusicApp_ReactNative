const express = require('express');
const cors = require('cors');
const path = require('path');
const albums = require('./data/album.json');   
const artists = require('./data/artist.json'); 
const songs = require('./data/songs.json');     
const users = require('./data/user.json')
const app = express();
const PORT = 3000;

// Sử dụng CORS để cho phép kết nối từ ứng dụng React Native
app.use(cors({
  origin: '*',
}));



app.get('/albums', (req, res) => {
  res.json(albums);
});
app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/artists', (req, res) => {
  res.json(artists);
});


app.get('/songs', (req, res) => {
  res.json(songs);
});


app.get('/audio/:songId', (req, res) => {
  const songId = req.params.songId;
  const song = songs.find(s => s.id === songId);
  
  if (song) {
    const filePath = path.join(__dirname, song.url); 
    res.sendFile(filePath);
  } else {
    res.status(404).send('Song not found');
  }
});

// Khởi động server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://192.168.1.12:${PORT}`);
});
