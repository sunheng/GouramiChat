$(document).ready(function() {
	var url = window.location.href;
	var chatroom_name = url.substring(url.indexOf('chatroom') + 9);
	var username;

	var socket = io.connect('/socket');

	$('#title').text("Welcome to " + chatroom_name);
	$('.modal').modal('show');

	$('#register').submit(function(){
		username = $('#username').val();
		socket.emit('join', { 
			username : username,
			chatroom : chatroom_name});
		$('.modal').modal('hide');
		return false;
	});

	$('#messagingForm').submit(function() {
		var message = $('#message').val();
		$('#chatWindow').append('<p><b>' + username + ':</b> '+ message + '</p>');
		$('#message').val('');
		socket.emit('message', message);
		return false;
	});

	socket.on('message', function(data) {
		$('#chatWindow').append('<p><b>' + data.username + ':</b> '+ data.message + '</p>');
		var objDiv = document.getElementById("chatWindow");
		objDiv.scrollTop = objDiv.scrollHeight;
	});	
});