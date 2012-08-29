/*
  Rutas
  ------

  Estas son las rutas predeterminadas
  */

var qs          = require('querystring')
var fs          = require('fs')
var path        = require('path')
var utils       = require('./utils')
var methods     = require('./routes.mtds.js')
var rawMethods  = {}
var regWithReal = {}

var methodsRegExp = Object.keys(methods).map(function(url) {
    var _reg = utils.reg(url)
    rawMethods[_reg[0]] =  _reg.slice(1).map(function(val){
        return val.name
    }).filter(Boolean)
    
    regWithReal[_reg[0]] = url

    return _reg[0]
})


module.exports = Routes


function Routes (req, res) {
    
    this.methods = methods
    
    var valid = methodsRegExp.filter(function(regexp) {
        return regexp.test(req.url)
    })[0]

    if (valid) {        
        req.params = req.url.match(valid), req.params.shift()
        req.params = utils.tokenize(rawMethods[valid], req.params)
        this.methods[regWithReal[valid]].action.call(this, req, res)
        return true
    }
    
    if (!this.methods[req.url]) {
        return null
    } else if (this.methods[req.url].method !== req.method)  {
        return null
    } 

    this.methods[req.url].action.call(this, req, res)
    return true
}
