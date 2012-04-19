var app = require('../index')
var request = require('request')
var should = require('should')

// app

app.session({secret: 'supersecret'})
    
app.get('/test/:param1/:param2?', function(req, res){
  res.send(req.params, 200) // with status code
})

app.post('/test/:param1/:param2?', function(req, res){
  req.params.body = req.body
  req.params.files = req.files
  res.send(req.params) // without status code
})

app.get('/set/:foo', function(req, res){
  req.session.foo = req.params.foo
  res.setHeader('Content-Type', 'text/plain') // overide content-type
  res.send('session set')
})

app.get('/get', function(req, res){
  res.send(req.session)
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
        res.headers['content-type'].should.equal('text/html')
        body.should.equal('404, Not found')
        done()
      })      
    })
    
    it('should return an error for a route that it too long', function(done){
      request('http://localhost:3000/test/exists/nonvalid/nonvalid', function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(404)
        res.headers['content-type'].should.equal('text/html')
        body.should.equal('404, Not found')
        done()
      })      
    })
    
    it('should return an error if the method is not correct', function(done){
      request({url: 'http://localhost:3000/test/exists', method: 'DELETE'}, function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(404)
        res.headers['content-type'].should.equal('text/html')
        body.should.equal('404, Not found')
        done()
      })      
    })
    
    it('should not return an error for a route that exist', function(done){
      request('http://localhost:3000/test/exists/exists', function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(200)
        res.headers['content-type'].should.equal('application/json')
        body.should.equal('{"param1":"exists","param2":"exists"}')
        done()
      })      
    })
    
  })  
  
  describe('app.post()', function(){
    
    it('should return an error for a route that is too short', function(done){
      request({url: 'http://localhost:3000/test', method: 'POST'}, function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(404)
        res.headers['content-type'].should.equal('text/html')
        body.should.equal('404, Not found')
        done()
      })      
    })
    
    it('should return an error for a route that it too long', function(done){
      request({url: 'http://localhost:3000/test/exists/nonvalid/nonvalid', method: 'POST'}, function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(404)
        res.headers['content-type'].should.equal('text/html')
        body.should.equal('404, Not found')
        done()
      })      
    })
    
    it('should include post/files/params for a valid route', function(done){
      request({url: 'http://localhost:3000/test/exists/exists', method: 'POST', form: {data: 'data'}}, function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(200)
        res.headers['content-type'].should.equal('application/json')
        body.should.equal('{"param1":"exists","param2":"exists","body":{"data":"data"},"files":{}}')
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
        res.headers['content-type'].should.equal('text/plain')
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

})