/**
 * #nodeIO Cap.2 
 * -------------------------
 * @author: Alejandro Morales <vamg008@gmail.com>
 * @license: MIT 2012 <http://ale.mit-license.org>
 */ 'use strict';


module.exports = Estatico;

var fs = require('fs');
var path = require('path');
var url = require('url');
var mime = {
  '.html':'text/html',
  '.json':'application/json',
  '.css': 'text/stylesheet',
  '.js': 'application/javascript'
}

function Estatico(req, res) {
  req.uri = url.parse(req.url).pathname;
  req.fpath = path.resolve(process.cwd(), '.' + req.uri);
  req.mime = mime[path.extname(req.fpath)];
  res.error = function (code, msg){
    if (msg instanceof Error) msg = msg.stack.toString() 
    res.statusCode = code || 500
    res.end(msg || 'internal server error')
  }

  if (req.uri == '/') {
    return serveDirectory(req, res)
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

function serveDirectory(req, res) {
  fs.readdir(req.fpath, function (error, files) {
    if (error && error.code === 'ENOENT') return res.error(404, 'no encontrado');
    if (error) return res.error(500, error);
    if (~files.indexOf('index.html')) {
      req.fpath += 'index.html';
      req.mime = 'text/plain';
      return streamFile(req, res);
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      dir: req.fpath,
      files: files
    }, null, 2));
  });
}

function streamFile(req, res) {
  var stream = fs.createReadStream(req.fpath)
  stream.on('error', function (error){
    res.error(500, error)
  })
  res.setHeader('Content-Type', req.mime)
  stream.pipe(res)
}