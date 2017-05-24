// Including libraries
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = __dirname;
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//static express middleware

app.use(express.static(publicPath));


// Listen for incoming connections from clients
io.on('connection', function (socket) {

	// Start listening for mouse move events
	socket.on('mousemove', function (data) {

		// This line sends the event (broadcasts it)
		// to everyone except the originating client.
		socket.broadcast.emit('moving', data);
	});


	socket.on('disconnect', () => {
    console.log('user was disconnected')
  	});
});

server.listen(port, () => {
  console.log(`Server is up on port : ${port}`);
});
