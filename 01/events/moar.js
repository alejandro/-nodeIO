/**
 * Moar events
 * -------------------------
 * @author: Alejandro Morales <vamg008@gmail.com>
 * @license: MIT 2012 <http://ale.mit-license.org>
 */ 'use strict';

var fs  = require('fs');
var stream = require('stream');
var util = require('util');

var EventEmitter = require('events').EventEmitter;

function Reader(opciones) {
  if (!(this instanceof Reader)) return new Reader(opciones);
  EventEmitter.call(this);
  util._extend(this, opciones);
  return this;
}

util.inherits(Reader, stream.Stream);

Reader.prototype.hacerAlgo = function () {
  var self = this;
  setTimeout(function(){
    self.emit('done', 'He terminado ' + self.name);
  }, 1000);
  return this;
}

Reader.prototype.file = function (path) {
  var stream = fs.createReadStream(path);
  var self = this;
  stream.on('data', self.emit.bind(this, 'data'));
  stream.on('end', self.emit.bind(this, 'end'));
  stream.pipe(self).pipe(process.stdout);
  return this;
}

Reader.prototype.end = function () {
  console.log('done');
}
// Ejemplo
//========
var reader = Reader({name: 'Alejandro'});

var file = reader.file(__filename);;

var body = '';

file.on('data', function(data){
  body += data.toString();
});

file.on('end', function(){
  console.log('parsed file');
  console.log('------------------------\n');
  console.log(body)  ;  
});

