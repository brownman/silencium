function debug(message) {
	$('#debug').append($('<p>').text(message));
	$('#debug-container').scrollTop($('#debug-container').scrollTop() + 300);
}

function error(message) {
	$('#error').html($('<p>').text(message));
}

function clear_errors() {
	$('#error').empty();
}

function chat_message(username, message, class) {
	if (!class) {
		var class = '';
	}
	
	var now = new Date();
	$('.chat-box > tbody:last').append(
		$('<tr>').
			append($('<td>').text(now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds())).
			append($('<td>').text(username)).
			append($('<td>').text(message)
		).addClass(class)
	);
	
	if ($('.chat-box tr').size() > 8) {
		$('.chat-box tr').first().remove();
	}
}

$(document).ready(function() {
	var ws = new WebSocket("ws://localhost:3001");
	var server = new ServerEventDispatcher(ws);
	
	var giver = false;
	
	// init
	
	$('.container').hide();
	$('.exception').hide();
	$('.guest').show();
	
	// debug
	
	server.bind('alert', function(event) {
		alert(event.message);
	});
	
	server.bind('debug', function(event) {
		debug(event.message);
	});
	
	// connect
	
	server.bind('connect', function(event) {
	});
	
	// close (ws)
	
	server.bind('close', function(event) {
		$('#game-container').hide();
		$('.exception').hide();
		$('#fatal-error').show();
		debug("Error: Websocket closed");
	});
	
	// join
	
	$('#join-form').submit(function() {
		server.trigger('join', {
			username: $('#join-username').val()
		});
		return false;
	});
	
	server.bind('join', function(event) {
		if (!event.accepted) {
			error("Could not join: [" + event.message + "]");
			return;	
		}
		
		clear_errors();
		$('.container').hide();
		$('.player').show();
		
		server.trigger('users');
	});
	
	// guess
	
	$('#guess-form').submit(function() {
		server.trigger('guess', {
			word: $('#guess-word').val()
		});
		$('#guess-word').val('');
		return false;
	});
	
	server.bind('guess', function(event) {
		chat_message(event.username, event.word);
	});
	
	// give
	
	$('#give-form').submit(function() {
		server.trigger('give', {
			hint: $('#give-hint').val()
		});
		$('#give-hint').val('');
		return false;
	});
	
	server.bind('give', function(event) {
		chat_message(event.username, event.hint, 'giver');
	});
	
	// users
	
	server.bind('users', function(event) {
		$('#users').empty();
		$.each(event.users, function(key, user) {
			var class = user.giver ? 'giver' : '';
			$('#users').append($('<li>').text(user.name).addClass(class));
		});
	});
	
	// pause
	
	server.bind('pause', function(event) {
		$('#game-container').hide();
		$('#pause').show();
	});
	
	// unpause
	
	server.bind('unpause', function(event) {
		$('.exception').hide();
		$('#game-container').show();
	});
	
	// become giver
	
	server.bind('become_giver', function(event) {
		// if we are are already giver
		// do nothing
		if (giver) {
			return;
		}
		
		giver = true;
		
		$('.container').hide();
		$('.giver').show();
	});
	
	// become player
	
	server.bind('become_player', function(event) {
		giver = false;
		
		$('.container').hide();
		$('.player').show();
	});
});
