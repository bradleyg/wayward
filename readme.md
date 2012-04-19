###Wayward  

Minimal http framework with routes, sessions + body/param/file parsing.  

```npm install wayward```

###Exposed functions:  

```javascript
app.get(route, callback)
// Connect style routing for 'GET' http methods. Missing routes will throw a 404.  

app.post(route, callback)
// Connect style routing for 'POST' http methods. Missing routes will throw a 404.  

app.listen(port)
// Port to start app on.  

res.send(body, statusCode)
// If 'body' is a string the default response content type will be 'text/html'.
// If 'body' is an object the default response content type will be 'application/json'.
// If 'statusCode' is omitted it defaults to '200'. 
// Default content types/status codes can be overwritten, both fields are optional.  

app.session(opts)
// Enables the client-sessions lib with options, 'opts.secret' is required.
// More info (https://github.com/aaronblohowiak/routes.js).  

req.session[key] = value
var value = req.session[key]
// Get/set session values.
// More info (https://github.com/benadida/node-client-sessions).  
```  

###Deps:
Router documentation: [https://github.com/aaronblohowiak/routes.js](https://github.com/aaronblohowiak/routes.js)  
Session documentation: [https://github.com/benadida/node-client-sessions](https://github.com/benadida/node-client-sessions)  

###Example app:  

```javascript
var app = require('wayward')

app.session({secret: 'supersecret'}) // calling this will enable the client-sessions lib

app.get('/set/:foo', function(req, res){
  req.session.foo = req.params.foo
  res.send('session set')
})

app.get('/get', function(req, res){
  res.setHeader('Content-Type', 'text/plain') // overwrite header
  var data = {session: req.session}
  res.send(data, 201) // overwrite status code
})

app.post('/:param1?', function(req, res){
  console.log(req.body) // post params
  console.log(req.params) // url segments
  console.log(req.files) // uploaded files

  res.send('Hello world')
})

app.listen(3000)
```  

###Tests  
```
npm test
```  


[![Build Status](https://secure.travis-ci.org/bradleyg/wayward.png)](http://travis-ci.org/bradleyg/wayward)