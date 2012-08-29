var http   = require('http')
var qs     = require('querystring')
var domain = require('domain')
var router = require('./routes')


var usuariosValidos = {
    "alejandro":"morales",
    "desarrollo":"web"
}


var server = http.createServer(handler)

function handler(peticion, respuesta) {
    // Petición = request (req)
    // Respuesta = response (res)

    var local = domain.create()


    local.on('error', function(err){
        console.log(err.stack || err)
        respuesta.statusCode = 500
        respuesta.end('Internal Server Error')  
    })

    local.run(function() {

        if (router.call(this, peticion, respuesta)) return


        function writeBad() {
            respuesta.statusCode = 401
            return respuesta.end('No Autorizado')
        }
        respuesta.on('error', function(){
            respuesta.end('error')
        })

        if (!peticion.headers.authorization) return writeBad()

        var auth = peticion.headers.authorization
        var authParsed = (new Buffer(auth.replace('Basic ',''), 'base64')).toString('ascii')
        var user = authParsed.split(':')

        if (usuariosValidos[user[0]] !== user[1]) return writeBad()



        // =>  Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11

        var datos = ''
        peticion.setEncoding('utf8')
        peticion.on('data', function(data){
            datos += data.toString('utf8')
        })
        peticion.once('end', function(){
            var body = qs.parse(datos)
            respuesta.setHeader('Content-Type', 'text/plain')
            // respuesta.statusCode = 200
            var word = 'Hola Mundo\n'.split('')

            word.forEach(function(letra){
                respuesta.write(letra)
            })
            respuesta.write('Tu petición es:\n')
            respuesta.write(JSON.stringify(body, null, 2))
            // var i = 0
            // while (i < 100) {
            //   respuesta.write('otro pedazo')  
            //   i++
            // }
            respuesta.end('\n')
        })
    })
}


server.listen(8080, function(){
    console.log('Servidor listo en el puerto: %d', this.address().port)
})

// process.on('uncaughtException', function(error){
//     console.log(error.stack)
//     process.kill()
// })