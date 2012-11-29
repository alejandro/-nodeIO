/*
  (#nodeIO) Ejemplo #1 - Código Asíncrono
  -------------------------------
  Node propone e impulsa una forma más interesante de programación:
    - Orientada a Eventos y/o
    - Asincróna
  
  La architectura detrás de Node ofrece una serie de oportunidades para
  escribir código que sea altamente escalable y con poco consumo de recursos.
  
  Es por eso que el correcto entendimiento de las diferencias entre "async" y
  "sync" son importantes.
  */ 

// "use strict"; // Descomentar si no se quiere colores :)

var modulo1 = require('./modulo1'); // Asíncrono
var modulo2 = require('./modulo2'); // Síncrono


function logicaDelPrograma(type, next) {
  if (type === 'async') {
    /*
      Acción Asíncrona
      ================

      Básicamente se van "delegando" operaciones a varios "subprocesos"
      si mi respuesta depende de este "subproceso", pues el código se va 
      creando alredor de la respuesta de este subproceso.

      Pero cabe destacar, que las demás operaciones siguen normalmente, 
      sin esperar a que este "subproceso" muestre una respuesta
      */
    console.log('Esto es async:');
    modulo1.doSomething(function(cb){
        var iteraciones = cb;
        console.log('Se han realizado %d iteraciones.\n', iteraciones);
        next();
    })
    console.log('\033[36m','=> Las demás actividades continuan...','\033[39m');
  } else {
    /*
      Acción Síncrona
      ===============
    
      A diferencia de la versión async, esta espera a que la operación
      `modulo2#doSomething` termine. Lo que provoca grandes tiempos de
      espera y/o mayor consumo de recursos.
      */
    var iteraciones = modulo2.doSomething();
    console.log('Se realizó %d iteraciones', iteraciones);
  }
}


// Correr el programa
logicaDelPrograma('async', logicaDelPrograma.bind('next', 'sync'));
