var http = require('http')
var formidable = require('formidable')
var router = require('routes').Router()

var get = function(route, cb) {
  router.addRoute('/GET' + route, function(req, res){
    cb(req, res)
  }) 
}

var post = function(route, cb) {
  router.addRoute('/POST' + route, function(req, res){
    var form = new formidable.IncomingForm()
    
    form.parse(req, function(err, fields, files) {
      req.body = fields
      req.files = files
      cb(req, res)
    })
  }) 
}

var handle = function(req, res) {
  var match = router.match('/' + req.method + req.url)
  if( ! match) {
    return error(res, 404, 'Not found')
  }
  req.params = match.params
  match.fn(req, res)
}

var error = function(res, code, msg) {
  res.writeHead(code, {
    'Content-Type': 'text/html'
  })
  res.end(code + ', ' + msg)
}

var listen = function(port){
  http.createServer(handle).listen(port)
}

module.exports = {
  get: get,
  post: post,
  listen: listen
}