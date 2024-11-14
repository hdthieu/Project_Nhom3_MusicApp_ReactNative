const express = require("express");
const cors = require("cors");
const path = require("path");
const albums = require("./data/album.json");
const artists = require("./data/artist.json");
const songs = require("./data/songs.json");
const users = require("./data/user.json");
const app = express();
const PORT = 3000;

// Sử dụng CORS để cho phép kết nối từ ứng dụng React Native
app.use(
  cors({
    origin: "*",
  })
);

app.get("/albums", (req, res) => {
  res.json(albums);
});
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/artists", (req, res) => {
  res.json(artists);
});

app.get("/songs", (req, res) => {
  res.json(songs);
});

app.get("/audio/:songId", (req, res) => {
  const songId = req.params.songId;
  const song = songs.find((s) => s.id === songId);

  if (song) {
    const filePath = path.join(__dirname, song.url);
    res.sendFile(filePath);
  } else {
    res.status(404).send("Song not found");
  }
});
// API trả về danh sách bài hát đã tải về của người dùng
app.get("/user/:userId/downloaded-songs", (req, res) => {
  const userId = req.params.userId;
  const user = users.find((u) => u.id === userId); // Tìm người dùng dựa trên userId

  if (user) {
    // Lọc các bài hát đã tải về dựa trên id trong `songDownloaded`
    const downloadedSongs = songs.filter((song) =>
      user.profile.songDownloaded.includes(song.id)
    );
    res.json(downloadedSongs); // Trả về danh sách bài hát đã tải về
  } else {
    res.status(404).send("User not found"); // Nếu không tìm thấy người dùng
  }
});

// Khởi động server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://192.168.1.12:${PORT}`);
});
