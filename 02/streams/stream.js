/**
 * Streams
 * ------------
 * Streams son parte importante de node, por ejemplo una petición por parte 
 * de un usuario en un servidor (req) es un stream ya qu el usuario esta mandando
 * información o archivos (uploads). El leer un archivo de un sistema es un stream,
 + el stdin y stdout y muchas otras cosas más. 
 *
 * Los streams siempre estan acompañados por eventos, tales como:
 *   'data', 'end', 'error', 'drain', 'pipe', cada uno de ellos con una función 
 * especifica a la situación en que se ejecutan.
 * 
 * Los streams pueden ser escritura, de lectura o ambos, es importante que tú
 * especifiques el tipo.
 *
 * Por ejemplo:
 */ 'use strict';


var Stream = require('stream');



function MiStream (){ // ejemplo de https://github.com/substack/stream-handbook

  var s = new Stream();
  s.readable = true; // definirlo de lectura

  var veces = 0;
  var iv = setInterval(function () {
      s.emit('data', veces + '\n'); // enviar un "chunk" de datos
      if (++veces === 5) {
          s.emit('end'); // terminar el stream
          clearInterval(iv); // eliminar el intervalo
      }
  }, 1000);

  return s;
}
/*
 * `pipe` es un técnica proveniente de unix, el cual simplemente crea desvios de
 * la información a otros destinos. Por ejemplo:
 *
 *   $ cat file.txt | grep 'busqueda' | echo $1
 * 
 * En node (en otras palabras pipe es | en UNIX):
 *    stream.pipe(destino1).pipe(destino2).pipe(destino3)
 */

MiStream().pipe(process.stdout);
