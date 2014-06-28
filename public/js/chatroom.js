$(document).ready(function() {
	var url = window.location.href;
	var chatroom = url.substring(url.indexOf('chatroom') + 9);
	var username;

	var socket = io.connect('/socket');

	$('.modal').modal('show');

	$('#title').text('Welcome to ' + chatroom + ' chatroom!');

	$('#register').submit(function(){
		username = $('#username').val();
		socket.emit('join', {
			"username": username,
			"chatroom": chatroom
		});
		$('.modal').modal('hide');
		return false;
	});

	$('#messagingForm').submit(function() {
		var message = $('#message').val();
		$('#chatWindow').append('<p><b>' + username + ':</b> '+ escapeHtml(message) + '</p>');
		$('#message').val('');
		socket.emit('message', message);
		scrollDown(document.getElementById('chatWindow'));
		return false;
	});

	socket.on('message', function(data) {
		$('#chatWindow').append('<p><b>' + data.username + ':</b> '+ escapeHtml(data.message) + '</p>');
		scrollDown(document.getElementById('chatWindow'));
	});

	socket.on('chatroomVisitors', function(total) {
		$('#chatroomVisitors').text('Total people in this chatroom: ' + total);
	});

});

function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function scrollDown(obj) {
	obj.scrollTop = obj.scrollHeight;
}
