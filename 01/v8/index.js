/*
  Referencia: JavaScript 
  ----------------------

  Estas son algunas de las cosas que cambian, respecto a JavaScript en el
  navegador:

    - `this` refiere a el objeto global y no a `window
    - No existe el concepto de DOM
    - El motor de JavaScript es v8:
      Sin embargo, todo lo que escribes es JavaScript y nada más:
      Por ende tienes todos los métodos y características que hacen de js un 
      poderoso lenguaje.
    - Compatibilidad cross-browser, Nah! No te preocupes por eso:
      for (key in objeto) {
        ...
      }
      =>  Object.keys(objecto).forEach(...)
      objecto.hasOwnProperty
      Array#filter, Array#map, Array#sort, Array#reduce, JSON#parse,
      JSON#stringify, Object#create, Object#freeze, y muchos más estan disponibles

  */


// Assert es un módulo utilizado para realizar pruebas a tu código
// Hablaremos más de él en futuras ocasiones

var assert = require('assert')

// Datos para realizar las pruebas
var datos = {
    map: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    filter: ['', null, undefined, 'hola', 'mundo',1, true],
    sort: [2, 3, 1, 41, 21, 421],
    arr: ['prin','ale', 'andr','and', 'po','pu'],
    reduce: [1, 2, 3, 4, 5, 6, 7],
    json: {
        method: 'hola',
        hola: 'mundo',
        'otro-key': +new Date,
        'un key raro': 'si se valen espacios'
    }
}



/*
  Hay un millón de formas distintas (y eficaces) para realizar este procedimiento,
  pero por motivos didácticos se utiliza esta forma.

  Object.keys(datos) 
  => ['map', 'filter', 'sort', 'reduce', 'json']

  Nota: No se recomienda usar en produción
  */


Object.keys(datos).forEach(function(method){

    if (method == 'map') {
        /*
          El método `map` te ayuda a crear un nuevo arreglo basandote en 
          otro, muy útil cuando quieres modificar el valor original de tu 
          arreglo.

          En este caso, sirve para multiplicar por el mismo su valor
          */
        var alCuadrado = datos[method].map(function(val, index, array){
            return val * val
        })
        console.log('Map:\n\t', datos[method], alCuadrado)

    } else if (method == 'filter') {

        /*
          
          Este método ayuda a filtrar tu array. Que tal si solo quieres nùmeros
          o letras, o simplemente solo los valores válidos de tu array.

          */
        var filtered = datos[method].filter(function(val, index, array){
            return !!val;
        })

        /* 
          Es igual que:
          Acepta cualquier tipo de Datos: Boolean, String, Number, Object, Array
          recuerda que en JavaScript todo es un objeto asì que si utilizas 
          Object como filtro, números, letras y demás van a pasar el filtro,
          por lo tanto no es recomendable.
          */
        
        // con Boolean te ayuda a filtrar solo los valores válidos del Array
        var otroFilter = datos[method].filter(Boolean) 


        console.log('Filter:\n\t', datos[method], filtered, otroFilter)
    } else if (method == 'sort') {

        /*
          Sort, te ayuda a ordenar tu Array. Enough said!
          */
        var sorted = datos[method].sort(function(actual, siguiente){
            return actual > siguiente
        })
        var descendente = datos[method].sort(function(actual, siguiente){
            return actual < siguiente
        })

        var conPalabras = datos.arr.sort(function(actual, siguiente){
            return actual > siguiente
        })

        console.log('Sort:\n\t', sorted, descendente, conPalabras)

    } else if (method == 'json') {
        /*
          Los métodos de JSON son:
            - parse
            - stringify

            `parse` convierte una string con formato JSON en JSON, para que puedas
            acceder a las keys y values de la "string".

            `stringify` Realiza el proceso contrario de parse
          */
        console.log('JSON: ')
        var tmp = datos[method]
        var copy = JSON.stringify(tmp)
        var parsed = JSON.parse(copy)

        // JSON#stringify convierte a string
        assert(typeof(JSON.stringify(tmp)), 'string',' Stringify funciona')

        // Uso del metodo "hasOwnProperty"
        assert(parsed.hasOwnProperty('method'), 'Tiene que tener "method"')

        // Comprobar que tienen las mismas "keys"
        assert.equal(Object.keys(JSON.parse(copy)).join(''), Object.keys(datos[method]).join('') , 'Deben de ser iguales')
        console.log('\tSin errores...')
    } else {
        if (method == 'arr') return

        /*
          Con `reduce`, conviertes tu array en un valor único, sea string o nùmero.
          Por ejemplo el siguiente código calcula la suma de cada uno de los
          elements del array "reduce"
          */

        var reduce = datos[method].reduce(function(actual, siguiente, index, array){
            return actual + siguiente
        })
        console.log('Reduce:\n\t', datos[method], reduce)
    }
})