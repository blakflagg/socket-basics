const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var now = moment();

app.use(express.static(__dirname + '/public'));
var clientInfo = {};
// Sends current users to provided socket
function sendCurrentUsers(socket){
  var info = clientInfo[socket.id];
  var users = [];

  if(typeof info === 'undefined'){
    return;
  }

  Object.keys(clientInfo).forEach(function(socketId){
    var userInfo = clientInfo[socketId];
    if(info.room === userInfo.room){
      users.push(userInfo.name);
    }
  });

  socket.emit('message', {
    name: 'System',
    text: 'Current users: ' + users.join(', '),
    timestamp: moment().valueOf()
  })
}

io.on('connection',function(socket){
  console.log('user connected via socket.io!');

  socket.on('disconnect', function(){
    var userData = clientInfo[socket.id];

    if(typeof userData !== 'undefined'){
      socket.leave(userData.room);
      io.to(userData.room).emit('message',{
        name: 'System',
        text: userData.name + ' has left the room.',
        timestamp: moment().valueOf()
      });
      delete userData;
    }
  });
  socket.on('joinRoom', function(req){
    clientInfo[socket.id] = req;
    socket.join(req.room);
    socket.broadcast.to(req.room).emit('message', {
      name: 'SYSTEM',
      text: req.name + ' has joined',
      timestamp: now.valueOf('x')
    });
  });

  socket.on('message', function(message){
    console.log('Message received ' + moment().local().utc(message.timestamp).format('h:mm a') + '> ' + message.text);
    if(message.text === '@currentUsers'){
      sendCurrentUsers(socket);
    }else{
      //socket.broadcast.emit('message', message); //sends the message to all except the sender
      message.timestamp = moment().valueOf();
      io.to(clientInfo[socket.id].room).emit('message', message);
    }

  });

  socket.emit('message',{
    name: 'SYSTEM',
    text: 'Welcome to the chat application',
    timestamp: now.valueOf('x')
  });
}); //listen for events

http.listen(PORT,function(){
  console.log('Server Started');
});
