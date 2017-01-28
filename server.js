var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

// wrap the express app in http server so Socket.io runs alongside express
var server = http.Server(app);
var io = socket_io(server);

io.on('connection', function (socket) {
    console.log('Client connected');

    socket.on('message', function (message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });
});

server.listen(process.env.PORT || 8080);

// app.listen(process.env.PORT || 8080);
console.log("server listening on local host 8080");
