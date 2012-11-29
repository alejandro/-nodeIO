/**
 * Routes
 * -------------------------
 * @author: Alejandro Morales <vamg008@gmail.com>
 * @license: MIT 2012 <http://ale.mit-license.org>
 */ 'use strict';

var methods = {
    '/home': {
        method: 'GET',
        action: function (req, res) {
            res.end('hi');
        }
    },
    '/date': {
        method: 'POST',
        action: function(req, res) {
            res.end(Date.now() + '');
        }
    },
    '/petro/id/true/:otro': {
        method: 'GET',
        action: function(req, res) {
            res.end(req.params.otro);
        }        
    },
    '/date/:id/true/:otro': {
        method: 'GET',
        action: function(req, res) {
            res.end(JSON.stringify(req.params));
        }
    }
};


module.exports = methods;