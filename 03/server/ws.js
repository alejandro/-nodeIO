
module.exports = function (servidor){
  
  var sio = require('socket.io');
  var ws = sio.listen(servidor);

  // websocket, htmlfile, xhr-polling, jsonp-polling
  ws.on('connection', function (socket){
    socket.emit('ready',{title: 'Ready'})
    socket.on('imagen', function (imagen){
      socket.broadcast.emit('imagen', imagen)
    })
  })

};
