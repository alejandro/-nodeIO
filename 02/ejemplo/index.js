#!/usr/bin/env node
/**
 * #nodeIO Cap.2: Del módulo http, fs, path, ...
 * -------------------------
 * @author: Alejandro Morales <vamg008@gmail.com>
 * @license: MIT 2012 <http://ale.mit-license.org>
 */ 'use strict';

/**
 * Servidor http
 * -------------
 *
 * Este archivo define el servidor http, este servidor bien pudo estar localizado en
 * `estatico.js` pero por propositos de aprendizaje se ha separado como un modulo 
 * independiente.
 */
var http = require('http');
var estatico = require('./estatico');

// Nota: Por si se ejecuta este archivo sin `./serve`
global.wpath = global.wpath || process.cwd();

var servidor = http.createServer(estatico);

servidor.listen(process.env.PORT || 3001, function (){
  console.log('[*] Servidor estatico sirviendo %s en %d', global.wpath, this.address().port);
});
