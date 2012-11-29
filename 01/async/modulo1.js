/*
  Módulo Asincrono
  -----------------
  
  Imaginate que es una larga transacción, como una descarga, una petición a 
  una base de datos o alguna operación que requiere tiempo. Pero la operación
  debe de realizar datos con esos valores.

  No solo es de "agregar un callback", es mucho más complejo y por eso se
  recomienda hacer uso de ̣`process.nextTick` para que sea realmente "async"
  */ 'use strict';

var Modulo1 = module.exports;

Modulo1.doSomething = function(cb) {
    var s = 100;
    var iterations = 0;
    // while bloquea el loop *siempre* por lo tanto el siguiente código
    // es sincrono, aunque el nextTick propone de cierta manera una asyncronia
    while (--s) {
        iterations++;
    }
    // Hacer cambio para notar la diferencia
    // cb(iterations)

    // ò:
    
    process.nextTick(function(){
        cb(iterations);
    });
}