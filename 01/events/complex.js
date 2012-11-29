/*
  Eventos
  =======
  
  La gran mayoria de las features que Node provee estan basadas en dos cosas:
    - Eventos
    - Streams

  Como en Node no existe el concepto de DOM y todo lo relacionado al browser,
  los eventos  pueden tener el nombre que tu quieras simplemente llamando al
  método `emit` ($.trigger) el cual envia a cada uno de los `listeners` (.on) ($.bind) la acción 
  a realizar.

  En Node casì todo esta basado en esto, piensa:

    server.on('request', ...)
    process.on('uncaughtException', ...)

    var stream = fs.createReadStream(...)
    stream.on('data', ...)

  Y así...

  */ 'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');


function MiGeneradorDeEventos(opciones) {
  if (!(this instanceof MiGeneradorDeEventos)) return new MiGeneradorDeEventos(opciones);
  EventEmitter.call(this);
  util._extend(this, opciones);
  return this;
}

util.inherits(MiGeneradorDeEventos, EventEmitter);

MiGeneradorDeEventos.prototype.hacerAlgo = function () {
  var self = this;
  setTimeout(function(){
    self.emit('done', 'He terminado ' + self.name);
  }, 1000);
  return this;
}



var events = new MiGeneradorDeEventos({name: 'Alejandro'});
var hook   = events.hacerAlgo();

hook.on('done', console.log.bind('this'));
