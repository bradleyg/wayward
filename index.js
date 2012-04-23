var http = require('http')
var path = require('path')
var formidable = require('formidable')
var router = require('routes').Router()
var sessions = require('client-sessions')
var handlebars = require('handlebars')
var filed = require('filed')
var fs = require('fs')
var handleSession = false
var templates = {}

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

var template = function(opts) {
  if(typeof opts.dir === 'undefined') throw new Error('template directory is required')
  
  var templateList = fs.readdirSync(opts.dir)
  
  templateList.forEach(function(val){
    var source = fs.readFileSync(opts.dir + '/' + val).toString()
    templates[val] = handlebars.compile(source)
  })
}

var static = function(opts) {
  if(typeof opts.dir === 'undefined' || typeof opts.url === 'undefined') {
    throw new Error('static directory/url is required')
  }

  var route = path.normalize(opts.url + '/*')

  this.get(route, function(req, res){    
    var filename = req.url.replace(opts.url, '')
    var filepath = path.normalize(opts.dir + '/' + filename)
    filed(filepath).pipe(res)
  })
}

// appended

var render = function(name, data, cb) {
  var template = templates[name]
  
  if( ! template) throw new Error('template does not exist')
  
  var html = template(data)
  
  if(typeof cb === 'function') {
    return cb(null, html)
  }
  
  this.send(html)
}

var send = function(body, code) {  
  body = body || ''
  code = code || this.statusCode || 200
  
  var contentType = this.getHeader('content-type')
  
  if(typeof body !== 'string') {
    body = JSON.stringify(body)
    contentType = contentType || 'application/json'
  }

  this.setHeader('Content-Type', contentType || 'text/html')
  this.statusCode = code
  this.emit('header')
  this.end(body)
}

// private

var handle = function(req, res) {
  res.send = send
  res.render = render

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

module.exports = {
  get: get,
  post: post,
  session: session,
  template: template,
  static: static,
  listen: listen
}