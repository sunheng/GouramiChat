var gc = {
  totalVisitors: 0,
  chatroomVisitors: {}
};

module.exports = function(app, io) {
  var gouramiChat = io.of('/socket').on('connection', function (socket) {

    gc.totalVisitors++;

    socket.on('connected', function() {
      emitToAll('totalVisitors', gc.totalVisitors);
    });

    socket.on('join', function(data) {
      socket.join(data.chatroom);
      socket.chatroom = data.chatroom;
      socket.username = data.username;
      gc.chatroomVisitors[socket.chatroom] = gc.chatroomVisitors.hasOwnProperty(socket.chatroom) ? gc.chatroomVisitors[socket.chatroom] + 1 : 1;
      emitToAll('totalVisitors', gc.totalVisitors);
      emitToRoom(socket.chatroom, 'chatroomVisitors', gc.chatroomVisitors[socket.chatroom]);
    });

    socket.on('message', function(msg) {
      broadcastToRoom(socket.chatroom, 'message', {
        "username": socket.username,
        "message": msg
      });
    });

    socket.on('disconnect', function() {
      if (socket.hasOwnProperty('chatroom')) {
        gc.chatroomVisitors[socket.chatroom]--;
        emitToRoom(socket.chatroom, 'chatroomVisitors', gc.chatroomVisitors[socket.chatroom]);
      }
      gc.totalVisitors--;
      emitToAll('totalVisitors', gc.totalVisitors);
    });


    function emitToAll(event, data) {
      gouramiChat.emit(event, data);
    }

    function emitToRoom(room, event, data) {
      gouramiChat.in(room).emit(event, data);
    }

    function broadcastToRoom(room, event, data) {
      socket.broadcast.in(room).emit(event, data);
    }
  });
};
