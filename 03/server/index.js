/**
 * Servidor para las conexiones WebSocket
 * ------------
 * desarrolloweb.com
 * Alejandro Morales
 */

var http = require('http');
var express = require('express');
var websockets = require('./ws');
var server = express();
var cache = {};

server.use(express.static(__dirname + '/../app'))


server.get('/:img', function (req, res){
  if (cache[req.params.img]) {
    res.setHeader('Content-Type','text/html');
    res.end('<img src="'+ cache[req.params.img] +  '">');
  } else {

    res.statusCode = 404;
    res.end('No encontrado');
  }
});

http.createServer(server).listen(process.env.PORT || 3000, function (){
  console.log('Servidor disponible en %d', this.address().port);
  websockets(this, cache);
});
