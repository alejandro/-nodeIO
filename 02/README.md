# #nodeIO: Cap. 2

**Del módulo HTTP, fs, path, url**


# #nodeIO. Cap. 2

En el primer webcast de esta serie, vimos un poco de los principios y filosofía por la que se rige Node. Pudimos observar como funcionan los módulos y además como crear un servidor que respondía `hola Desarrollo Web`. Además se reviso aspectos básicos para evitar escribir código piramidal (*spaguetti code*) y los conceptos de programación orientada a eventos y asincronia. 

En este segundo capitulo queremos aplicar la "teoría" vista anteriormente y empezar a escribir código utilizando todo lo visto, nos pondremos a trabajar más en eventos y streams, llevándolos al siguiente nivel.

Se trabajara con el sistema de archivos utilizando el módulo `fs`, viendo parte de los métodos que esta módulo ofrece (`stat`, `readdir`, `createWriteStream`). Aprenderemos a utilizar el módulo `path` para revisar y analizar la ubicación de archivos en el sistema.

En conjunto con lo anterior el módulo `url` y `http` nos ayudara a crear un servidor de archivos estáticos, nuestro "apache", "nginx", ó `python -m SimpleHTTPServer` escrito completamente en JavaScript en menos de 60LOC.

Nosotros estamos listos, ¿Estas tú?

