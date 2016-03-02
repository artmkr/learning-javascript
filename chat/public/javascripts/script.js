var socket = io();

var name = prompt('chose name', 'noname');

socket.emit('init', name);

$('form').submit(function() {
    socket.emit('message', $('#m').val());
    $('#m').val('');
    return false;
});
socket.on('message', function(msg) {
    $('#messages').append($('<li>').text(msg.name + ':' + msg.message));
});