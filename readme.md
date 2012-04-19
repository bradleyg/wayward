Minimal http framework with routes + body/param/file parsing.  
Any routes which can not be found or have an incorrect http method will throw a 404.

```npm install wayward```

Further route options can be found here: [https://github.com/aaronblohowiak/routes.js](https://github.com/aaronblohowiak/routes.js)  

```javascript
var app = require('wayward')

app.get('/test/:param1/:param2?', function(req, res){
  console.log(req.params)

  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(data)
})

app.post('/test/:param1/:param2?', function(req, res){
  console.log(req.body) // post params
  console.log(req.params) // url segments
  console.log(req.files) // uploaded files

  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(data)
})

app.listen(3000)
```  

Run the tests: ```npm test```  


[![Build Status](https://secure.travis-ci.org/bradleyg/wayward.png)](http://travis-ci.org/bradleyg/wayward)