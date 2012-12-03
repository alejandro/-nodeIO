  /**
   * El módulo fs.
   * -------------
   * Cosa interesante, al correr este programa, el orden en que esta escrito
   * este programa no corresponde necesariamente a la salida mostrada en stdout
   * y esto es un claro ejemplo de lo que programación asincrona es. En mi computador
   * el orden es el siguiente:
   *  
   *    - manejo de errores asincrono -- ...
   *    --  ERROR --
   *    -- estadisticas de list.json --
   *
   * Y por último:
   *    -- leyendo eg.txt -- (quien es el primero que fue escrito)
   *
   */
var fs = require('fs')

  /**
   * fs.readFile
   * ------------
   * Te permite leer un archivo, tambien existe la manera sincrona (fs.readFileSync)
   * la cual se recomienda su uso, cuando son archivos que no se van a modificar
   * o se van a requerir constantemente, por ejemplo un "template". 
   *
   * fs.readFile toma los siguientes argumentos:
   * 
   *    fs.readFile(nombre<string>, enconding<string>?, callback<function>)
   *
   * Donde:
   *   nombre: es la ubicación absoluta del archivo, o relativa al directorio de ejecución.
   *   encoding: es opcional, pero te permite definir el tipo de encoding del archivo, 
   *             predeterminado a Buffer, el valor más comun es "utf8"
   *   callback: que al igual que todo en Node recibe como argumentos: el "error" si existe
   *             alguno y como último parametro el archivo ya leido.
   */
fs.readFile('./eg.txt', 'utf8', function (error, eg){
  if (error) throw error
  console.log(' --- Leyendo eg.txt ---')
  console.log(eg) // -> Este es un archivo de texto ... 
})

/**
 * Por ejemplo uno de los errores más frecuentes es el "ENOENT", que básicamente 
 * significa que no se encontro el archivo. e.g:
 */

fs.readFile('./esteArchivoNoExiste.txt', 'utf8', function (error, archivo){
  if (error) {
    console.log('---------- ERROR --------- ')
    console.log('Código del Error: %s', error.code)
    console.log('Mensaje de Error: %s', error.message)
    console.log('Stack del Error: %s', error.stack)
    console.log('---------------------------\n ')
  }
})

/**
 * NOTA: Al realizar esta misma operación mediante la forma sincrona, el error
 * se va al global scope, por lo que al no manejarla correctamente, nuestro
 * programa acabaria inmediatamente. Por lo tanto: ¡Siempre, SIEMPRE, MANEJA TUS ERRORES!
 */
try {
  var file = fs.readFileSync('./esteArchivoNoExiste.txt', 'utf8')
} catch (error) {
  console.log('--Manejo de errores cuando utilizas código sincrono---')
  console.dir(error.stack.split('\n'))
  console.log('--- eof error sincrono --\n')
}

/**
 * Stats
 * -----
 * Como sabemos, los ficheros en un sistema tienen propiedades, como tamaño,
 * última modificación, bulk size y otras más. Con fs#stat tú eres capaz
 * de determinar esas propiedades y además identificar si el recurso que has
 * solicitado es un directorio o un archivo. De igual forma existe su forma
 * sincrona.
 */

fs.stat('./list.json', function (err, stats){
  console.log('--- estadisticas de list.json ---')
  console.log('Size: ', stats.size)
  console.log('Ultima modificación: ', stats.mtime) 
  console.log('Mode: ', stats.mode) 
  console.log('isFile:', stats.isFile())
  console.log('isDirectory:', stats.isDirectory())
  console.log('--- eof list.json ---\n')
})

/**
 * Streams con fs
 * ---------------
 * Como mencione antes, casi todas las APIs de Node o son eventos, streams
 * o ambos. Las ventajas de usar streams al hacer operaciones de archivos
 * es que permite hacer mejor uso de la memoria y operaciones del cpu.
 * Además evita hacer mal uso de los recursos.
 */
;(function (){ // esto es innecesario, pero es más limpio
  var stream = fs.createReadStream('./list.json')
  var buffer = '' 


  stream.on('error', function (error){
    console.log('ERROR en el stream --', error)
  })

  stream.on('data', function (data){
    buffer += data
    console.log('datos recibidos')
  })

  stream.on('end', function (){
    console.log('el stream ha terminado con:\n%s\n', buffer.toString())
  })
})()

// es lo mismo que
;(function(){
  var stream = fs.createReadStream('./list.json')
  stream.on('error', function (error){
    console.log('ERROR en el stream --', error)
  })
  stream.pipe(process.stdout)
})()
