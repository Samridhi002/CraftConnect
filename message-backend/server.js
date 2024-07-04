const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve Socket.IO client
app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(require.resolve('socket.io-client/dist/socket.io.js'));
});

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Store connected users
const users = new Map();

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (username) => {
    users.set(socket.id, username);
    io.emit('userJoined', username);
  });

  socket.on('sendMessage', (message) => {
    const username = users.get(socket.id);
    io.emit('message', { username, message });
  });

  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    io.emit('userLeft', username);
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3001;  // Changed to 3001
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));