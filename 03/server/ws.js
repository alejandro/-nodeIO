
module.exports = function (servidor, cache){
  
  var sio = require('socket.io');
  var ws = sio.listen(servidor);

  ws.disable('log');
  // websocket, htmlfile, xhr-polling, jsonp-polling
  ws.on('connection', function (socket){
    socket.emit('ready',{title: 'Ready'});
    socket.on('imagen', function (imagen){
      cache[imagen.id] = imagen.data;
      socket.broadcast.emit('imagen', imagen);
    });
  });
};
