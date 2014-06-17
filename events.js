var totalVisitors;
var chatroomVisitors = {};

module.exports = function(app, io) {
	var gouramiChat = io.of('/socket').on('connection', function (socket) {

		totalVisitors = totalVisitors === undefined ? 1 : totalVisitors + 1;

		socket.on('join', function(data) {
			socket.join(data.chatroom);
			socket.chatroom = data.chatroom;
			socket.username = data.username;
			chatroomVisitors[socket.chatroom] = chatroomVisitors.hasOwnProperty(socket.chatroom) ? chatroomVisitors[socket.chatroom] + 1 : 1;
			gouramiChat.emit('totalVisitors', totalVisitors);
			gouramiChat.in(socket.chatroom).emit('chatroomVisitors', chatroomVisitors[socket.chatroom]);
		});

		socket.on('message', function(msg) {
			socket.broadcast.in(socket.chatroom).emit('message', {
				"username" : socket.username,
				"message" : msg
			});
		});

		socket.on('connected', function() {
			gouramiChat.emit('totalVisitors', totalVisitors);
		});

		socket.on('disconnect', function() {
			if (socket.hasOwnProperty('chatroom')) {
					chatroomVisitors[socket.chatroom]--;
					gouramiChat.in(socket.chatroom).emit('chatroomVisitors', chatroomVisitors[socket.chatroom]);
			}
			totalVisitors = totalVisitors === undefined ? 1 : totalVisitors - 1;
			gouramiChat.emit('totalVisitors', totalVisitors);
		});

	});
};
