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
// Body can be an object or string. ContentType will be set accordingly (application/json or text/html)
// Status code defaults to 200. Defaults can be overwritten, both fields are optional.  

res.render(templateName, data)  
// Only available if templating is enabled
// A callback can be provided as a third arg. The html will then be returned instead of being sent.
 
req.session[key] = value
var value = req.session[key]
// Only available if a secret key has been set. - 'app.session(opts)'.
// More info (https://github.com/benadida/node-client-sessions).  

app.session(opts)
// Enables the client-sessions lib with options, 'opts.secret' is required.
// More info (https://github.com/aaronblohowiak/routes.js).  

app.template(opts)
// Enables handlebars.js templating, 'opts.dir' is required. 
```  

###Deps:
Additional router documentation: [https://github.com/aaronblohowiak/routes.js](https://github.com/aaronblohowiak/routes.js)  
Additional session documentation: [https://github.com/benadida/node-client-sessions](https://github.com/benadida/node-client-sessions)  
Handlebars templating documentation [http://handlebarsjs.com/](http://handlebarsjs.com/)

###Example app:  
```javascript
var app = require('wayward')

app.session({secret: 'supersecret'}) // calling this will enable the client-sessions lib
app.template({dir: __dirname + '/templates'}) // calling this enables handlebars.js templating

app.get('/set/:foo', function(req, res){
  req.session.foo = req.params.foo
  res.send('session set')
})

app.get('/get', function(req, res){
  res.setHeader('Content-Type', 'text/plain') // overwrite header
  var data = {session: req.session}
  res.send(data, 201) // overwrite status code
})

// index.html = <p>Hello, my name is {{name}}.</p>

app.get('/template/:name', function(req, res){
  var data = {"name": req.params.name}
  res.render('index.html', data) // rendered template sent to browser
})

app.post('/template/:name', function(req, res){
  console.log(req.body) // post params
  console.log(req.params) // url segments
  console.log(req.files) // uploaded files
  
  var data = {name: req.params.name}

  res.render('index.html', data, function(err, html){ // rendered template in callback
    if(err) throw new Error(err)
    res.send(html)
  })
})

app.listen(3000)
```  

###Tests  
```
npm test
```  

[![Build Status](https://secure.travis-ci.org/bradleyg/wayward.png)](http://travis-ci.org/bradleyg/wayward)