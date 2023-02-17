const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utilities/utilities');

const users = new Users();

io.on('connection', (client) => {

    console.log('User connected');

    client.on('enterChat', (data, callback) => {

        if( !data.name || !data.room ){
            return callback({
                error: true,
                message: 'Name is mandatory'
            });
        }

        client.join(data.room);

        users.addPerson( client.id, data.name, data.room );
        
        client.broadcast.to(data.room).emit('usersList', users.getPersonsByRoom(data.room) );
        client.broadcast.to(data.room).emit('createMessage', createMessage('Administrator', `${ data.name } has joined the chat`));


        callback(users.getPersonsByRoom(data.room));

    });

    client.on('createMessage', (data, callback) => {

        let person = users.getPerson(client.id);

        let message = createMessage( person.name, data.message );
    
        client.broadcast.to(person.room).emit( 'createMessage', message );

        callback(message);
    
    });

    client.on('disconnect', () => {

        let deletedUser = users.deletePerson( client.id );

        client.broadcast.to(deletedUser.room).emit('createMessage', createMessage('Administrator', `${ deletedUser.name } has left the chat`));
        client.broadcast.to(deletedUser.room).emit('usersList', users.getPersonsByRoom(deletedUser.room) );


    });

    //private msgs
    client.on('privateMessage', data => {

        let user = users.getPerson( client.id );
        client.broadcast.to(data.to).emit( 'privateMessage', createMessage( user.name, data.message ) );
    
    });

});