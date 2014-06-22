$(document).ready(function() {
	var url = window.location.href;
	var chatroom = url.substring(url.indexOf('chatroom') + 9);
	var username;

	var socket = io.connect('/socket');

	$('#title').text("Welcome to " + chatroom + " chatroom!");
	$('.modal').modal('show');

	$('#register').submit(function(){
		username = $('#username').val();
		socket.emit('join', {
			"username" : username,
			"chatroom" : chatroom});
			$('.modal').modal('hide');
			return false;
	});

	$('#messagingForm').submit(function() {
		var message = $('#message').val();
		$('#chatWindow').append('<p><b>' + username + ':</b> '+ message + '</p>');
		$('#message').val('');
		socket.emit('message', message);
		var objDiv = document.getElementById("chatWindow");
		objDiv.scrollTop = objDiv.scrollHeight;
		return false;
	});

	socket.on('message', function(data) {
		$('#chatWindow').append('<p><b>' + data.username + ':</b> '+ data.message + '</p>');
		var objDiv = document.getElementById("chatWindow");
		objDiv.scrollTop = objDiv.scrollHeight;
	});

	socket.on('chatroomVisitors', function(total) {
		$('#chatroomVisitors').text("Total people in this chatroom: " + total);
	});
});
