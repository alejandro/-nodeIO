/**
 * Index
 * -------------------------
 * @author: Alejandro Morales <vamg008@gmail.com>
 * @license: MIT 2012 <http://ale.mit-license.org>
 */ 'use strict';

var http   = require('http');
var qs     = require('querystring');
var router = require('./routes');


var usuariosValidos = {
    "alejandro":"morales",
    "desarrollo":"web"
};


var server = http.createServer(handler);

function handler(peticion, respuesta) {
    /*jshint validthis:true */
    // Petición = request (req)
    // respuesta = response (res)
    var req = peticion, res = respuesta;
    if (router.call(this, req, res)) return;


    function writeBad() {
        res.statusCode = 401;
        return res.end('No Autorizado');
    }

    res.on('error', function(){
        res.end('error');
    });

    if (!req.headers.authorization) return writeBad();

    var auth = req.headers.authorization;
    var authParsed = (new Buffer(auth.replace('Basic ',''), 'base64')).toString('ascii');
    var user = authParsed.split(':');

    if (usuariosValidos[user[0]] !== user[1]) return writeBad();

    var datos = '';
    
    req.setEncoding('utf8');
    
    req.on('data', function(data){
        datos += data.toString('utf8');
    });
    
    req.once('end', function(){
        var body = qs.parse(datos);
        res.setHeader('Content-Type', 'text/plain');
        // res.statusCode = 200
        var word = 'Hola Mundo\n'.split('');

        word.forEach(function(letra){
            res.write(letra);
        });
        res.write('Tu petición es:\n');
        res.write(JSON.stringify(body, null, 2));
        res.end('\n');
    });
}


server.listen(8080, function(){
    console.log('Servidor listo en el puerto: %d', this.address().port);
});