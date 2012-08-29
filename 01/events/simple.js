/*
  Eventos
  =======
  
  La gran mayoria de las features que Node provee estan basadas en dos cosas:
    - Eventos
    - Streams

  Como en Node no existe el concepto de DOM y todo lo relacionado al browser,
  los eventos  pueden tener el nombre que tu quieras simplemente llamando al
  método `emit` el cual envia a cada uno de los `listeners` (.on) la acción 
  a realizar.

  En Node casì todo esta basado en esto, piensa:

    server.on('request', ...)
    process.on('uncaughtException', ...)

    var stream = fs.createReadStream(...)
    stream.on('data', ...)

  Y aún más ...

  */
var events = require('events')
var EventEmitter = events.EventEmitter


var localEmitter = new EventEmitter()


// Métodos disponibles
// console.log(localEmitter.__proto__) 


localEmitter.once('PING', function(){
    localEmitter.emit('PONG')
})

localEmitter.on('hola', function(){
    console.log('Dijo hola en ', new Date)
    localEmitter.emit('PING')
})
localEmitter.on('PONG', function(){
    console.log('recibido, ping otra vez')
    localEmitter.emit('PING')
})

localEmitter.emit('hola')

