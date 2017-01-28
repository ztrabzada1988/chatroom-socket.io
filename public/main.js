$(document).ready(function () {
    // creates Manager object that allows automatic attempt to connect to server which allow you to send and receive messages
    var socket = io();
    var input = $('input');
    var messages = $('#messages');

    var addMessage = function (message) {
        messages.append('<div>' + message + '</div>');
    };

    input.on('keydown', function (event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        addMessage(message);
        // sends message to Socket.IO server. 1st Arg: what to call the sending item so we just call it 'message', 2nd Arg: The second argument is some data to attach to our message. In this case it's the contents of the text box.
        socket.emit('message', message);
        input.val('');
    });
    // listen for incoming messages/replies from server
    socket.on('message', addMessage);
});
