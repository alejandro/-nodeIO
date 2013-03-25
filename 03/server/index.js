/**
 * Servidor para las conexiones WebSocket
 * ------------
 * desarrolloweb.com
 * Alejandro Morales
 */

var http = require('http');
var express = require('express');
var websockets = require('./ws')
var server = express();

server.use(express.static(__dirname + '/../app'))


http.createServer(server).listen(process.env.PORT || 3000, function (){
  console.log('Servidor disponible en %d', this.address().port)
  websockets(this)
})
