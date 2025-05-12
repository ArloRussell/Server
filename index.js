const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.compress('connection', (socket)=>{
    console.log('User Connected: ', socket.id);

    socket.on('message', (msg) => {
        console.log('Message received: ', msg);
        io.emit('message', msg); // Broadcast to all clients
    });

    socket.on('disconnect', ()=>{
        console.log('User disconnected: ', socket.id);
    })
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})