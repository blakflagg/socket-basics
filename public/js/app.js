var socket = io();

socket.on('connect',function(){
  console.log('connected to server');
});
