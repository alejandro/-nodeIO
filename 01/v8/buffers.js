/*
  Buffers
  V8 provee de nuevos métodos con Buffer, un buffer es una porción de datos
  (binarios), lo cual los hacen más fácil y rápido de transportar entre instancias

  */

var buff = new Buffer('Alejandro Morales', 'utf8')

buff.write(' es cool :)', buff.length - 1)

var encodedBuff = buff.toString('utf8')

console.log(encodedBuff)

var buf = new Buffer(256);
var len = buf.write('\u00bd + \u00bc = \u00be', 0);
console.log(len + " bytes: " + buf.toString('utf8', 0, len));