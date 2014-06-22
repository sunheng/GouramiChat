var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var io = require('socket.io').listen(app.listen(port));

io.set('log level', 1);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendfile('views/index.html');
});

app.get('/chatroom/:room', function(req, res) {
	res.sendfile('views/chatroom.html');
});

var events = require('./events')(app, io);
