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
		$('.dialog').append('<b><p class="positiveAlert">' + username + ' is connected.</p></b>');
		scrollDown($('.dialog'));
		return false;
	});

	$('#messagingForm').submit(function() {
		var message = $('#message').val();
		$('.dialog').append('<p><b>' + username + ':</b> '+ escapeHtml(message) + '</p>');
		$('#message').val('');
		socket.emit('message', message);
		scrollDown($('.dialog'));
		return false;
	});

	socket.on('message', function(data) {
		$('.dialog').append('<p><b>' + data.username + ':</b> '+ escapeHtml(data.message) + '</p>');
		scrollDown($('.dialog'));
	});

	socket.on('chatroomVisitors', function(total) {
		$('#chatroomVisitors').text('Total people in this chatroom: ' + total);
	});

	socket.on('connectedToRoom', function (username) {
		$('.dialog').append('<b><p class="positiveAlert">' + username + ' is connected.</p></b>');
		scrollDown($('.dialog'));
	});

	socket.on('disconnectedFromRoom', function (username) {
		$('.dialog').append('<b><p class="negativeAlert">' + username + ' has disconnected.</p></b>');
		scrollDown($('.dialog'));
	});

});

function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function scrollDown($obj) {
	$obj[0].scrollTop = $obj[0].scrollHeight;
}
