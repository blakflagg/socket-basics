const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/public'));

http.listen(PORT,function(){
  console.log('Server Started');
});
