var methods = {
    '/home': {
        method: 'GET',
        action: function (req, res) {
            res.end('hi')
        }
    },
    '/date': {
        method: 'POST',
        action: function(req, res) {
            res.end(+new Date + '')
        }
    },
    '/petro/id/true/:otro': {
        method: 'GET',
        action: function(req, res) {
            res.end(req.params.otro)
        }        
    },
    '/date/:id/true/:otro': {
        method: 'GET',
        action: function(req, res) {
            res.end(JSON.stringify(req.params))
        }
    }
}

function Router(req, res){
    if (methods[req.url]) {
        return true
    }
}

module.exports = methods