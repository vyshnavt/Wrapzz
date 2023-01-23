const io = require('socket.io')(8080, {
    cors: {
      origins: ['ws://localhost:4200']
    }
});

let users=[]
function addUsers(userId,socketId){
  !users.some(user=> user.userId===userId) &&
  users.push({userId,socketId})
  
}

const removeUser=(socketId)=>{
  users=users.filter(user=> user.socketId!=socketId)
}

io.on('connection', (socket) => {
    console.log("user connected");
    socket.on('addUser',(userId)=>{
      addUsers(userId,socket.id)
      console.log(users);
      io.emit('getUsers',users)
    })

    socket.on('message',(message)=>{
      socketIdreciver=users.find(user => user.userId==message.reciverId)
      if(socketIdreciver!=undefined)
      io.to(socketIdreciver.socketId).emit('messagesend',message)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected');
      removeUser(socket.id)
    });

});


