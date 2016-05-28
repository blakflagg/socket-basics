var socket = io();
var now = moment();
socket.on('connect',function(){
  console.log('connected to server');

});

socket.on('message',function(message){


  console.log('New Message: ');
  console.log(message.text);
  console.log( now.format('h:mm a'));
  jQuery('.messages').append('<p>'+'<strong>' +  moment().local().utc(message.timestamp).format('h:mm a') + ' > ' + '</strong>' + message.text +'</p>');

});

//handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event){
  event.preventDefault();

  socket.emit('message',{
    text: $form.find('input[name=message]').val(),
    timestamp: now.valueOf('x')
  });

  $form.find('input[name=message]').val("");
});
