

const { formatWithOptions } = require('util');

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


var preStr;
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected_');  

  socket.on('disconnect', (socket) => {
    console.log('disconnect')
  })


  
  socket.on('chat message', (msg) => {
    console.log(msg);
    
    
    if(msg === preStr || msg.length > 50){
      console.log("폐기")
      return
    }

    io.emit('chat message', msg);
    preStr = msg;
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});