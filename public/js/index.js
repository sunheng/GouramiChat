$(document).ready(function() {
	$(document).ready(function() {
		$('#create').submit(function(event) {
			var url = window.location.href;
			var direct_url = url + 'chatroom/' + $('#createField').val();
			$(location).attr('href', direct_url);
			return false;
		});	
		$('#join').submit(function(event) {
			var url = window.location.href;
			var direct_url = url + 'chatroom/' + $('#joinField').val();
			$(location).attr('href', direct_url);
			return false;
		});
	});
});