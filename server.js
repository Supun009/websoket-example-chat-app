const express = require('express');
const http = require('http');
const socketIo  = require('socket.io')
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

const user = {}

io.on('connection', socket => {
    socket.on('new-user', userName => {
        user[socket.id] = userName;
        socket.broadcast.emit('new-user-connected', userName)

    });


    socket.on('message-sent', message => {
        socket.broadcast.emit('message-sent', {message: message, user:user[socket.id]})
        
    });

    socket.on('disconnect', ()=> {
        socket.broadcast.emit('user-disconnect', user[socket.id]);
        delete user[socket.id];
    })
});



server.listen(PORT, ()=> {
    console.log(`server running at ${PORT}`)
})