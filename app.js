var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var io = require('socket.io').listen(app.listen(port));

io.set('log level', 1);

app.use(express.static(__dirname + '/public'));

var routes = require('./routes') (app);

var events = require('./events') (app, io);
