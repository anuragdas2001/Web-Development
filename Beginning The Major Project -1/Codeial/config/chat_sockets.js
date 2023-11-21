module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{
        cors:{
            origin:'*'
        }
    });


    io.sockets.on('connection',function(socket){
        console.log('new connection received',socket.id);

        socket.on('disconnect',function(){
            console.log('Socket Disconnected....!');
        })

        socket.on('join_room',function(data){
            console.log('join request received',data);
            socket.join(data.chatroom);

            //emiting in a specific chatroom
            io.in(data.chatroom).emit('user_joined',data);
        });

        socket.on('send_message',function(data){
            console.log('message received ....',data.message);
            io.in(data.chatroom).emit('receive_message',data);
        });


    });
}