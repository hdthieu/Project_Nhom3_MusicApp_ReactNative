const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const albums = require("./data/album.json");
const artists = require("./data/artist.json");
const songs = require("./data/songs.json");
const users = require("./data/user.json"); // Thay đổi này sẽ được lưu lại trong tệp JSON
const app = express();
const PORT = 3000;

// Sử dụng CORS để cho phép kết nối từ ứng dụng React Native
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json()); // Để parse JSON từ request body

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

// Route để thêm bài hát vào danh sách yêu thích
app.post("/users/:userId/likedSongs", (req, res) => {
  const userId = req.params.userId;
  const { songId } = req.body;

  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(404).send("User not found");

  // Kiểm tra nếu bài hát đã có trong danh sách yêu thích
  if (user.profile.likedSongs.includes(songId)) {
    return res.status(400).send("Song already liked");
  }

  // Thêm bài hát vào danh sách
  user.profile.likedSongs.push(songId);
  fs.writeFileSync("./data/user.json", JSON.stringify(users, null, 2)); // Cập nhật file JSON
  res.status(200).send("Song added to liked songs");
});

// Route để xóa bài hát khỏi danh sách yêu thích
app.delete("/users/:userId/likedSongs", (req, res) => {
  const userId = req.params.userId;
  const { songId } = req.body;

  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(404).send("User not found");

  // Kiểm tra nếu bài hát không có trong danh sách yêu thích
  if (!user.profile.likedSongs.includes(songId)) {
    return res.status(400).send("Song not in liked songs");
  }

  // Xóa bài hát khỏi danh sách
  user.profile.likedSongs = user.profile.likedSongs.filter(
    (id) => id !== songId
  );
  fs.writeFileSync("./data/user.json", JSON.stringify(users, null, 2)); // Cập nhật file JSON
  res.status(200).send("Song removed from liked songs");
});

// Khởi động server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://192.168.1.12:${PORT}`);
});
