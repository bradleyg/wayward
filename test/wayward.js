var app = require('../index')
var request = require('request')
var should = require('should')
var path = require('path')

// setup

app.session({secret: 'supersecret'})
app.template({dir: path.join(__dirname, '../example/templates')})
app.static({dir: path.join(__dirname, '../example/static'), url: '/public'})

// slack middlware

app.get('/test/:param', function(req, res){
  res.send({slack: true, params: req.params, query: req.query})
})

// sessions

app.get('/set/:foo', function(req, res){
  req.session.foo = req.params.foo
  res.send('session set')
})

app.get('/get', function(req, res){
  res.send(req.session)
})

// templates

app.get('/template/:name', function(req, res){
  var data = {"name": req.params.name}
  res.render('index.ejs', data)
})

app.get('/template2/:name', function(req, res){
  var data = {name: req.params.name}
  res.render('index.ejs', data, function(err, html){ // return html
    if(err) throw new Error(err)
    res.send(html)
  })
})

app.listen(3000)

// tests

describe("wayward", function () {

  describe('app.get()', function(){
    
    it('should return an error for a route that is too short', function(done){
      request('http://localhost:3000/test', function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(404)
        res.headers['content-type'].should.equal('text/plain')
        body.should.equal('404, Not found')
        done()
      })      
    })
    
    it('should return an error for a route that it too long', function(done){
      request('http://localhost:3000/test/exists/nonvalid/nonvalid', function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(404)
        res.headers['content-type'].should.equal('text/plain')
        body.should.equal('404, Not found')
        done()
      })      
    })
    
    it('should return an error if the method is not correct', function(done){
      request({url: 'http://localhost:3000/test/exists', method: 'DELETE'}, function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(405)
        res.headers['content-type'].should.equal('text/plain')
        body.should.equal('405, Method not allowed')
        done()
      })      
    })
    
    it('should not return an error for a route that exist', function(done){
      request('http://localhost:3000/test/exists?query=true', function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(200)
        res.headers['content-type'].should.equal('application/json')
        body.should.equal('{"slack":true,"params":{"param":"exists"},"query":{"query":"true"}}')
        done()
      })      
    })
    
  })  
  
  describe('storing sessions', function(){
    
    it('should set a session and return correct headers', function(done){
      request('http://localhost:3000/set/bar', function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(200)
        res.headers['content-type'].should.equal('text/html')
        body.should.equal('session set')
        done()
      })      
    })
    
    it('should return the session data stored with correct headers', function(done){
      request('http://localhost:3000/get', function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(200)
        res.headers['content-type'].should.equal('application/json')
        body.should.equal('{"foo":"bar"}')
        done()
      })      
    })
    
  })
  
  describe('templates', function(){
    
    it('should return a rendered html template', function(done){
      request('http://localhost:3000/template/bradley', function(err, res, body){
        should.not.exist(err)
        should.exist(res.headers)
        res.statusCode.should.equal(200)
        body.should.equal('<p>Hello, my name is bradley.</p>')
        done()
      })      
    })
    
    it('should return a rendered html template via a callback', function(done){
      request('http://localhost:3000/template2/bradley', function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(200)
        res.headers['content-type'].should.equal('text/html')
        body.should.equal('<p>Hello, my name is bradley.</p>')
        done()
      })      
    })
    
  })  
  
  describe('static', function(){
    
    it('should return a static file from public', function(done){
      request('http://localhost:3000/public/image.jpg', function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(200)
        res.headers.should.have.property('content-type', 'image/jpeg')
        done()
      })      
    })
    
    it('should return a 404 if a static file is missing', function(done){
      request('http://localhost:3000/public/missing.jpg', function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(404)
        done()
      })      
    })
    
  })  

})