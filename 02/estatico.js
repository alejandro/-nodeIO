/**
 * #nodeIO Cap.2 
 * -------------------------
 * @author: Alejandro Morales <vamg008@gmail.com>
 * @license: MIT 2012 <http://ale.mit-license.org>
 */ 'use strict';

var fs = require('fs');
var path = require('path');
var url = require('url');
var mime = require('mime');

/**
 * serveDirectory(req<object>, res<object>)
 * ----------------------------------------
 *
 * Esta función simplemente lee un directorio, busca por un `index.html` si lo haya
 * crea el stream de este archivo directamente al navegador. Caso contrario, si no 
 * hay un `index.html` crea un texto con formato json y lo envia al navagador.
 * Se modifica el header para especificar el tipo de respuesta que estamos dando (mime)
 * Si hay error en cualquier punto la petición es terminada. 
 *
 * `error.code` hace referencia a la nomenclatura utilizada por POSIX para definir error.
 * Algunos de los errores más comunes son:
 *
 * - ENOENT: No existe el archivo
 * - EACCES: No se tiene permiso para realizar esa operación
 * - ERSCHR: No se puede encontrar esa dirección
 * - EADDRINUSE: El puerto que estas tratando de utilizar no esta disponible
 * - ECONNREFUSED: No se pudo conectar a esa dirección
 * -----
 */
function serveDirectory(req, res) {
  fs.readdir(req.fpath, function (error, files) {
    if (error && error.code === 'ENOENT') return res.error(404, 'no encontrado');
    if (error) return res.error(500, error);
    if (~files.indexOf('index.html')) {
      req.fpath += '/index.html';
      req.mime = 'text/html';
      return streamFile(req, res);
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      dir: req.fpath,
      files: files
    }, null, 2));
  });
}


/**
 * streamFile( req<object>, res<object>)
 * -------------------------------------
 * Esta función simplemente crea un stream de lectura. La ventaja de utilizar
 * este método en vez de estar leyendo el archivo y luego enviarlo al usuario, es
 * que mediante streams se puede crear un "desvio" (pipe) hacia otro destino, en 
 * este caso hacia la respuesta del servidor. Con esto, es como que el navegador 
 * estuviera leyendo directamente el archivo, además evita cargar en memoria el 
 * archivo.
 *
 * La variable `stream` en esta función es una instancia de `Stream` pero además
 * tiene la habilidad de producir eventos ('error', 'data', 'end', ...). El único
 * que nos importa es `error` pues este podria causar que nuestro servidor muriera.
 * 
 * `pipe` es un técnica proveniente de unix, el cual simplemente crea desvios de
 * la información a otros destinos. Por ejemplo:
 * 
 *    stream.pipe(destino1).pipe(destino2).pipe(destino3)
 * 
 */
function streamFile(req, res) {
  var stream = fs.createReadStream(req.fpath);
  stream.on('error', function (error){
    res.error(500, error);
  });
  res.setHeader('Content-Type', req.mime);
  stream.pipe(res);
}

/**
 * Estatico 
 * ---------
 * Esta función es ejecutada cada vez que un usuario hace una petición al servidor
 * Básicamente se encarga de crear algunos `helpers` o alias como `res.error` que
 * permite terminar la petición cuando hay un error.
 *
 * req.mime: es el tipo del contenido de nuestra respuesta, por default es: 
 * `text/plain`. Por esta razón es necesario cambiarla.
 *
 * `fs.stat`: nos ayuda a determinar las propiedades del recurso solicitado por 
 * el usuario, pero en este caso nos dice si el recurso es un directorio o un 
 * archivo para así, poder nosotros, tomar la decisión si mostrar los archivos
 * o enviar el archivo al usuario.
 */
function Estatico(req, res) {
  req.uri = url.parse(req.url).pathname;
  req.fpath = path.resolve(global.wpath, '.' + req.uri);
  req.mime = mime.lookup(req.fpath) ||  'application/json';
  res.error = function (code, msg){
    if (msg instanceof Error) msg = msg.stack.toString() ;
    res.statusCode = code || 500;
    res.end(msg || 'internal server error');
  }

  if (req.uri == '/') {
    return serveDirectory(req, res);
  }
  else {
    fs.stat(req.fpath, function (error, stats){
      if (error && error.code === 'ENOENT') return res.error(404, 'not found');
      if (error) return res.error(500, error)
      if (stats.isDirectory()) return serveDirectory(req, res);
      return streamFile(req, res);
    });
  }
}

module.exports = Estatico; 
