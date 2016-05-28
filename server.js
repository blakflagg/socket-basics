const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection',function(){
  console.log('user connected via socket.io!');
}); //listen for events

http.listen(PORT,function(){
  console.log('Server Started');
});
