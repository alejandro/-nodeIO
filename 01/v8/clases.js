/*
  "Clases"
  Nota: en JS no existen clases, pero es muy sencillo crear el mismo
  comportamiento con prototype.

  Las utilidades y beneficios son muchas (namespace, poca contaminación del global, etc...)
  */ 'use strict';

module.exports = Punto;

var util = require('util');

function Punto(coordenadas) {
    /*
      En este tipo de funciones es importante mantener el `this` con la
      referencia correcta, además evita que el usuario de nuestro código
      haga uso de `new`, lo cual no es lindo. ;)
      */
    if (!(this instanceof Punto)) return new Punto(coordenadas);

    // Copiar las coodenadas a `this`
    util._extend(this, coordenadas);
}

Punto.fn = Punto.prototype;

/*
  ¿Porque `__defineGetter__` y no `prototype`?
  Estos son métodos que es innecesarios como funciones. 
  La otra forma de escribir este mismo código es:

    Punto.fn.distancia = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }

  Pero al momento de llamarlo seria:

    `punto.distancia()` en vez de `punto.distancia`

  */
Punto.fn.__defineGetter__('distancia', function(){
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
});

Punto.fn.__defineGetter__('area', function(){
    return (0.5 * Number(this.x) * Number(this.y));
});


Punto.fn.extend = function(coordenada, mas) {
    if (!this[coordenada]) throw new TypeError('Coordenada Inválida');
    this[coordenada] += mas;
    return this;
}

// TEST:
// var punto = Punto({x: 1, y: 2, z: 3})

// console.log(punto)
// console.log(punto.distancia)
// console.log(punto.area)