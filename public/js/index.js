$(document).ready(function() {
	var socket = io.connect('/socket');
	socket.emit('connected');

	$('#create').submit(function(event) {
		var url = window.location.href;
		var directURL = url + 'chatroom/' + $('#createField').val();
		$(location).attr('href', directURL);
		return false;
	});

	$('#join').submit(function(event) {
		var url = window.location.href;
		var directURL = url + 'chatroom/' + $('#joinField').val();
		$(location).attr('href', directURL);
		return false;
	});

	socket.on('totalVisitors', function(total) {
		$('#totalVisitors').text('Total Online: ' + total);
	});

});
