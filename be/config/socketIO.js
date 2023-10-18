const { Server } = require('socket.io');
const { CLIENT_PORT } = process.env;

const io = new Server({
    cors: {
        origin: `http://localhost:${CLIENT_PORT}`,
    },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (data) => {
    socket.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
module.exports = io;
