#!/usr/bin/env node
/**
 * #nodeIO Cap.2: Del módulo http, fs, path, ...
 * -------------------------
 * @author: Alejandro Morales <vamg008@gmail.com>
 * @license: MIT 2012 <http://ale.mit-license.org>
 */ 'use strict';

 var http = require('http');
 var estatico = require('./estatico')


 var servidor = http.createServer(estatico)

 servidor.listen(3001, function (){
  console.log('Servidor estatico sirviendo en %d', this.address().port)
 })
