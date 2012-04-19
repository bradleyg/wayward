var http = require('http')
var formidable = require('formidable')
var router = require('routes').Router()
var sessions = require('client-sessions')
var handleSession = false

// public

var get = function(route, cb) {
  router.addRoute('/GET' + route, cb) 
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

var listen = function(port){
  http.createServer(handle).listen(port)
}

var session = function(opts) {
  if(typeof opts.secret === 'undefined') throw new Error('session secret is required')
  handleSession = sessions(opts)
}

// private

var handle = function(req, res) {
  res.send = send
  
  var match = router.match('/' + req.method + req.url)
  if( ! match) {
    return res.send('404, Not found', 404)
  }
  
  req.params = match.params
  
  if( ! handleSession) {
    return match.fn(req, res)
  }
  
  handleSession(req, res, function(err){
    if(err) throw new Error(err)
    match.fn(req, res)
  })
}

var send = function(body, code) {  
  body = body || ''
  code = code || 200
  
  var contentType = this.getHeader('content-type')
  
  if(typeof body !== 'string') {
    body = JSON.stringify(body)
    contentType = contentType || 'application/json'
  }

  this.setHeader('Content-Length', body.length)
  this.setHeader('Content-Type', contentType || 'text/html')
  this.statusCode = code
  this.emit('header')
  this.end(body)
}

module.exports = {
  get: get,
  post: post,
  session: session,
  listen: listen
}