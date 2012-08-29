#nodeIO
=======

## Ejemplo # 1

Diferencias entre programación asíncrona y síncrona.

## A tomar en cuenta:

- `process.nextTick`:
- `setTimeout`, `setInterval`:
- `callbacks`:
- Código Piramidal (spaguetti code): 



## Referencias:

## Recomendaciones:

1. No copies y pegues el código directamente, ¡escribelo!
2. Comenta en `modulo1.js` la parte de `process.nextTick` por la de solo `cb`:

        // Hacer cambio para notar la diferencia
        cb(iterations)
        // ò:
        // process.nextTick(function(){
        //    cb(iterations)
        // })

  ¿Que sucede? ¿Porque?

3. Escribe código Modular

## Autor:

Alejandro Morales ([@_alejandromg](http://twitter.com/_alejandromg))

## License:

BSD 2012 (c) Alejandro Morales