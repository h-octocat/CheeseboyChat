const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var clients = [];
var users = [null];
const ss = require("socket.io-stream");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/chat", (req, res) => {
  res.sendFile(__dirname + "/chat.html");
});
app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/admin.html");
});

io.on("connection", (socket) => {
  socket.on("kick", (usr) => {
    if (!users.includes(usr)) {
      return;
    }
    io.emit("chat message", `${usr} disconnected`);
    io.emit("being-kicked", usr);
    const index = clients.indexOf(usr);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});
io.on("connection", (socket) => {
  socket.on("user disconnected", (usr) => {
    console.log(`disconnect socket fired ${usr}`);
    io.emit("chat message", `${usr} disconnected`);
    const index = clients.indexOf(usr);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});
io.on("connection", (socket) => {
  socket.on("user connected", (msg) => {
    console.log(
      "client joined with data: cookie: " +
        msg["cookie"] +
        " name: " +
        msg["name"],
    );
    clients.push(msg);
  });
});

io.on("connection", (socket) => {
  ss(socket).on("image stream", (stream, data) => {
    console.log("Image received:", data.name);

    io.sockets.sockets.forEach((s) => {
      const newStream = ss.createStream();
      ss(s).emit("incoming image", newStream, data);
      stream.pipe(newStream);
    });
  });

  socket.on("chat message", async (msg) => {
    io.emit("chat message", msg);

    console.log("message: " + msg);
  });
});
io.on("connection", (socket) => {
  socket.on("user joined", (msg) => {
    console.log(socket.id + " joined chat with username" + msg);

    if (users.includes(msg)) {
      io.to(socket.id).emit("name wrong");
    } else {
      io.to(socket.id).emit("name right");
      io.emit("user joined", msg);
      users.push(msg);
      clients.push(msg);
    }
  });
});
io.on("connection", (socket) => {
  socket.on("get users", (msg) => {
    console.log(`sending ${clients}`);
    io.to(socket.id).emit("user returned", clients);
  });
});
io.on("connection", (socket) => {
  socket.on("user list", (msg) => {
    io.emit(users);
  });
});
server.listen(3000, async () => {
  console.log("listening on *:3000");
  await new Promise((r) => setTimeout(r, 1500));
  io.emit("being-kicked", "all");
});
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", (msg) => {
    io.emit("user left");
    console.log("user disconnected with socket id: " + msg);
  });
});
