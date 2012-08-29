/*
  Módulo Sincrono
  -----------------
  
  Imaginate que es una larga transacción, como una descarga, una petición a 
  una base de datos o alguna operación que requiere tiempo.
  */

var Modulo2 = module.exports

Modulo2.doSomething = function() {
    var s = 100
    var iterations = 0;
    while (--s) {
        iterations++
    }
    console.log('Esto es sincrono:')
    return iterations
}