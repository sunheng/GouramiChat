module.exports = function(app, io) {
	var gourami_room = io.of('/socket').on('connection', function (socket) {

		socket.on('join', function(data) {
			socket.join(data.chatroom);
			socket.chatroom = data.chatroom;
			socket.username = data.username;
		});

		socket.on('message', function(msg) {
			socket.broadcast.in(socket.chatroom).emit('message', {
				username : socket.username,
				message : msg
			});
		});
	});
};