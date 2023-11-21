class ChatEngine{
    constructor(chatBoxId,userEmail,userName){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.userName = userName;
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionhandler();
        }
    }
    connectionhandler(){

        let self = this;


        this.socket.on('connect',function(){
            console.log('Connection established using socket....!');

            self.socket.emit('join_room',{
                user_email: self.userEmail,
                user_name:self.userName,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined',function(data){
                console.log('A user joined!',data);
                

            })
        });

        //Send a message on clicking the send message button
        $('#send-button').click(function(e){
            e.preventDefault();
            console.log('Send Button CLicked!');
            let msg = $('#chat-message-input').val();

            if(msg!=''){
                self.socket.emit('send_message',{
                    message: msg,
                    user_email: self.userEmail,
                    user_name:self.userName,
                    chatroom: 'codeial'
                });
                
            }
        
        
        });

        self.socket.on('receive_message',function(data){
            console.log('message received',data.message);
           
            let newMessage = $('<li>');
            let messageType = 'other-message';

            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }
            newMessage.append($('<span>',{
                'html':data.message
            }));
            // console.log('data.user_name',data.user_name);
            newMessage.append($('<small>',{
                'html':data.user_name
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
            $('#chat-message-input').val('');
        })

    }
}