var socket = io();

var params = new URLSearchParams( window.location.search );

if ( !params.has('name') || !params.has('room') ) {
    window.location = 'index.html';
    throw new Error('Name and room are mandatory');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function() {
    console.log('Connected to the server');
    
    socket.emit('enterChat', user, function( resp ){
        console.log('connected users', resp);
    });
});



// listen
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


/* // Send Information
socket.emit('sendMessage', {
    user: 'Fernando',
    message: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
}); */

// Escuchar información
socket.on('createMessage', function(message) {
    console.log('Servidor:', message);
});

//Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('usersList', function(users) {
    console.log(users);
});

socket.on('privateMessage', function(message) {
    console.log('Private Message:', message);
})