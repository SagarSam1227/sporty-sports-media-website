import { Server } from 'socket.io';
import { server } from '../../../app';
import user from '../../../entities/user';


const socketIoConfig =()=>{
    const io = new Server(server,{
        pingTimeout:60000,
        cors:{
            origin:'http://localhost:5173'
        }
    })
    
    io.on("connection",(socket)=>{
        console.log('connected to socket.io');

        socket.on('setup',(userData)=>{
            socket.join(userData._id)
            socket.emit('connected')
        })

        socket.on('join chat',(room)=>{
            socket.join(room)
            console.log('user joined room ',room);
            
        })
  
        socket.on('new message',(newMessageRecieved)=>{
            var chat = newMessageRecieved.chat;
            console.log(chat,'chattt');
            
            if(!chat.members) return console.log('chat.users not defined');

            chat.members.forEach((user: { membersId: string | string[]; }) => {
                if(user.membersId==newMessageRecieved.sender._id) return;

                socket.in(user.membersId).emit("message recieved",newMessageRecieved)
            });
            
        })

        socket.on('send peer-id',(peerId,hearerId)=>{
            console.log(peerId,'this is that...... ');
            console.log(hearerId,'hearer id.....');
            
            socket.in(hearerId).emit('peer-id recieved',peerId)
            
        }) 
        
    })

}

export default socketIoConfig;