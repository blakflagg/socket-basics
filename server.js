const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var now = moment();

app.use(express.static(__dirname + '/public'));
var clientInfo = {};

io.on('connection',function(socket){
  console.log('user connected via socket.io!');

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
    //socket.broadcast.emit('message', message); //sends the message to all except the sender
    message.timestamp = moment().valueOf();
    io.to(clientInfo[socket.id].room).emit('message', message);
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
