var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var io = require('socket.io').listen(app.listen(port));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendfile('views/index.html');
});

app.get('/chatroom/:room', function(req, res) {
	res.sendfile('views/chatroom.html');
});

io = io.of('/socket').on('connection', function (socket) {
	
	socket.on('join', function(data) {
		socket.join(data.chatroom);
		socket.chatroom = data.chatroom;
		socket.username = data.username;
	});

	socket.on('message', function(msg) {
		io.in(socket.chatroom).emit('message', {
			username : socket.username,
			message : msg
		});
	});
});