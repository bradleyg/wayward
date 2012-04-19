var app = require('../index')

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