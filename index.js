//  Node server which will handle Socket.io connections
// const io = require('socket.io')(8000);

const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users = {};

io.on('connection', socket =>{

    socket.on('new-user-joined', name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message =>{
        // console.log(message);
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
})