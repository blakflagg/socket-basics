var name = getQueryVariable('name') || 'unknown';
var room = getQueryVariable('room');


var socket = io();
var now = moment();
socket.on('connect',function(){
  console.log('connected to server');
  socket.emit('joinRoom', {
    name: name,
    room: room
  });

});

socket.on('message',function(message){

  var $messages = jQuery('.messages');
  var $message = jQuery('<li class="list-group-item"></li>');
  console.log('New Message: ');
  console.log(message.text);
  $message.append('<p><strong>' + message.name + ' ' + moment().local().utc(message.timestamp).format('h:mm a') + ' ></strong></p>' );
  $message.append('<p>' + message.text + '</p>');
  $messages.append($message);
  //jQuery('.messages').append('<p><strong>' +  moment().local().utc(message.timestamp).format('h:mm a') + ' > ' + '</strong>' + message.text +'</p>');

});

//handles submitting of new message
var $form = jQuery('#message-form');
var $roomName = jQuery('.room-title');

$roomName.text(room);

$form.on('submit', function(event){
  event.preventDefault();

  socket.emit('message',{
    name: name,
    text: $form.find('input[name=message]').val(),
    timestamp: now.valueOf('x')
  });

  $form.find('input[name=message]').val("");
});
