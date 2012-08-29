/*
  Stack Traces y named functions
  ==============================
  Basado en el Libro de Mixu
  Usa "named-functions", dan mejor reporte de errores:

    // Bien
    var miFuncion = function () {
        ...
    }

    // Excelente

    function miFuncion () {
        ...
    }

  */


// Unnamed
var UnaFuncion = function () { }

UnaFuncion.prototype.metodo = function () {
    console.trace()
}

// named function

function OtraFuncion () {}

OtraFuncion.prototype.metodo = function () {
    console.log('\nnamed function')
    console.trace()
}

var clase = new UnaFuncion()
var otraClase = new OtraFuncion()


clase.metodo()
otraClase.metodo()