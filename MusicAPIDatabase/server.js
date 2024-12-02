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
function modifySongList(action) {
  return (req, res) => {
    const userId = req.params.userId;
    const { songId } = req.body;

    const user = users.find((u) => u.id === userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const list =
      action === "like" ? user.profile.likedSongs : user.profile.songDownloaded;

    if (req.method === "POST") {
      if (list.includes(songId)) {
        return res.status(400).json({ message: "Song already in list" });
      }
      list.push(songId);
    } else if (req.method === "DELETE") {
      const index = list.indexOf(songId);
      if (index === -1) {
        return res.status(400).json({ message: "Song not in list" });
      }
      list.splice(index, 1);
    }

    // Cập nhật tệp JSON
    fs.writeFileSync("./data/user.json", JSON.stringify(users, null, 2));
    const message =
      req.method === "POST"
        ? `Song added to ${action === "like" ? "liked" : "downloaded"} list`
        : `Song removed from ${
            action === "like" ? "liked" : "downloaded"
          } list`;
    res.status(200).json({ message });
  };
}

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
app.post("/users/:userId/songDownloaded", modifySongList("download"));
app.delete("/users/:userId/songDownloaded", modifySongList("download"));

app.post("/users/:userId/likedSongs", modifySongList("like"));
app.delete("/users/:userId/likedSongs", modifySongList("like"));

// Route để xử lý đăng ký người dùng
app.post("/users/signup", (req, res) => {
  const { username, password, email, phone } = req.body;

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const newUser = {
    id: String(users.length + 1),
    username,
    password,
    email,
    phone,
    profile: {
      displayName: username,
      avatar: "default_avatar_url",
      playlists: [],
      likedSongs: [],
      songDownloaded: [],
    },
    balance: 0,
  };

  users.push(newUser);
  fs.writeFileSync("./data/user.json", JSON.stringify(users, null, 2));

  res.status(201).json({ message: "User created successfully", user: newUser });
});

// API trả về danh sách artist đã follow của người dùng
app.get("/user/:userId/followed-artists", (req, res) => {
  const userId = req.params.userId;
  const user = users.find((u) => u.id === userId); 
  if (user) {
    const followedArtists = artists.filter((artist) =>
      user.profile.listArtistFollowed.includes(artist.id)
    );
    res.json(followedArtists);
  } else {
    res.status(404).send("User not found");
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://192.168.1.12:${PORT}`);
});
